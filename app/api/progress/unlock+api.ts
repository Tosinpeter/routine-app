import { ExpoRequest, ExpoResponse } from 'expo-router/server';

/**
 * Type definitions for Progress Unlock
 */
interface UnlockStatus {
  isUnlocked: boolean;
  daysUntilUnlock: number;
  unlockDate: string | null;
  startDate: string;
  requirementDays: number;
  currentDays: number;
  percentComplete: number;
}

/**
 * GET /api/progress/unlock
 * Get progress unlock status
 */
export async function GET(request: ExpoRequest): Promise<ExpoResponse> {
  try {
    const url = new URL(request.url);
    const _userId = url.searchParams.get('userId') || 'user-123';

    // Mock data: User started 18 days ago, needs 30 days total
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 18);

    const requirementDays = 30;
    const currentDays = 18;
    const daysUntilUnlock = requirementDays - currentDays;
    const isUnlocked = currentDays >= requirementDays;

    const unlockDate = new Date(startDate);
    unlockDate.setDate(unlockDate.getDate() + requirementDays);

    const unlockStatus: UnlockStatus = {
      isUnlocked,
      daysUntilUnlock: Math.max(0, daysUntilUnlock),
      unlockDate: isUnlocked ? unlockDate.toISOString() : unlockDate.toISOString(),
      startDate: startDate.toISOString(),
      requirementDays,
      currentDays,
      percentComplete: Math.round((currentDays / requirementDays) * 100),
    };

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 150));

    return ExpoResponse.json(
      {
        success: true,
        data: unlockStatus,
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return ExpoResponse.json(
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
 * POST /api/progress/unlock
 * Manually unlock progress (for testing purposes)
 */
export async function POST(request: ExpoRequest): Promise<ExpoResponse> {
  try {
    const body = await request.json();
    const { userId: _userId, forceUnlock } = body;

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 300));

    return ExpoResponse.json(
      {
        success: true,
        message: forceUnlock
          ? 'Progress unlocked successfully'
          : 'Unlock status updated',
        data: {
          isUnlocked: forceUnlock || false,
          daysUntilUnlock: forceUnlock ? 0 : 12,
          unlockDate: forceUnlock ? new Date().toISOString() : null,
        },
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (_error) {
    return ExpoResponse.json(
      {
        success: false,
        error: 'Bad Request',
        message: 'Invalid request payload',
      },
      { status: 400 }
    );
  }
}
