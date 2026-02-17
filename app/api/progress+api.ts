/**
 * Type definitions for Progress Data
 */
interface Trend {
  value: string;
  direction: 'up' | 'down';
}

interface SkinMetric {
  title: string;
  value: string;
  unit?: string;
  trend?: Trend;
}

interface ProgressData {
  userId: string;
  isUnlocked: boolean;
  daysUntilUnlock: number;
  lastUpdated: string;
  metrics: {
    skinScore: SkinMetric;
    skinAge: SkinMetric;
    hydration: SkinMetric;
    acne: SkinMetric;
    texture: SkinMetric;
    wrinkles: SkinMetric;
    darkSpots: SkinMetric;
    poreSize: SkinMetric;
  };
  routineConsistency: {
    currentStreak: number;
    longestStreak: number;
    completionRate: number;
    weeklyData: {
      day: string;
      completed: boolean;
    }[];
  };
}

/**
 * Mock progress data
 */
const mockProgressData: ProgressData = {
  userId: 'user-123',
  isUnlocked: true,
  daysUntilUnlock: 12,
  lastUpdated: new Date().toISOString(),
  metrics: {
    skinScore: {
      title: 'Skin Scssore',
      value: '85',
      trend: {
        value: '+5%',
        direction: 'up',
      },
    },
    skinAge: {
      title: 'Skin Age',
      value: '25',
      unit: 'years old',
      trend: {
        value: '-2%',
        direction: 'down',
      },
    },
    hydration: {
      title: 'Hydration',
      value: '85',
      trend: {
        value: '+10%',
        direction: 'up',
      },
    },
    acne: {
      title: 'Acne',
      value: '90',
      trend: {
        value: '-5%',
        direction: 'down',
      },
    },
    texture: {
      title: 'Texture',
      value: '90',
      trend: {
        value: '+5%',
        direction: 'up',
      },
    },
    wrinkles: {
      title: 'Wrinkles',
      value: '85',
      trend: {
        value: '-5%',
        direction: 'down',
      },
    },
    darkSpots: {
      title: 'Dark Spots',
      value: '85',
      trend: {
        value: '+7%',
        direction: 'up',
      },
    },
    poreSize: {
      title: 'Pore Size',
      value: '78',
      trend: {
        value: '-3%',
        direction: 'down',
      },
    },
  },
  routineConsistency: {
    currentStreak: 7,
    longestStreak: 14,
    completionRate: 85,
    weeklyData: [
      { day: 'Mon', completed: true },
      { day: 'Tue', completed: true },
      { day: 'Wed', completed: true },
      { day: 'Thu', completed: false },
      { day: 'Fri', completed: true },
      { day: 'Sat', completed: true },
      { day: 'Sun', completed: true },
    ],
  },
};

/**
 * GET /api/progress
 * Get user progress data
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
          error: 'Failed to fetch progress', 
          message: 'Network error occurred' 
        },
        { status: 500 }
      );
    }

    // Return mock data
    return Response.json({
      success: true,
      data: {
        ...mockProgressData,
        userId: userId || mockProgressData.userId,
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
 * POST /api/progress
 * Update user progress data (e.g., after face scan)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, metrics, routineConsistency } = body;

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real app, you would save this to a database
    const updatedProgress: ProgressData = {
      ...mockProgressData,
      userId: userId || mockProgressData.userId,
      lastUpdated: new Date().toISOString(),
      metrics: metrics || mockProgressData.metrics,
      routineConsistency:
        routineConsistency || mockProgressData.routineConsistency,
    };

    return Response.json({
      success: true,
      message: 'Progress updated successfully',
      data: updatedProgress,
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
