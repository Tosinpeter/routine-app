import { useState, useCallback } from 'react';
import type { Address } from '@/app/api/address+api';

interface SaveAddressParams {
  type: 'home' | 'work' | 'new';
  address: string;
  latitude: number;
  longitude: number;
  id?: string;
}

interface AddressApiResponse {
  success: boolean;
  message?: string;
  data?: Address;
  error?: string;
}

interface UseAddressReturn {
  addresses: Address[];
  isLoading: boolean;
  error: string | null;
  saveAddress: (params: SaveAddressParams) => Promise<Address | null>;
  fetchAddresses: (type?: 'home' | 'work' | 'new') => Promise<void>;
  deleteAddress: (id: string) => Promise<boolean>;
}

/**
 * Custom hook for managing address operations
 * Provides methods to save, fetch, and delete addresses
 */
export const useAddress = (): UseAddressReturn => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Save a new address or update an existing one
   */
  const saveAddress = useCallback(
    async (params: SaveAddressParams): Promise<Address | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        const result: AddressApiResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Failed to save address');
        }

        // Update local state if address was saved successfully
        if (result.data) {
          setAddresses((prev) => {
            // Check if updating existing address
            const existingIndex = prev.findIndex((addr) => addr.id === result.data!.id);
            if (existingIndex !== -1) {
              const updated = [...prev];
              updated[existingIndex] = result.data!;
              return updated;
            }
            // Add new address
            return [...prev, result.data!];
          });

          return result.data;
        }

        return null;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        console.error('Error saving address:', err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Fetch all saved addresses, optionally filtered by type
   */
  const fetchAddresses = useCallback(
    async (type?: 'home' | 'work' | 'new'): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        const queryParams = type ? `?type=${type}` : '';
        const response = await fetch(`/api/address${queryParams}`);

        if (!response.ok) {
          throw new Error('Failed to fetch addresses');
        }

        const result: AddressApiResponse & { data?: Address[] } = await response.json();

        if (result.success && result.data) {
          setAddresses(result.data);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        console.error('Error fetching addresses:', err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Delete an address by ID
   */
  const deleteAddress = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/address?id=${id}`, {
        method: 'DELETE',
      });

      const result: AddressApiResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to delete address');
      }

      // Remove from local state
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error deleting address:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    addresses,
    isLoading,
    error,
    saveAddress,
    fetchAddresses,
    deleteAddress,
  };
};
