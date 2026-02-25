export interface UploadedFile {
  id: string;
  name: string;
  filename: string;
  size: number;
  size_bytes?: number;
  mimeType?: string;
  createdAt?: Date;
}

export interface UploadResponse {
  success: boolean;
  data?: UploadedFile;
  error?: string;
  message?: string;
}

export interface FileListResponse {
  success: boolean;
  data?: UploadedFile[];
  error?: string;
}
