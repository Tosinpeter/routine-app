# Profile API Documentation

This document describes the Profile API endpoints, data structures, and usage patterns for managing user profile information in the Routine App.

## Table of Contents

1. [Overview](#overview)
2. [Data Structure](#data-structure)
3. [API Endpoints](#api-endpoints)
4. [Using the Profile Hook](#using-the-profile-hook)
5. [Redux Integration](#redux-integration)
6. [Example Usage](#example-usage)

---

## Overview

The Profile API provides endpoints for fetching and updating user profile information including personal details, skin analysis, and treatment preferences.

**Base URL:** `/api/profile`

**File Location:** `app/api/profile+api.ts`

**Hook Location:** `hooks/use-profile.ts`

**Redux Slice:** `store/slices/profile-slice.ts`

---

## Data Structure

### ProfileData Interface

```typescript
interface ProfileData {
  id: string;                    // Unique profile identifier
  name: string;                  // User's full name
  targetGoal: string;            // Primary skincare goal
  gender: 'Male' | 'Female' | 'Other';
  age: string;                   // Age range
  skinType: string;              // Skin type (e.g., "Combination", "Oily")
  skinSensitivity: boolean;      // Whether user has sensitive skin
  skinConcerns: string[];        // Array of skin concerns
  skinConditions: string;        // Existing skin conditions
  healthConditions: string;      // Health conditions that may affect treatment
  focusFaceArea: string[];       // Areas user wants to focus on
  faceScanImageUrl?: string;     // Optional face scan image URL
  lastUpdated: string;           // ISO timestamp of last update
}
```

### Example Profile Data

```typescript
{
  id: 'profile-123',
  name: 'Aslam Uddin',
  targetGoal: 'Oily Shine',
  gender: 'Male',
  age: 'Under 25',
  skinType: 'Combination',
  skinSensitivity: false,
  skinConcerns: [
    'Wants moisture all the time',
    'Tightness',
    'Tiny wrinkles',
    'Dull skin'
  ],
  skinConditions: "No, I don't",
  healthConditions: "No, I don't",
  focusFaceArea: [
    'Mouth',
    'Nasolabial',
    'Between the eyebrows',
    'Forehead',
    'Eyes'
  ],
  lastUpdated: '2024-01-15T10:30:00.000Z'
}
```

---

## API Endpoints

### 1. GET `/api/profile`

Fetch user profile data.

**Query Parameters:**
- `userId` (optional): User identifier
- `error` (optional): Set to `'true'` to simulate error for testing

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "id": "profile-123",
    "name": "Aslam Uddin",
    "targetGoal": "Oily Shine",
    "gender": "Male",
    "age": "Under 25",
    "skinType": "Combination",
    "skinSensitivity": false,
    "skinConcerns": ["Wants moisture all the time", "Tightness"],
    "skinConditions": "No, I don't",
    "healthConditions": "No, I don't",
    "focusFaceArea": ["Mouth", "Nasolabial"],
    "lastUpdated": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response (Error - 500):**

```json
{
  "success": false,
  "error": "Internal Server Error",
  "message": "Detailed error message"
}
```

**Example:**

```typescript
// Fetch profile
const response = await fetch('/api/profile?userId=user-123');
const result = await response.json();

if (result.success) {
  console.log('Profile:', result.data);
}
```

---

### 2. PATCH `/api/profile`

Update specific profile fields (partial update).

**Request Body:**

```json
{
  "userId": "profile-123",
  "name": "John Doe",
  "targetGoal": "Anti-Aging"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "profile-123",
    "name": "John Doe",
    "targetGoal": "Anti-Aging",
    // ... rest of profile data
    "lastUpdated": "2024-01-15T11:00:00.000Z"
  }
}
```

**Response (Error - 400):**

```json
{
  "success": false,
  "error": "Bad Request",
  "message": "No fields to update"
}
```

**Example:**

```typescript
// Update name only
const response = await fetch('/api/profile', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'profile-123',
    name: 'Jane Smith'
  })
});

const result = await response.json();
```

---

### 3. PUT `/api/profile`

Update entire profile (full update). Requires name and gender fields.

**Request Body:**

```json
{
  "userId": "profile-123",
  "name": "John Doe",
  "targetGoal": "Anti-Aging",
  "gender": "Male",
  "age": "25-35",
  "skinType": "Dry",
  "skinSensitivity": true,
  "skinConcerns": ["Fine lines", "Wrinkles"],
  "skinConditions": "None",
  "healthConditions": "None",
  "focusFaceArea": ["Eyes", "Forehead"]
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    // Full updated profile data
  }
}
```

**Response (Error - 400):**

```json
{
  "success": false,
  "error": "Bad Request",
  "message": "Missing required fields"
}
```

---

## Using the Profile Hook

### Import

```typescript
import { useProfile } from '@/hooks/use-profile';
```

### Hook Interface

```typescript
interface UseProfileReturn {
  profile: ProfileData | null;           // Current profile data
  isLoading: boolean;                    // Loading state for fetch
  isUpdating: boolean;                   // Loading state for updates
  error: string | null;                  // Error message if any
  fetchProfile: (userId?: string) => Promise<void>;
  updateProfile: (updates: UpdateProfileParams) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
}
```

### Basic Usage

```typescript
import { useProfile } from '@/hooks/use-profile';

function ProfileScreen() {
  const { 
    profile, 
    isLoading, 
    isUpdating,
    error,
    fetchProfile, 
    updateProfile 
  } = useProfile();

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateName = async () => {
    const success = await updateProfile({ name: 'New Name' });
    if (success) {
      console.log('Profile updated!');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <View>
      <Text>{profile?.name}</Text>
      <Button 
        title="Update" 
        onPress={handleUpdateName}
        disabled={isUpdating}
      />
    </View>
  );
}
```

---

## Redux Integration

### State Structure

```typescript
interface ProfileState {
  profileData: ProfileData | null;
  isLoading: boolean;
  error: string | null;
  isUpdating: boolean;
}
```

### Actions

```typescript
import {
  setProfileLoading,
  setProfileData,
  setProfileError,
  setProfileUpdating,
  updateProfileField,
  clearProfileData,
} from '@/store/slices/profile-slice';
```

### Using Redux Directly

```typescript
import { useSelector, useDispatch } from 'react-redux';
import { setProfileData } from '@/store/slices/profile-slice';
import type { RootState } from '@/store';

function MyComponent() {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile.profileData);
  const isLoading = useSelector((state: RootState) => state.profile.isLoading);

  // Manually dispatch actions if needed
  dispatch(setProfileData(newProfileData));
}
```

---

## Example Usage

### Complete Profile Screen Example

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { useProfile } from '@/hooks/use-profile';

export default function ProfileDetailsScreen() {
  const { profile, isLoading, isUpdating, error, fetchProfile, updateProfile } = useProfile();
  const [editName, setEditName] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (editName.trim()) {
      const success = await updateProfile({ name: editName.trim() });
      if (success) {
        setIsEditMode(false);
        setEditName('');
      }
    }
  };

  if (isLoading && !profile) {
    return <ActivityIndicator size="large" />;
  }

  if (error && !profile) {
    return (
      <View>
        <Text>Error: {error}</Text>
        <Button title="Retry" onPress={() => fetchProfile()} />
      </View>
    );
  }

  return (
    <View>
      <Text>Profile Details</Text>
      
      {!isEditMode ? (
        <>
          <Text>Name: {profile?.name}</Text>
          <Button title="Edit" onPress={() => {
            setEditName(profile?.name || '');
            setIsEditMode(true);
          }} />
        </>
      ) : (
        <>
          <TextInput
            value={editName}
            onChangeText={setEditName}
            placeholder="Enter name"
          />
          <Button 
            title="Save" 
            onPress={handleSave}
            disabled={isUpdating}
          />
          <Button 
            title="Cancel" 
            onPress={() => setIsEditMode(false)}
          />
        </>
      )}

      <Text>Gender: {profile?.gender}</Text>
      <Text>Age: {profile?.age}</Text>
      <Text>Skin Type: {profile?.skinType}</Text>
      <Text>Target Goal: {profile?.targetGoal}</Text>
    </View>
  );
}
```

### Update Multiple Fields

```typescript
const handleUpdateProfile = async () => {
  const success = await updateProfile({
    name: 'John Doe',
    age: '25-35',
    skinType: 'Combination',
    targetGoal: 'Anti-Aging',
  });

  if (success) {
    console.log('Profile updated successfully!');
  }
};
```

### Update Array Fields

```typescript
const handleUpdateSkinConcerns = async () => {
  const success = await updateProfile({
    skinConcerns: [
      'Acne',
      'Dark spots',
      'Fine lines'
    ]
  });
};

const handleUpdateFocusAreas = async () => {
  const success = await updateProfile({
    focusFaceArea: [
      'Forehead',
      'Eyes',
      'Cheeks'
    ]
  });
};
```

---

## Testing

### Test Error State

```typescript
// Fetch with error simulation
await fetch('/api/profile?error=true');
```

### Test Loading States

```typescript
// Component should show loading spinner
const { isLoading } = useProfile();

useEffect(() => {
  fetchProfile(); // Will set isLoading to true
}, []);

// Show loading UI
if (isLoading) return <LoadingSpinner />;
```

### Test Update States

```typescript
const { isUpdating, updateProfile } = useProfile();

const handleUpdate = async () => {
  // isUpdating will be true during update
  await updateProfile({ name: 'New Name' });
  // isUpdating will be false after completion
};

// Disable button during update
<Button disabled={isUpdating} onPress={handleUpdate} />
```

---

## Best Practices

1. **Fetch on Mount**: Always fetch profile data when the screen mounts
   ```typescript
   useEffect(() => {
     fetchProfile();
   }, []);
   ```

2. **Handle Loading States**: Show appropriate loading UI
   ```typescript
   if (isLoading && !profile) return <LoadingSpinner />;
   ```

3. **Handle Errors**: Provide error feedback and retry options
   ```typescript
   if (error) return <ErrorMessage error={error} onRetry={fetchProfile} />;
   ```

4. **Disable During Updates**: Disable inputs/buttons during updates
   ```typescript
   <Button disabled={isUpdating} />
   ```

5. **Validate Before Update**: Check data before calling updateProfile
   ```typescript
   if (name.trim()) {
     await updateProfile({ name: name.trim() });
   }
   ```

6. **Use Partial Updates**: Use PATCH for updating specific fields
   ```typescript
   // Only update what changed
   await updateProfile({ name: newName });
   ```

---

## Notes

- Mock data is stored in memory and will reset on server restart
- API includes simulated delays (500-800ms) to mimic real network conditions
- All timestamps are in ISO 8601 format
- The profile hook automatically manages Redux state
- Profile data persists in Redux store during app session
