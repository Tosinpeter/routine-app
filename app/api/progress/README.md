# Progress API Documentation

Mock API endpoints for user progress tracking in the Routine App.

## 📋 Available Endpoints

### 1. Get Progress Data

Get complete progress data for a user including all skin metrics and routine consistency.

**Endpoint:** `GET /api/progress`

**Query Parameters:**
- `userId` (optional): User ID

**Example Request:**
```bash
curl "http://localhost:8081/api/progress?userId=user-123"
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "userId": "user-123",
    "isUnlocked": false,
    "daysUntilUnlock": 12,
    "lastUpdated": "2024-01-15T10:30:00.000Z",
    "metrics": {
      "skinScore": {
        "title": "Skin Score",
        "value": "85",
        "trend": { "value": "+5%", "direction": "up" }
      },
      "skinAge": {
        "title": "Skin Age",
        "value": "25",
        "unit": "years old",
        "trend": { "value": "-2%", "direction": "down" }
      },
      // ... more metrics
    },
    "routineConsistency": {
      "currentStreak": 7,
      "longestStreak": 14,
      "completionRate": 85,
      "weeklyData": [...]
    }
  }
}
```

**Using in React Native:**
```typescript
import api from '@/utils/api-client';

const { data } = await api.progress.get('user-123');
```

**Using with Hook:**
```typescript
import { useProgress } from '@/hooks/useProgress';

const { data, loading, error, refresh } = useProgress('user-123');
```

---

### 2. Update Progress Data

Update user progress data (e.g., after a face scan or routine completion).

**Endpoint:** `POST /api/progress`

**Request Body:**
```json
{
  "userId": "user-123",
  "metrics": {
    "skinScore": {
      "title": "Skin Score",
      "value": "87",
      "trend": { "value": "+7%", "direction": "up" }
    }
  },
  "routineConsistency": {
    "currentStreak": 8
  }
}
```

**Example Request:**
```bash
curl -X POST "http://localhost:8081/api/progress" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-123",
    "metrics": {...}
  }'
```

**Using in React Native:**
```typescript
const response = await api.progress.update({
  userId: 'user-123',
  metrics: {
    skinScore: {
      title: 'Skin Score',
      value: '87',
      trend: { value: '+7%', direction: 'up' }
    }
  }
});
```

---

### 3. Get Progress History

Get historical data for a specific metric to display in charts.

**Endpoint:** `GET /api/progress/history`

**Query Parameters:**
- `metric` (required): Metric name (e.g., 'skinScore', 'hydration', 'acne')
- `period` (optional): Time period ('7d', '30d', '90d', '1y'). Default: '30d'
- `userId` (optional): User ID

**Example Request:**
```bash
curl "http://localhost:8081/api/progress/history?metric=skinScore&period=30d"
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "userId": "user-123",
    "metric": "skinScore",
    "period": "30d",
    "data": [
      { "date": "2024-01-01", "value": 75.5 },
      { "date": "2024-01-02", "value": 76.2 },
      // ... 30 days of data
    ]
  }
}
```

**Using in React Native:**
```typescript
const history = await api.progress.getHistory({
  metric: 'skinScore',
  period: '30d',
  userId: 'user-123'
});
```

**Using with Hook:**
```typescript
import { useProgressHistory } from '@/hooks/useProgress';

const { history, loading } = useProgressHistory('skinScore', '30d');
```

---

### 4. Get Unlock Status

Get the status of progress unlock (for before/after comparison).

**Endpoint:** `GET /api/progress/unlock`

**Query Parameters:**
- `userId` (optional): User ID

**Example Request:**
```bash
curl "http://localhost:8081/api/progress/unlock?userId=user-123"
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "isUnlocked": false,
    "daysUntilUnlock": 12,
    "unlockDate": "2024-02-15T00:00:00.000Z",
    "startDate": "2024-01-16T00:00:00.000Z",
    "requirementDays": 30,
    "currentDays": 18,
    "percentComplete": 60
  }
}
```

**Using in React Native:**
```typescript
const status = await api.progress.getUnlockStatus('user-123');
```

**Using with Hook:**
```typescript
import { useUnlockStatus } from '@/hooks/useProgress';

const { unlockStatus, loading } = useUnlockStatus('user-123');
```

---

### 5. Manually Unlock Progress

Manually unlock progress for testing purposes.

**Endpoint:** `POST /api/progress/unlock`

**Request Body:**
```json
{
  "userId": "user-123",
  "forceUnlock": true
}
```

**Example Request:**
```bash
curl -X POST "http://localhost:8081/api/progress/unlock" \
  -H "Content-Type: application/json" \
  -d '{ "userId": "user-123", "forceUnlock": true }'
```

**Using in React Native:**
```typescript
const result = await api.progress.unlock('user-123', true);
```

---

## 🎯 Available Metrics

- `skinScore` - Overall skin score (0-100)
- `skinAge` - Estimated skin age
- `hydration` - Skin hydration level
- `acne` - Acne score
- `texture` - Skin texture score
- `wrinkles` - Wrinkle severity
- `darkSpots` - Dark spots severity
- `poreSize` - Pore size metric

## 🔧 Usage Example

See the complete working example in:
`app/examples/progress-api-demo.tsx`

To view the demo:
1. Navigate to `/examples/progress-api-demo` in your app
2. The component will automatically fetch and display progress data
3. Use the refresh button to reload data

## 📝 Notes

- All endpoints include simulated delays (150-500ms) to mimic real API behavior
- Data is currently mocked - in production, connect to a real database
- Type definitions are available in `utils/api-client.ts`
- Custom hooks are available in `hooks/useProgress.ts`
