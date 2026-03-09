import { client } from "@/shared/api/client";
import type {
  FileListResponse,
  UploadedFile,
  UploadResponse,
} from "@/types/upload";
import { useCallback, useState } from "react";

export interface UploadFileOptions {
  onProgress?: (percent: number) => void;
}

interface UseFileUploadReturn {
  files: UploadedFile[];
  isLoading: boolean;
  error: string | null;
  uploadFile: (
    file: any,
    userId?: string,
    options?: UploadFileOptions,
  ) => Promise<UploadedFile | null>;
  fetchFiles: (userId?: string) => Promise<void>;
  deleteFile: (fileId: string) => Promise<boolean>;
  updateFile: (
    fileId: string,
    updates: Partial<UploadedFile>,
  ) => Promise<boolean>;
}

/**
 * Custom hook for managing file uploads (prescription / lab test files).
 * Uses the backend API at /api/upload.
 */
export const useFileUpload = (): UseFileUploadReturn => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(
    async (
      file: any,
      userId?: string,
      options?: UploadFileOptions,
    ): Promise<UploadedFile | null> => {
      setIsLoading(true);
      setError(null);
      const onProgress = options?.onProgress;

      try {
        const formData = new FormData();
        formData.append("file", {
          uri: file.uri,
          name: file.name ?? (file.fileName as string),
          type: file.mimeType || file.type || "application/octet-stream",
        } as any);

        if (userId) {
          formData.append("userId", userId);
        }

        const baseURL = client.defaults.baseURL ?? "";
        const result = await new Promise<UploadResponse>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", `${baseURL}/api/upload`);

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable && event.total > 0 && onProgress) {
              const percent = Math.round((event.loaded / event.total) * 100);
              onProgress(Math.min(percent, 100));
            }
          };

          xhr.onload = () => {
            try {
              const json: UploadResponse = JSON.parse(xhr.responseText);
              if (xhr.status >= 200 && xhr.status < 300) {
                resolve(json);
              } else {
                resolve(json);
              }
            } catch {
              reject(new Error("Invalid response"));
            }
          };

          xhr.onerror = () => reject(new Error("Network error"));
          xhr.ontimeout = () => reject(new Error("Request timeout"));

          xhr.send(formData);
        });

        if (!result?.success) {
          throw new Error(result?.error || result?.message || "Upload failed");
        }

        if (result.data) {
          setFiles((prev) => [result.data!, ...prev]);
          return result.data;
        }

        return null;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        console.error("Error uploading file:", errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const fetchFiles = useCallback(async (userId?: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const params = userId ? { userId } : {};
      const { data: result } = await client.get<FileListResponse>(
        "/api/upload",
        {
          params,
        },
      );

      if (!result?.success) {
        throw new Error(result?.error || "Failed to fetch files");
      }

      if (result.data) {
        setFiles(result.data);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Error fetching files:", errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteFile = useCallback(async (fileId: string): Promise<boolean> => {
    setError(null);

    try {
      const { data: result } = await client.delete<UploadResponse>(
        "/api/upload",
        { params: { fileId } },
      );

      if (!result?.success) {
        throw new Error(result?.error || result?.message || "Delete failed");
      }

      setFiles((prev) => prev.filter((f) => f.id !== fileId));
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Error deleting file:", errorMessage);
      setError(errorMessage);
      return false;
    }
  }, []);

  const updateFile = useCallback(
    async (
      _fileId: string,
      _updates: Partial<UploadedFile>,
    ): Promise<boolean> => {
      setError(null);
      // Backend does not support PATCH for uploads; no-op for compatibility
      return true;
    },
    [],
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
