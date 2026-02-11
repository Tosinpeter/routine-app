/**
 * API Client Utility
 * Helper functions to call your API routes
 */

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || '';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: HeadersInit;
  body?: any;
}

/**
 * Generic API request handler
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', headers = {}, body } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: 'Unknown error',
      }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${method} ${endpoint}):`, error);
    throw error;
  }
}

/**
 * Type definitions for Progress API
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
    weeklyData: Array<{
      day: string;
      completed: boolean;
    }>;
  };
}

interface HistoricalMetric {
  date: string;
  value: number;
}

interface ProgressHistory {
  userId: string;
  metric: string;
  data: HistoricalMetric[];
  period: '7d' | '30d' | '90d' | '1y';
}

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
 * Example API client functions
 */
export const api = {
  // GET request example
  hello: {
    get: (name?: string) => {
      const query = name ? `?name=${encodeURIComponent(name)}` : '';
      return apiRequest<{ message: string; timestamp: string }>(
        `/api/hello${query}`
      );
    },
    post: (data: any) => {
      return apiRequest<{ message: string; receivedData: any }>(
        '/api/hello',
        {
          method: 'POST',
          body: data,
        }
      );
    },
  },

  // User endpoints
  users: {
    getById: (id: string) => {
      return apiRequest<{ success: boolean; data: any }>(
        `/api/users/${id}`
      );
    },
    update: (id: string, data: any) => {
      return apiRequest<{ success: boolean; message: string; data: any }>(
        `/api/users/${id}`,
        {
          method: 'PUT',
          body: data,
        }
      );
    },
    delete: (id: string) => {
      return apiRequest<{ success: boolean; message: string }>(
        `/api/users/${id}`,
        {
          method: 'DELETE',
        }
      );
    },
  },

  // Progress endpoints
  progress: {
    /**
     * Get user progress data
     */
    get: (userId?: string) => {
      const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
      return apiRequest<{ success: boolean; data: ProgressData }>(
        `/api/progress${query}`
      );
    },

    /**
     * Update user progress data
     */
    update: (data: {
      userId?: string;
      metrics?: any;
      routineConsistency?: any;
    }) => {
      return apiRequest<{
        success: boolean;
        message: string;
        data: ProgressData;
      }>('/api/progress', {
        method: 'POST',
        body: data,
      });
    },

    /**
     * Get historical progress data for a specific metric
     */
    getHistory: (params: {
      metric: string;
      period?: '7d' | '30d' | '90d' | '1y';
      userId?: string;
    }) => {
      const { metric, period = '30d', userId } = params;
      const queryParams = new URLSearchParams({
        metric,
        period,
        ...(userId && { userId }),
      });
      return apiRequest<{ success: boolean; data: ProgressHistory }>(
        `/api/progress/history?${queryParams.toString()}`
      );
    },

    /**
     * Get progress unlock status
     */
    getUnlockStatus: (userId?: string) => {
      const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
      return apiRequest<{ success: boolean; data: UnlockStatus }>(
        `/api/progress/unlock${query}`
      );
    },

    /**
     * Manually unlock progress (for testing)
     */
    unlock: (userId?: string, forceUnlock = true) => {
      return apiRequest<{
        success: boolean;
        message: string;
        data: Partial<UnlockStatus>;
      }>('/api/progress/unlock', {
        method: 'POST',
        body: { userId, forceUnlock },
      });
    },
  },
};

export default api;
