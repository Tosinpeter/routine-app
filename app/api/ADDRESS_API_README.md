# Address API Documentation

This document describes the Address API endpoints and how to use them in the Routine App.

## Overview

The Address API allows users to save, retrieve, and delete addresses (home, work, or custom addresses).

## API Endpoints

### 1. GET /api/address

Retrieves all saved addresses or filters by type.

**Query Parameters:**
- `userId` (optional): User ID for filtering
- `type` (optional): Address type - `home`, `work`, or `new`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "addr-1",
      "type": "home",
      "address": "123 Main Street, Brooklyn, NY 11201",
      "latitude": 40.6782,
      "longitude": -73.9442,
      "createdAt": "2024-01-15T00:00:00.000Z",
      "updatedAt": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

### 2. POST /api/address

Saves a new address or updates an existing one.

**Request Body:**
```json
{
  "id": "addr-1",           // Optional: if updating existing address
  "type": "home",           // Required: "home", "work", or "new"
  "address": "123 Main St", // Required: address string
  "latitude": 40.6782,      // Required: latitude coordinate
  "longitude": -73.9442,    // Required: longitude coordinate
  "userId": "user-123"      // Optional: user ID
}
```

**Response:**
```json
{
  "success": true,
  "message": "Address saved successfully",
  "data": {
    "id": "addr-1",
    "type": "home",
    "address": "123 Main St",
    "latitude": 40.6782,
    "longitude": -73.9442,
    "createdAt": "2024-01-15T00:00:00.000Z",
    "updatedAt": "2024-01-15T00:00:00.000Z"
  }
}
```

### 3. DELETE /api/address

Deletes a saved address by ID.

**Query Parameters:**
- `id` (required): Address ID to delete

**Response:**
```json
{
  "success": true,
  "message": "Address deleted successfully"
}
```

## Usage with Custom Hook

The recommended way to interact with the Address API is through the `useAddress` hook:

```typescript
import { useAddress } from '@/hooks/use-address';

function MyComponent() {
  const { addresses, isLoading, error, saveAddress, fetchAddresses, deleteAddress } = useAddress();

  // Save a new address
  const handleSave = async () => {
    const savedAddress = await saveAddress({
      type: 'home',
      address: '123 Main St',
      latitude: 40.6782,
      longitude: -73.9442,
    });

    if (savedAddress) {
      console.log('Address saved:', savedAddress);
    }
  };

  // Fetch all addresses
  const handleFetch = async () => {
    await fetchAddresses(); // All addresses
    // OR
    await fetchAddresses('home'); // Only home addresses
  };

  // Delete an address
  const handleDelete = async (id: string) => {
    const success = await deleteAddress(id);
    if (success) {
      console.log('Address deleted');
    }
  };

  return (
    // Your component JSX
  );
}
```

## Address Types

- **home**: User's home address (only one allowed, replaces existing)
- **work**: User's work address (only one allowed, replaces existing)
- **new**: Custom address (multiple allowed)

## Features

- ✅ Save and update addresses with GPS coordinates
- ✅ Retrieve all addresses or filter by type
- ✅ Delete addresses
- ✅ Automatic replacement of home/work addresses (only one of each type allowed)
- ✅ Multiple custom addresses supported
- ✅ Mock data storage (ready for database integration)

## Integration with UI

The `add-address.tsx` screen demonstrates the complete integration:

1. User selects location on map
2. User enters address details
3. On confirm, address is saved via the API
4. Success/error feedback is shown
5. User is navigated back on success

## Error Handling

All endpoints return appropriate error responses:

```json
{
  "success": false,
  "error": "Error Type",
  "message": "Detailed error message"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad Request (validation error)
- `404`: Not Found
- `500`: Internal Server Error

## Next Steps

To integrate with a real backend:

1. Replace mock data storage with actual database calls
2. Add user authentication and authorization
3. Implement address validation/geocoding service
4. Add address search functionality
5. Implement address suggestions/autocomplete
