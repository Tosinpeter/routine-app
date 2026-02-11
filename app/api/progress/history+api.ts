import { ExpoRequest, ExpoResponse } from 'expo-router/server';

/**
 * Type definitions for Progress History
 */
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

/**
 * Generate mock historical data
 */
function generateHistoricalData(
  days: number,
  startValue: number,
  variance: number = 5
): HistoricalMetric[] {
  const data: HistoricalMetric[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Generate trending data with some randomness
    const trend = (days - i) / days; // 0 to 1
    const randomVariance = (Math.random() - 0.5) * variance;
    const value = Math.max(
      0,
      Math.min(100, startValue + trend * 10 + randomVariance)
    );

    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value * 10) / 10,
    });
  }

  return data;
}

/**
 * GET /api/progress/history
 * Get historical progress data for charts
 */
export async function GET(request: ExpoRequest): Promise<ExpoResponse> {
  try {
    const url = new URL(request.url);
    const metric = url.searchParams.get('metric') || 'skinScore';
    const period = (url.searchParams.get('period') || '30d') as
      | '7d'
      | '30d'
      | '90d'
      | '1y';
    const userId = url.searchParams.get('userId') || 'user-123';

    // Determine number of days based on period
    const daysMap = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '1y': 365,
    };
    const days = daysMap[period];

    // Generate appropriate starting value based on metric
    const metricStartValues: { [key: string]: number } = {
      skinScore: 75,
      skinAge: 28,
      hydration: 70,
      acne: 85,
      texture: 80,
      wrinkles: 75,
      darkSpots: 72,
      poreSize: 70,
    };

    const startValue = metricStartValues[metric] || 75;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    const historyData: ProgressHistory = {
      userId,
      metric,
      period,
      data: generateHistoricalData(days, startValue),
    };

    return ExpoResponse.json(
      {
        success: true,
        data: historyData,
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
