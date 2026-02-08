# No Internet Screen - Quick Start Guide

## 🎉 What Was Created

A complete no internet connectivity solution including:
- ✅ No Internet Screen with matching UI design
- ✅ Real-time network status monitoring hook
- ✅ Automatic network status wrapper component
- ✅ Utility function for checking internet connection
- ✅ Demo screen with examples

## 📦 Files Created

1. **`app/no-internet.tsx`** - The main no internet screen component
2. **`hooks/useNetworkStatus.ts`** - Network monitoring hook and utility
3. **`hooks/index.ts`** - Centralized hook exports
4. **`components/network-status-wrapper.tsx`** - Auto-detecting wrapper
5. **`app/examples/network-demo.tsx`** - Demo/example screen
6. **`docs/NO_INTERNET_USAGE.md`** - Comprehensive usage guide

## 🚀 Quick Start (3 Ways)

### Method 1: Navigate to Screen Directly (Simplest)

```tsx
import { router } from 'expo-router';

// When you detect no internet
router.push('/no-internet');
```

### Method 2: Use the Hook (Recommended)

```tsx
import { useNetworkStatus } from '@/hooks';

function MyScreen() {
  const { isConnected } = useNetworkStatus();

  if (isConnected === false) {
    router.push('/no-internet');
  }

  return <YourContent />;
}
```

### Method 3: Wrap Your App (Automatic)

```tsx
// In app/_layout.tsx
import { NetworkStatusWrapper } from '@/components/network-status-wrapper';

export default function RootLayout() {
  return (
    <NetworkStatusWrapper>
      <YourApp />
    </NetworkStatusWrapper>
  );
}
```

## 🧪 Testing

### Test the Demo Screen

Navigate to `/examples/network-demo` to see:
- Real-time network status
- Manual connection checking
- Quick access to no internet screen

```tsx
// Add to your navigation
router.push('/examples/network-demo');
```

### Test Offline Mode

1. Turn off WiFi and mobile data on your device
2. The status will update automatically (if using hook or wrapper)
3. Navigate to any screen that uses network detection

## 💡 Common Use Cases

### Before API Calls

```tsx
import { checkInternetConnection } from '@/hooks';

async function fetchData() {
  const hasInternet = await checkInternetConnection();
  
  if (!hasInternet) {
    router.push('/no-internet');
    return;
  }
  
  // Safe to make API call
  const response = await fetch('...');
}
```

### Show Banner Instead of Full Screen

```tsx
import { useNetworkStatus } from '@/hooks';

function MyScreen() {
  const { isConnected } = useNetworkStatus();

  return (
    <View>
      {isConnected === false && (
        <View style={styles.banner}>
          <Text>⚠️ No internet connection</Text>
        </View>
      )}
      <YourContent />
    </View>
  );
}
```

### Custom Retry Logic

```tsx
import NoInternetScreen from '@/app/no-internet';

function MyScreen() {
  const [offline, setOffline] = useState(false);
  
  const handleRetry = async () => {
    const connected = await checkInternetConnection();
    if (connected) {
      setOffline(false);
      refetchData();
    }
  };

  if (offline) {
    return <NoInternetScreen onRetry={handleRetry} />;
  }
  
  return <YourContent />;
}
```

## 📱 Design Specs

The screen matches your provided design:
- **Background**: Scaffold color (#EDEBE3)
- **Icon**: WiFi error icon from assets
- **Heading**: "Oops!" (Aeonik Bold, 30px)
- **Subtitle**: "No Internet found..." (Aeonik Medium, 14px)
- **Button**: Primary button with shadow ("Try again")

## 🔧 Customization

### Change Button Text

```tsx
// In app/no-internet.tsx, line 135
<PrimaryButton
  title="Retry" // Change this
  onPress={handleTryAgain}
  withShadow
/>
```

### Change Messages

```tsx
// In app/no-internet.tsx
<Text style={styles.headline}>Connection Lost!</Text>
<Text style={styles.subtitle}>
  Please check your connection and try again.
</Text>
```

### Add Custom Actions

```tsx
<NoInternetScreen 
  onRetry={() => {
    console.log('Retrying...');
    refetchData();
  }} 
/>
```

## 📚 Need More Info?

See the comprehensive guide: `docs/NO_INTERNET_USAGE.md`

## 🎯 Next Steps

1. Choose your preferred method (navigate, hook, or wrapper)
2. Test with the demo screen
3. Integrate into your existing screens
4. Customize as needed

Happy coding! 🚀
