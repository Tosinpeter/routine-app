import { ExpoRequest, ExpoResponse } from 'expo-router/server';

/**
 * GET /api/hello
 * Example GET endpoint
 */
export async function GET(request: ExpoRequest): Promise<ExpoResponse> {
  try {
    // Parse query parameters
    const url = new URL(request.url);
    const name = url.searchParams.get('name') || 'World';

    return ExpoResponse.json(
      {
        message: `Hello, ${name}!`,
        timestamp: new Date().toISOString(),
        method: 'GET',
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
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/hello
 * Example POST endpoint
 */
export async function POST(request: ExpoRequest): Promise<ExpoResponse> {
  try {
    // Parse request body
    const body = await request.json();

    return ExpoResponse.json(
      {
        message: 'Data received successfully',
        receivedData: body,
        timestamp: new Date().toISOString(),
        method: 'POST',
      },
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return ExpoResponse.json(
      {
        error: 'Bad Request',
        message: 'Invalid JSON payload',
      },
      { status: 400 }
    );
  }
}
