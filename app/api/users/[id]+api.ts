import { ExpoRequest, ExpoResponse } from 'expo-router/server';

/**
 * GET /api/users/[id]
 * Example dynamic route - get user by ID
 */
export async function GET(
  request: ExpoRequest,
  { id }: { id: string }
): Promise<ExpoResponse> {
  try {
    // In a real app, you'd fetch from a database
    // This is just a mock response
    const mockUser = {
      id,
      name: `User ${id}`,
      email: `user${id}@example.com`,
      createdAt: new Date().toISOString(),
    };

    return ExpoResponse.json(
      {
        success: true,
        data: mockUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return ExpoResponse.json(
      {
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users/[id]
 * Example PUT endpoint - update user
 */
export async function PUT(
  request: ExpoRequest,
  { id }: { id: string }
): Promise<ExpoResponse> {
  try {
    const body = await request.json();

    // In a real app, you'd update the database
    const updatedUser = {
      id,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return ExpoResponse.json(
      {
        success: true,
        message: 'User updated successfully',
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (_error) {
    return ExpoResponse.json(
      {
        error: 'Bad Request',
        message: 'Invalid JSON payload',
      },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/users/[id]
 * Example DELETE endpoint - delete user
 */
export async function DELETE(
  request: ExpoRequest,
  { id }: { id: string }
): Promise<ExpoResponse> {
  try {
    // In a real app, you'd delete from database
    return ExpoResponse.json(
      {
        success: true,
        message: `User ${id} deleted successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    return ExpoResponse.json(
      {
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
