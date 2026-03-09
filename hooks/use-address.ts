import { useCallback, useState } from "react";
import { client } from "@/shared/api/client";

export interface Address {
  id: string;
  type: "home" | "work" | "new";
  address: string;
  latitude: number;
  longitude: number;
}

interface SaveAddressParams {
  user_id: string;
  type: "home" | "work" | "new";
  address: string;
  latitude: number;
  longitude: number;
  id?: string;
}

interface UseAddressReturn {
  addresses: Address[];
  isLoading: boolean;
  error: string | null;
  saveAddress: (params: SaveAddressParams) => Promise<Address | null>;
  fetchAddresses: (user_id: string, type?: "home" | "work" | "new") => Promise<void>;
  deleteAddress: (id: string, user_id: string) => Promise<boolean>;
}

export const useAddress = (): UseAddressReturn => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveAddress = useCallback(
    async (params: SaveAddressParams): Promise<Address | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const { data: result } = await client.post("/api/address", params);

        if (!result.success) {
          throw new Error(result.message || "Failed to save address");
        }

        if (result.data) {
          setAddresses((prev) => {
            const existingIndex = prev.findIndex(
              (addr) => addr.id === result.data.id,
            );
            if (existingIndex !== -1) {
              const updated = [...prev];
              updated[existingIndex] = result.data;
              return updated;
            }
            return [...prev, result.data];
          });

          return result.data;
        }

        return null;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        console.error("Error saving address:", err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const fetchAddresses = useCallback(
    async (user_id: string, type?: "home" | "work" | "new"): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        const params: Record<string, string> = { user_id };
        if (type) params.type = type;

        const { data: result } = await client.get("/api/address", { params });

        if (result.success && result.data) {
          setAddresses(result.data);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        console.error("Error fetching addresses:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const deleteAddress = useCallback(
    async (id: string, user_id: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const { data: result } = await client.delete("/api/address", {
          params: { id, user_id },
        });

        if (!result.success) {
          throw new Error(result.message || "Failed to delete address");
        }

        setAddresses((prev) => prev.filter((addr) => addr.id !== id));
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        console.error("Error deleting address:", err);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    addresses,
    isLoading,
    error,
    saveAddress,
    fetchAddresses,
    deleteAddress,
  };
};
