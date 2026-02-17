import { useState, useCallback } from 'react';
import type { UploadedFile, UploadResponse, FileListResponse } from '@/app/api/upload+api';

interface UseFileUploadReturn {
  files: UploadedFile[];
  isLoading: boolean;
  error: string | null;
  uploadFile: (file: any, userId?: string) => Promise<UploadedFile | null>;
  fetchFiles: (userId?: string) => Promise<void>;
  deleteFile: (fileId: string) => Promise<boolean>;
  updateFile: (fileId: string, updates: Partial<UploadedFile>) => Promise<boolean>;
}

/**
 * Custom hook for managing file uploads
 * Provides methods to upload, fetch, delete, and update files
 */
export const useFileUpload = (): UseFileUploadReturn => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Upload a file to the server
   */
  const uploadFile = useCallback(
    async (file: any, userId?: string): Promise<UploadedFile | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append('file', {
          uri: file.uri,
          name: file.name,
          type: file.mimeType || file.type,
        } as any);

        if (userId) {
          formData.append('userId', userId);
        }

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const result: UploadResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || result.message || 'Upload failed');
        }

        if (result.data) {
          setFiles((prev) => [result.data!, ...prev]);
          return result.data;
        }

        return null;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred';
        console.error('Error uploading file:', errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Fetch all uploaded files
   */
  const fetchFiles = useCallback(async (userId?: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      if (userId) {
        queryParams.append('userId', userId);
      }

      const url = `/api/upload${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result: FileListResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to fetch files');
      }

      if (result.data) {
        setFiles(result.data);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Error fetching files:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Delete a file
   */
  const deleteFile = useCallback(
    async (fileId: string): Promise<boolean> => {
      setError(null);

      try {
        const response = await fetch(`/api/upload?fileId=${fileId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result: UploadResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || result.message || 'Delete failed');
        }

        // Remove from local state
        setFiles((prev) => prev.filter((f) => f.id !== fileId));
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred';
        console.error('Error deleting file:', errorMessage);
        setError(errorMessage);
        return false;
      }
    },
    []
  );

  /**
   * Update file metadata
   */
  const updateFile = useCallback(
    async (
      fileId: string,
      updates: Partial<UploadedFile>
    ): Promise<boolean> => {
      setError(null);

      try {
        const response = await fetch('/api/upload', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileId,
            ...updates,
          }),
        });

        const result: UploadResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || result.message || 'Update failed');
        }

        // Update in local state
        if (result.data) {
          setFiles((prev) =>
            prev.map((f) => (f.id === fileId ? result.data! : f))
          );
        }

        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred';
        console.error('Error updating file:', errorMessage);
        setError(errorMessage);
        return false;
      }
    },
    []
  );

  return {
    files,
    isLoading,
    error,
    uploadFile,
    fetchFiles,
    deleteFile,
    updateFile,
  };
};
