# Upload API Documentation

This document describes the Upload API endpoints for managing file uploads including prescriptions, lab tests, medical reports, and insurance documents.

## Table of Contents

1. [Overview](#overview)
2. [Data Structure](#data-structure)
3. [API Endpoints](#api-endpoints)
4. [Integration Example](#integration-example)
5. [Error Handling](#error-handling)

---

## Overview

The Upload API provides endpoints for uploading, retrieving, and managing files in the Routine App.

**Base URL:** `/api/upload`

**File Location:** `app/api/upload+api.ts`

**Supported File Types:**
- PDF documents (`application/pdf`)
- JPEG images (`image/jpeg`, `image/jpg`)
- PNG images (`image/png`)
- HEIC images (`image/heic`)

**File Size Limit:** 10MB per file

---

## Data Structure

### UploadedFile Interface

```typescript
interface UploadedFile {
  id: string;              // Unique file identifier
  name: string;            // Original filename
  size: number;            // File size in bytes
  type: string;            // MIME type
  url: string;             // File URL/path
  uploadedAt: string;      // ISO timestamp
  status: 'uploading' | 'completed' | 'failed';
}
```

### Example File Data

```typescript
{
  id: 'file-001',
  name: 'Lab test.pdf',
  size: 204800,  // 200 KB
  type: 'application/pdf',
  url: '/uploads/lab-test.pdf',
  uploadedAt: '2024-01-15T10:30:00.000Z',
  status: 'completed'
}
```

---

## API Endpoints

### 1. POST `/api/upload`

Upload a file to the server.

**Content-Type:** `multipart/form-data`

**Form Fields:**
- `file` (required): The file to upload
- `userId` (optional): User identifier

**File Validation:**
- Maximum size: 10MB
- Allowed types: PDF, JPEG, PNG, HEIC

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "id": "file-1705320000000",
    "name": "prescription.pdf",
    "size": 204800,
    "type": "application/pdf",
    "url": "/uploads/prescription.pdf",
    "uploadedAt": "2024-01-15T10:30:00.000Z",
    "status": "completed"
  }
}
```

**Response (Error - 400):**

```json
{
  "success": false,
  "error": "Bad Request",
  "message": "No file provided"
}
```

**Response (Error - 413):**

```json
{
  "success": false,
  "error": "File Too Large",
  "message": "File size must not exceed 10MB"
}
```

**Example (React Native with expo-document-picker):**

```typescript
import * as DocumentPicker from 'expo-document-picker';

const handleUploadFile = async () => {
  try {
    // Pick document
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*'],
      copyToCacheDirectory: true,
    });

    if (result.canceled || !result.assets) return;

    const file = result.assets[0];
    
    // Create FormData
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.mimeType,
    } as any);
    formData.append('userId', 'user-123');

    // Upload
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('Uploaded file:', data.data);
    }
  } catch (error) {
    console.error('Upload error:', error);
  }
};
```

---

### 2. GET `/api/upload`

Get list of uploaded files or a specific file.

**Query Parameters:**
- `userId` (optional): Filter by user ID
- `fileId` (optional): Get specific file by ID
- `error` (optional): Set to `'true'` to simulate error for testing

**Response (Success - 200):**

Get all files:
```json
{
  "success": true,
  "data": [
    {
      "id": "file-002",
      "name": "Medical reports.pdf",
      "size": 204800,
      "type": "application/pdf",
      "url": "/uploads/medical-reports.pdf",
      "uploadedAt": "2024-01-15T11:00:00.000Z",
      "status": "completed"
    },
    {
      "id": "file-001",
      "name": "Lab test.pdf",
      "size": 204800,
      "type": "application/pdf",
      "url": "/uploads/lab-test.pdf",
      "uploadedAt": "2024-01-15T10:30:00.000Z",
      "status": "completed"
    }
  ]
}
```

Get specific file:
```json
{
  "success": true,
  "data": {
    "id": "file-001",
    "name": "Lab test.pdf",
    "size": 204800,
    "type": "application/pdf",
    "url": "/uploads/lab-test.pdf",
    "uploadedAt": "2024-01-15T10:30:00.000Z",
    "status": "completed"
  }
}
```

**Response (Error - 404):**

```json
{
  "success": false,
  "error": "Not Found",
  "message": "File not found"
}
```

**Example:**

```typescript
// Get all files
const response = await fetch('/api/upload');
const result = await response.json();

if (result.success) {
  console.log('Files:', result.data);
}

// Get specific file
const fileResponse = await fetch('/api/upload?fileId=file-001');
const fileResult = await fileResponse.json();

if (fileResult.success) {
  console.log('File:', fileResult.data);
}
```

---

### 3. DELETE `/api/upload`

Delete an uploaded file.

**Query Parameters:**
- `fileId` (required): ID of file to delete

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "File deleted successfully",
  "data": {
    "id": "file-001",
    "name": "Lab test.pdf",
    "size": 204800,
    "type": "application/pdf",
    "url": "/uploads/lab-test.pdf",
    "uploadedAt": "2024-01-15T10:30:00.000Z",
    "status": "completed"
  }
}
```

**Response (Error - 400):**

```json
{
  "success": false,
  "error": "Bad Request",
  "message": "File ID is required"
}
```

**Response (Error - 404):**

```json
{
  "success": false,
  "error": "Not Found",
  "message": "File not found"
}
```

**Example:**

```typescript
const handleDeleteFile = async (fileId: string) => {
  try {
    const response = await fetch(`/api/upload?fileId=${fileId}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (result.success) {
      console.log('File deleted:', result.data);
    }
  } catch (error) {
    console.error('Delete error:', error);
  }
};
```

---

### 4. PATCH `/api/upload`

Update file metadata (e.g., rename file, update status).

**Request Body:**

```json
{
  "fileId": "file-001",
  "name": "Updated Lab Test.pdf",
  "status": "completed"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "File updated successfully",
  "data": {
    "id": "file-001",
    "name": "Updated Lab Test.pdf",
    "size": 204800,
    "type": "application/pdf",
    "url": "/uploads/lab-test.pdf",
    "uploadedAt": "2024-01-15T10:30:00.000Z",
    "status": "completed"
  }
}
```

**Response (Error - 400):**

```json
{
  "success": false,
  "error": "Bad Request",
  "message": "File ID is required"
}
```

**Example:**

```typescript
const handleUpdateFile = async (fileId: string, updates: Partial<UploadedFile>) => {
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

    const result = await response.json();

    if (result.success) {
      console.log('File updated:', result.data);
    }
  } catch (error) {
    console.error('Update error:', error);
  }
};
```

---

## Integration Example

### Complete Upload Flow with Progress

```typescript
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  isCompleted: boolean;
}

export function FileUploadScreen() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handlePickAndUpload = async () => {
    try {
      // Pick document
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
        multiple: true,
      });

      if (result.canceled || !result.assets) return;

      setIsUploading(true);

      // Upload each file
      for (const asset of result.assets) {
        await uploadFile(asset);
      }

      setIsUploading(false);
    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
    }
  };

  const uploadFile = async (asset: any) => {
    // Add file to list with initial progress
    const tempFile: UploadedFile = {
      id: `temp-${Date.now()}`,
      name: asset.name,
      size: asset.size,
      progress: 0,
      isCompleted: false,
    };

    setFiles(prev => [...prev, tempFile]);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setFiles(prev =>
        prev.map(f =>
          f.id === tempFile.id
            ? { ...f, progress: Math.min(f.progress + 10, 90) }
            : f
        )
      );
    }, 200);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', {
        uri: asset.uri,
        name: asset.name,
        type: asset.mimeType,
      } as any);

      // Upload to API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      clearInterval(progressInterval);

      if (result.success) {
        // Update with completed file data
        setFiles(prev =>
          prev.map(f =>
            f.id === tempFile.id
              ? {
                  id: result.data.id,
                  name: result.data.name,
                  size: result.data.size,
                  progress: 100,
                  isCompleted: true,
                }
              : f
          )
        );
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      clearInterval(progressInterval);
      // Remove failed upload
      setFiles(prev => prev.filter(f => f.id !== tempFile.id));
      console.error('Upload failed:', error);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      const response = await fetch(`/api/upload?fileId=${fileId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        setFiles(prev => prev.filter(f => f.id !== fileId));
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePickAndUpload} disabled={isUploading}>
        <Text>Upload Files</Text>
        {isUploading && <ActivityIndicator />}
      </TouchableOpacity>

      {files.map(file => (
        <View key={file.id}>
          <Text>{file.name}</Text>
          <Text>{file.progress}%</Text>
          {file.isCompleted && (
            <TouchableOpacity onPress={() => handleDeleteFile(file.id)}>
              <Text>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
}
```

---

## Error Handling

### Common Error Responses

1. **No File Provided (400)**
```json
{
  "success": false,
  "error": "Bad Request",
  "message": "No file provided"
}
```

2. **File Too Large (413)**
```json
{
  "success": false,
  "error": "File Too Large",
  "message": "File size must not exceed 10MB"
}
```

3. **Invalid File Type (400)**
```json
{
  "success": false,
  "error": "Invalid File Type",
  "message": "Only PDF and image files are allowed"
}
```

4. **File Not Found (404)**
```json
{
  "success": false,
  "error": "Not Found",
  "message": "File not found"
}
```

5. **Server Error (500)**
```json
{
  "success": false,
  "error": "Internal Server Error",
  "message": "Upload failed"
}
```

### Error Handling Example

```typescript
const handleUpload = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      // Handle specific error cases
      switch (response.status) {
        case 400:
          alert('Invalid file or missing data');
          break;
        case 413:
          alert('File is too large (max 10MB)');
          break;
        case 500:
          alert('Server error, please try again');
          break;
        default:
          alert(result.message || 'Upload failed');
      }
      return;
    }

    // Success
    console.log('File uploaded:', result.data);
  } catch (error) {
    console.error('Network error:', error);
    alert('Network error, please check your connection');
  }
};
```

---

## Best Practices

1. **Validate Files Client-Side**: Check file size and type before uploading
2. **Show Progress**: Display upload progress to users
3. **Handle Errors Gracefully**: Provide clear error messages
4. **Allow Retry**: Let users retry failed uploads
5. **Confirm Deletion**: Ask for confirmation before deleting files
6. **Optimize File Size**: Compress images before upload when possible
7. **Use Secure Connections**: Always upload over HTTPS in production

---

## Notes

- Mock data is stored in memory and will reset on server restart
- Upload delays are simulated (300-800ms) to mimic real network conditions
- Files are sorted by upload date (newest first) when retrieved
- File URLs are mock paths - in production, these would be actual storage URLs
