/**
 * Type definitions for Profile Data
 */
export interface ProfileData {
  id: string;
  name: string;
  targetGoal: string;
  gender: 'Male' | 'Female' | 'Other';
  age: string;
  skinType: string;
  skinSensitivity: boolean;
  skinConcerns: string[];
  skinConditions: string;
  healthConditions: string;
  focusFaceArea: string[];
  faceScanImageUrl?: string;
  lastUpdated: string;
}

/**
 * Mock profile data
 */
let mockProfileData: ProfileData = {
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
    'Dull skin',
  ],
  skinConditions: "No, I don't",
  healthConditions: "No, I don't",
  focusFaceArea: [
    'Mouth',
    'Nasolabial',
    'Between the eyebrows',
    'Forehead',
    'Eyes',
  ],
  faceScanImageUrl: undefined,
  lastUpdated: new Date().toISOString(),
};

/**
 * GET /api/profile
 * Get user profile data
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const simulateError = url.searchParams.get('error') === 'true';

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulate error state for testing
    if (simulateError) {
      return Response.json(
        {
          error: 'Failed to fetch profile data',
          message: 'Network error occurred',
        },
        { status: 500 }
      );
    }

    // Return mock data
    return Response.json({
      success: true,
      data: {
        ...mockProfileData,
        id: userId || mockProfileData.id,
      },
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
 * PATCH /api/profile
 * Update user profile data (partial update)
 */
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { userId: _userId, ...updates } = body;

    // Validate that at least one field is being updated
    if (Object.keys(updates).length === 0) {
      return Response.json(
        {
          success: false,
          error: 'Bad Request',
          message: 'No fields to update',
        },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Update mock data (in a real app, this would update the database)
    mockProfileData = {
      ...mockProfileData,
      ...updates,
      lastUpdated: new Date().toISOString(),
    };

    return Response.json({
      success: true,
      message: 'Profile updated successfully',
      data: mockProfileData,
    });
  } catch (_error) {
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

/**
 * PUT /api/profile
 * Update user profile data (full update)
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { userId: _userId, ...profileData } = body;

    // Validate required fields
    if (!profileData.name || !profileData.gender) {
      return Response.json(
        {
          success: false,
          error: 'Bad Request',
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Update mock data (in a real app, this would update the database)
    mockProfileData = {
      ...mockProfileData,
      ...profileData,
      lastUpdated: new Date().toISOString(),
    };

    return Response.json({
      success: true,
      message: 'Profile updated successfully',
      data: mockProfileData,
    });
  } catch (_error) {
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
