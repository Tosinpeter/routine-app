# API Routes

This directory contains API routes for the Routine App using Expo Router's API Routes feature.

## How It Works

Files ending with `+api.ts` in the `app` directory become API endpoints:

- `app/api/hello+api.ts` → `/api/hello`
- `app/api/users/[id]+api.ts` → `/api/users/:id`

## Available HTTP Methods

Export functions for different HTTP methods:

```typescript
export async function GET(request: ExpoRequest) { }
export async function POST(request: ExpoRequest) { }
export async function PUT(request: ExpoRequest) { }
export async function DELETE(request: ExpoRequest) { }
export async function PATCH(request: ExpoRequest) { }
```

## Dynamic Routes

Use `[parameter]` syntax for dynamic segments:

```typescript
// app/api/users/[id]+api.ts
export async function GET(
  request: ExpoRequest,
  { id }: { id: string }
) {
  // Access the id parameter
  return ExpoResponse.json({ userId: id });
}
```

## Example Endpoints

### GET /api/hello
```bash
curl http://localhost:8081/api/hello?name=John
```

### POST /api/hello
```bash
curl -X POST http://localhost:8081/api/hello \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello World"}'
```

### GET /api/users/123
```bash
curl http://localhost:8081/api/users/123
```

### PUT /api/users/123
```bash
curl -X PUT http://localhost:8081/api/users/123 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name"}'
```

### DELETE /api/users/123
```bash
curl -X DELETE http://localhost:8081/api/users/123
```

## Using in React Native Components

Use the `api` client from `utils/api-client.ts`:

```typescript
import api from '@/utils/api-client';

// In your component
const fetchData = async () => {
  try {
    const response = await api.hello.get('World');
    console.log(response.message);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## Testing

1. Start the development server:
   ```bash
   npm start
   ```

2. The API routes will be available at `http://localhost:8081` (or your expo dev server URL)

3. Test with curl, Postman, or directly from your app

## Important Notes

- API routes work in development mode with `expo start`
- For production, consider using a dedicated backend or services like Supabase, Firebase
- These routes are primarily for development and prototyping
- Add proper authentication and validation for production use
