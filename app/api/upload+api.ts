/**
 * Type definitions for File Upload
 */
export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
  status: 'uploading' | 'completed' | 'failed';
}

export interface UploadResponse {
  success: boolean;
  message?: string;
  data?: UploadedFile;
  error?: string;
}

export interface FileListResponse {
  success: boolean;
  data?: UploadedFile[];
  error?: string;
}

/**
 * Mock storage for uploaded files
 */
let mockUploadedFiles: UploadedFile[] = [
  {
    id: 'file-001',
    name: 'Lab test.pdf',
    size: 204800, // 200 KB
    type: 'application/pdf',
    url: '/uploads/lab-test.pdf',
    uploadedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    status: 'completed',
  },
  {
    id: 'file-002',
    name: 'Medical reports.pdf',
    size: 204800, // 200 KB
    type: 'application/pdf',
    url: '/uploads/medical-reports.pdf',
    uploadedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    status: 'completed',
  },
];

/**
 * POST /api/upload
 * Upload a file
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const userId = formData.get('userId') as string | null;

    if (!file) {
      return Response.json(
        {
          success: false,
          error: 'Bad Request',
          message: 'No file provided',
        },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return Response.json(
        {
          success: false,
          error: 'File Too Large',
          message: 'File size must not exceed 10MB',
        },
        { status: 413 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/heic',
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        {
          success: false,
          error: 'Invalid File Type',
          message: 'Only PDF and image files are allowed',
        },
        { status: 400 }
      );
    }

    // Simulate upload delay (300-800ms)
    const uploadDelay = Math.random() * 500 + 300;
    await new Promise((resolve) => setTimeout(resolve, uploadDelay));

    // Create uploaded file record
    const uploadedFile: UploadedFile = {
      id: `file-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: `/uploads/${file.name}`,
      uploadedAt: new Date().toISOString(),
      status: 'completed',
    };

    // Add to mock storage
    mockUploadedFiles.push(uploadedFile);

    return Response.json({
      success: true,
      message: 'File uploaded successfully',
      data: uploadedFile,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Upload failed',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/upload
 * Get list of uploaded files
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const fileId = url.searchParams.get('fileId');
    const simulateError = url.searchParams.get('error') === 'true';

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simulate error state for testing
    if (simulateError) {
      return Response.json(
        {
          success: false,
          error: 'Failed to fetch files',
          message: 'Network error occurred',
        },
        { status: 500 }
      );
    }

    // Get specific file
    if (fileId) {
      const file = mockUploadedFiles.find((f) => f.id === fileId);
      
      if (!file) {
        return Response.json(
          {
            success: false,
            error: 'Not Found',
            message: 'File not found',
          },
          { status: 404 }
        );
      }

      return Response.json({
        success: true,
        data: file,
      });
    }

    // Return all files (sorted by upload date, newest first)
    const sortedFiles = [...mockUploadedFiles].sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    return Response.json({
      success: true,
      data: sortedFiles,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/upload
 * Delete an uploaded file
 */
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const fileId = url.searchParams.get('fileId');

    if (!fileId) {
      return Response.json(
        {
          success: false,
          error: 'Bad Request',
          message: 'File ID is required',
        },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Find and remove file
    const fileIndex = mockUploadedFiles.findIndex((f) => f.id === fileId);

    if (fileIndex === -1) {
      return Response.json(
        {
          success: false,
          error: 'Not Found',
          message: 'File not found',
        },
        { status: 404 }
      );
    }

    const deletedFile = mockUploadedFiles[fileIndex];
    mockUploadedFiles.splice(fileIndex, 1);

    return Response.json({
      success: true,
      message: 'File deleted successfully',
      data: deletedFile,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Delete failed',
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/upload
 * Update file metadata (e.g., name, status)
 */
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { fileId, ...updates } = body;

    if (!fileId) {
      return Response.json(
        {
          success: false,
          error: 'Bad Request',
          message: 'File ID is required',
        },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Find and update file
    const fileIndex = mockUploadedFiles.findIndex((f) => f.id === fileId);

    if (fileIndex === -1) {
      return Response.json(
        {
          success: false,
          error: 'Not Found',
          message: 'File not found',
        },
        { status: 404 }
      );
    }

    // Update file metadata
    mockUploadedFiles[fileIndex] = {
      ...mockUploadedFiles[fileIndex],
      ...updates,
    };

    return Response.json({
      success: true,
      message: 'File updated successfully',
      data: mockUploadedFiles[fileIndex],
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: 'Bad Request',
        message: 'Invalid JSON payload',
      },
      { status: 400 }
    );
  }
}
