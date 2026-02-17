/**
 * Type definitions for Home Data
 */
interface TreatmentPlan {
  current: number;
  total: number;
  title: string;
  subtitle: string;
}

interface HomeData {
  userId: string;
  userName: string;
  isUnlocked: boolean;
  treatmentPlan: TreatmentPlan;
  hasNotifications: boolean;
  lastUpdated: string;
}

/**
 * Mock home data
 */
const mockHomeData: HomeData = {
  userId: 'user-123',
  userName: 'Aslam Uddin',
  isUnlocked: true,
  treatmentPlan: {
    current: 1,
    total: 4,
    title: 'Your Skin Routine',
    subtitle: 'Treatment Plan',
  },
  hasNotifications: true,
  lastUpdated: new Date().toISOString(),
};

/**
 * GET /api/home
 * Get home page data including user info and treatment plan
 */
export async function GET(request: Request) {
  try {
    // Parse query parameters
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const simulateError = url.searchParams.get('error') === 'true';

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate error state for testing
    if (simulateError) {
      return Response.json(
        {
          error: 'Failed to fetch home data',
          message: 'Network error occurred',
        },
        { status: 500 }
      );
    }

    // Return mock data
    return Response.json({
      success: true,
      data: {
        ...mockHomeData,
        userId: userId || mockHomeData.userId,
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
 * POST /api/home
 * Update home data (e.g., treatment plan progress)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, treatmentPlan } = body;

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real app, you would save this to a database
    const updatedHome: HomeData = {
      ...mockHomeData,
      userId: userId || mockHomeData.userId,
      lastUpdated: new Date().toISOString(),
      treatmentPlan: treatmentPlan || mockHomeData.treatmentPlan,
    };

    return Response.json({
      success: true,
      message: 'Home data updated successfully',
      data: updatedHome,
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
