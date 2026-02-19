/**
 * Type definitions for Address Data
 */
export interface Address {
  id: string;
  type: 'home' | 'work' | 'new';
  address: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Mock address storage (in a real app, this would be a database)
 */
let mockAddresses: Address[] = [
  {
    id: 'addr-1',
    type: 'home',
    address: '123 Main Street, Brooklyn, NY 11201',
    latitude: 40.6782,
    longitude: -73.9442,
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  },
];

/**
 * GET /api/address
 * Get all saved addresses for a user
 */
export async function GET(request: Request) {
  try {
    // Parse query parameters
    const url = new URL(request.url);
    const _userId = url.searchParams.get('userId');
    const type = url.searchParams.get('type');

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Filter by type if provided
    let filteredAddresses = mockAddresses;
    if (type && (type === 'home' || type === 'work' || type === 'new')) {
      filteredAddresses = mockAddresses.filter((addr) => addr.type === type);
    }

    return Response.json({
      success: true,
      data: filteredAddresses,
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
 * POST /api/address
 * Save a new address or update an existing one
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, type, address, latitude, longitude, userId: _userId } = body;

    // Validate required fields
    if (!type || !address || latitude === undefined || longitude === undefined) {
      return Response.json(
        {
          success: false,
          error: 'Bad Request',
          message: 'Missing required fields: type, address, latitude, longitude',
        },
        { status: 400 }
      );
    }

    // Validate type
    if (!['home', 'work', 'new'].includes(type)) {
      return Response.json(
        {
          success: false,
          error: 'Bad Request',
          message: 'Invalid address type. Must be "home", "work", or "new"',
        },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const now = new Date().toISOString();

    // Check if updating existing address or creating new one
    if (id) {
      // Update existing address
      const index = mockAddresses.findIndex((addr) => addr.id === id);
      if (index !== -1) {
        mockAddresses[index] = {
          ...mockAddresses[index],
          type,
          address,
          latitude,
          longitude,
          updatedAt: now,
        };

        return Response.json({
          success: true,
          message: 'Address updated successfully',
          data: mockAddresses[index],
        });
      }
    }

    // For home and work types, replace existing address of same type
    // if (type === 'home' || type === 'work') {
    //   const existingIndex = mockAddresses.findIndex((addr) => addr.type === type);
    //   if (existingIndex !== -1) {
    //     mockAddresses[existingIndex] = {
    //       ...mockAddresses[existingIndex],
    //       address,
    //       latitude,
    //       longitude,
    //       updatedAt: now,
    //     };

    //     return Response.json({
    //       success: true,
    //       message: `${type.charAt(0).toUpperCase() + type.slice(1)} address updated successfully`,
    //       data: mockAddresses[existingIndex],
    //     });
    //   }
    // }

    // Create new address
    const newAddress: Address = {
      id: `addr-${Date.now()}`,
      type,
      address,
      latitude,
      longitude,
      createdAt: now,
      updatedAt: now,
    };

    mockAddresses.push(newAddress);

    return Response.json({
      success: true,
      message: 'Address saved successfully',
      data: newAddress,
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
 * DELETE /api/address
 * Delete a saved address
 */
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return Response.json(
        {
          success: false,
          error: 'Bad Request',
          message: 'Address ID is required',
        },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = mockAddresses.findIndex((addr) => addr.id === id);
    if (index === -1) {
      return Response.json(
        {
          success: false,
          error: 'Not Found',
          message: 'Address not found',
        },
        { status: 404 }
      );
    }

    mockAddresses.splice(index, 1);

    return Response.json({
      success: true,
      message: 'Address deleted successfully',
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
