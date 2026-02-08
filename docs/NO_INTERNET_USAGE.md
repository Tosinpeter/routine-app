# No Internet Screen - Usage Guide

This guide explains how to use the No Internet screen and network monitoring utilities in the app.

## Components & Utilities

### 1. `NoInternetScreen` Component
Located at: `app/no-internet.tsx`

A standalone screen that displays when there's no internet connection.

```tsx
import NoInternetScreen from '@/app/no-internet';

// Use as a standalone screen
<NoInternetScreen onRetry={() => console.log('Retry pressed')} />
```

### 2. `useNetworkStatus` Hook
Located at: `hooks/useNetworkStatus.ts`

A React hook that monitors network connectivity in real-time.

```tsx
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

function MyComponent() {
  const { isConnected, isInternetReachable, type } = useNetworkStatus();

  if (isConnected === false) {
    return <Text>No connection</Text>;
  }

  return <Text>Connected via {type}</Text>;
}
```

### 3. `NetworkStatusWrapper` Component
Located at: `components/network-status-wrapper.tsx`

A wrapper component that automatically shows the no internet screen when offline.

```tsx
import { NetworkStatusWrapper } from '@/components/network-status-wrapper';

function App() {
  return (
    <NetworkStatusWrapper>
      <YourApp />
    </NetworkStatusWrapper>
  );
}
```

### 4. `checkInternetConnection` Function
Located at: `hooks/useNetworkStatus.ts`

A utility function to check internet connection status (async).

```tsx
import { checkInternetConnection } from '@/hooks/useNetworkStatus';

async function handleApiCall() {
  const hasInternet = await checkInternetConnection();
  
  if (!hasInternet) {
    // Show error or navigate to no internet screen
    router.push('/no-internet');
    return;
  }
  
  // Proceed with API call
}
```

## Usage Examples

### Example 1: Wrap entire app with network monitoring

```tsx
// In app/_layout.tsx
import { NetworkStatusWrapper } from '@/components/network-status-wrapper';

export default function RootLayout() {
  return (
    <NetworkStatusWrapper>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </NetworkStatusWrapper>
  );
}
```

### Example 2: Show network status in specific screens

```tsx
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { isConnected } = useNetworkStatus();

  useEffect(() => {
    if (isConnected === false) {
      router.push('/no-internet');
    }
  }, [isConnected]);

  return <View>...</View>;
}
```

### Example 3: Check connection before API calls

```tsx
import { checkInternetConnection } from '@/hooks/useNetworkStatus';
import { router } from 'expo-router';

async function fetchUserData() {
  const hasInternet = await checkInternetConnection();
  
  if (!hasInternet) {
    router.push('/no-internet');
    return;
  }

  try {
    const response = await fetch('https://api.example.com/user');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
  }
}
```

### Example 4: Custom retry logic

```tsx
import NoInternetScreen from '@/app/no-internet';
import { checkInternetConnection } from '@/hooks/useNetworkStatus';

export default function DataScreen() {
  const [showNoInternet, setShowNoInternet] = useState(false);

  const handleRetry = async () => {
    const hasInternet = await checkInternetConnection();
    
    if (hasInternet) {
      setShowNoInternet(false);
      // Retry your data fetch
      fetchData();
    }
  };

  if (showNoInternet) {
    return <NoInternetScreen onRetry={handleRetry} />;
  }

  return <View>...</View>;
}
```

## Styling

The NoInternetScreen uses the app's theme constants:
- Background color: `Colors.light.scaffold`
- Primary button with shadow
- Aeonik fonts for typography
- Responsive scaling using `scale()` and `verticalScale()`

## Assets Required

The screen uses the WiFi error icon image:
- Path: `assets/images/No_Internet-66c1abac-5576-4db2-933f-8c73ddbe25ab.png`

## Platform Support

- ✅ iOS
- ✅ Android
- ✅ Web (with limited network detection)

## Notes

- The `useNetworkStatus` hook updates in real-time as network status changes
- The `NetworkStatusWrapper` only shows the no internet screen when connection is explicitly `false` to avoid flashing on initial load
- The `checkInternetConnection` function is async and returns a Promise
- On web, network detection may be limited compared to native platforms
