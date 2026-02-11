# Architecture & State Management

## Overview

The Routine App follows a **modular, component-based architecture** using React Native with Expo. It leverages modern React patterns, file-based routing, and centralized state management to create a scalable and maintainable codebase.

## 🏛️ Core Architecture

### Application Structure

```
routine-app/
├── app/                    # File-based routing (Expo Router)
│   ├── (tabs)/            # Tab-based navigation screens
│   ├── auth/              # Authentication flow
│   ├── profile/           # Profile management
│   ├── quiz/              # Quiz system
│   ├── payment/           # Payment flow
│   └── _layout.tsx        # Root layout & providers
├── components/            # Reusable UI components
│   ├── home/             # Home screen components
│   ├── product/          # Product detail components
│   ├── profile/          # Profile components
│   ├── progress/         # Progress tracking components
│   ├── quiz/             # Quiz components
│   ├── icons/            # SVG icon components
│   └── ui/               # Generic UI components
├── store/                # Redux state management
│   ├── slices/           # Redux slices
│   ├── index.ts          # Store configuration
│   └── hooks.ts          # Typed Redux hooks
├── contexts/             # React Context providers
├── hooks/                # Custom React hooks
├── constants/            # App constants & themes
├── utils/                # Utility functions
└── i18n/                 # Internationalization
```

## 🗺️ Routing Architecture

### File-Based Routing (Expo Router)

The app uses **Expo Router** for declarative, file-system-based navigation:

```typescript
// Root Layout (app/_layout.tsx)
<Stack>
  <Stack.Screen name="(tabs)" />        // Tab navigation
  <Stack.Screen name="onboarding" />    // Onboarding flow
  <Stack.Screen name="notification" />  // Other screens
  <Stack.Screen name="payment" />
</Stack>

// Tab Layout (app/(tabs)/_layout.tsx)
<Tabs>
  <Tabs.Screen name="index" />      // Home
  <Tabs.Screen name="routine" />    // Routine
  <Tabs.Screen name="skincare" />   // Skincare
  <Tabs.Screen name="progress" />   // Progress
  <Tabs.Screen name="profile" />    // Profile
</Tabs>
```

**Key Features:**
- Type-safe navigation with TypeScript
- Automatic deep linking support
- Layout-based navigation structure
- Platform-specific animations

### Navigation Patterns

1. **Tab Navigation**: Main app screens with persistent bottom tab bar
2. **Stack Navigation**: Nested screens within each tab
3. **Modal Presentation**: Bottom sheets for contextual actions
4. **Deep Linking**: URL-based navigation with scheme `routineapp://`

## 🔄 State Management

### Redux Toolkit (Global State)

Centralized state management for app-wide data using Redux Toolkit:

```typescript
// Store Structure
store/
├── index.ts              // Configure store
├── hooks.ts              // Typed hooks (useAppDispatch, useAppSelector)
└── slices/
    └── home-slice.ts     // Home/Routine state
```

#### Home Slice Example

```typescript
interface HomeState {
  selectedDay: number;
  userName: string;
  timeOfDay: 'morning' | 'evening';
  routineSteps: RoutineStep[];
}

// Actions
- setSelectedDay(day: number)
- setUserName(name: string)
- setTimeOfDay(time: TimeOfDay)
- toggleProductCompletion(id: string)
```

**When to Use Redux:**
- Data shared across multiple screens
- Complex state updates with multiple actions
- Data that needs to persist during navigation
- Examples: User routine, product data, progress tracking

### React Context (Configuration State)

Context API for app-wide configuration and settings:

```typescript
// AppDataProvider (contexts/AppDataProvider.tsx)
interface AppDataContextType {
  currentLanguage: string;
  isLoading: boolean;
  changeLanguage: (locale: string) => Promise<void>;
  t: (key: string) => string;
}
```

**When to Use Context:**
- App configuration (theme, language)
- Authentication state
- Feature flags
- Settings that change infrequently

### Local Component State (useState)

Component-level state using React hooks:

```typescript
// Example: Toggle state in a component
const [isExpanded, setIsExpanded] = useState(false);
const [selectedIndex, setSelectedIndex] = useState(0);
```

**When to Use Local State:**
- UI state (expanded/collapsed, selected item)
- Form inputs before submission
- Temporary state not needed elsewhere
- Loading/error states for individual components

### AsyncStorage (Persistent State)

Persistent storage for user preferences and cached data:

```typescript
// Examples
- Language preference
- Onboarding completion status
- User authentication tokens
- Cached API responses
```

## 🧩 Component Architecture

### Component Organization

```
components/
├── Atomic Components      # Button, Text, Input
├── Feature Components     # ProductCard, RoutineStepCard
├── Page Components        # HomeUnlockedView, ProfileHeader
└── Layout Components      # SafeArea, ScrollView wrappers
```

### Component Patterns

#### 1. Presentational Components
Pure components that receive props and render UI:

```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export function PrimaryButton({ title, onPress, disabled }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
```

#### 2. Container Components
Smart components that connect to state:

```typescript
export default function HomeScreen() {
  const userName = useAppSelector((state) => state.home.userName);
  const routineSteps = useAppSelector((state) => state.home.routineSteps);
  const dispatch = useAppDispatch();

  return <HomeUnlockedView userName={userName} steps={routineSteps} />;
}
```

#### 3. Compound Components
Components with sub-components for flexibility:

```typescript
<ExpandableSection title="Instructions">
  <ExpandableSection.Content>
    {instructions.map((step, index) => (
      <Text key={index}>{step}</Text>
    ))}
  </ExpandableSection.Content>
</ExpandableSection>
```

## 🎣 Custom Hooks

Reusable logic abstracted into custom hooks:

### Network Status Hook
```typescript
// hooks/useNetworkStatus.ts
export function useNetworkStatus(): NetworkStatus {
  const [networkStatus, setNetworkStatus] = useState({
    isConnected: null,
    isInternetReachable: null,
    type: null,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(setNetworkStatus);
    return unsubscribe;
  }, []);

  return networkStatus;
}
```

### Translation Hook
```typescript
// contexts/AppDataProvider.tsx
export function useTranslation() {
  const { t, currentLanguage } = useAppData();
  return { t, currentLanguage };
}
```

### Theme Hook
```typescript
// hooks/use-color-scheme.ts
export function useColorScheme() {
  const colorScheme = useColorScheme();
  return colorScheme ?? 'light';
}
```

## 🎨 Design System

### Theme Structure

```typescript
constants/
├── theme.ts              # Colors, fonts, shadows
├── typography.ts         # Text styles
└── scaling.ts            # Responsive scaling
```

### Responsive Scaling

Platform-independent scaling for consistent UI:

```typescript
// Horizontal scaling
scale(16)           // Scales based on screen width

// Vertical scaling
verticalScale(24)   // Scales based on screen height

// Moderate scaling
moderateScale(14)   // Balanced scaling for fonts

// Icon scaling
scaleIcon(24)       // Scales icons appropriately
```

### Typography System

Consistent text styles across the app:

```typescript
AppTextStyle.h1          // Heading 1
AppTextStyle.h2          // Heading 2
AppTextStyle.body        // Body text
AppTextStyle.caption     // Small text
AppTextStyle.tabLabel    // Tab bar labels
```

## 🌐 Internationalization

### i18n Implementation

Multi-language support using `i18n-js`:

```typescript
i18n/
├── index.ts              # i18n configuration
└── locales/
    ├── en.json          # English translations
    ├── ar.json          # Arabic translations
    ├── fr.json          # French translations
    └── ja.json          # Japanese translations
```

### Usage

```typescript
// In components
import { t } from '@/i18n';
<Text>{t('home.welcome')}</Text>

// With context hook
const { t } = useTranslation();
<Text>{t('profile.settings')}</Text>
```

### Language Switching

```typescript
const { changeLanguage } = useAppData();
await changeLanguage('ar');  // Switch to Arabic
```

## 📊 Data Flow

### Unidirectional Data Flow

```
User Action
    ↓
Dispatch Action
    ↓
Redux Reducer
    ↓
State Update
    ↓
UI Re-render
```

### Example Flow: Toggle Product Completion

```typescript
// 1. User taps checkbox
<TouchableOpacity onPress={onToggleComplete}>

// 2. Component dispatches action
const dispatch = useAppDispatch();
const handleToggle = () => {
  dispatch(toggleProductCompletion(product.id));
};

// 3. Reducer updates state
toggleProductCompletion: (state, action) => {
  const step = state.routineSteps.find(s => s.id === action.payload);
  if (step) {
    step.product.isCompleted = !step.product.isCompleted;
  }
}

// 4. UI automatically updates via selector
const routineSteps = useAppSelector(state => state.home.routineSteps);
```

## 🔐 Type Safety

### TypeScript Integration

Full TypeScript support throughout the app:

```typescript
// Redux types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Component props
interface ProductCardProps {
  product: RoutineProduct;
  onPress: () => void;
}
```

## 🚀 Performance Optimizations

### 1. Memoization
```typescript
const MemoizedComponent = React.memo(ProductCard);
const expensiveValue = useMemo(() => computeValue(), [deps]);
const handlePress = useCallback(() => {}, [deps]);
```

### 2. Lazy Loading
```typescript
const LazyComponent = React.lazy(() => import('./Component'));
```

### 3. Image Optimization
```typescript
import { Image } from 'expo-image';  // Faster than RN Image

<Image
  source={require('./image.png')}
  contentFit="cover"
  transition={200}
/>
```

### 4. List Virtualization
```typescript
<FlatList
  data={items}
  renderItem={renderItem}
  windowSize={10}
  maxToRenderPerBatch={5}
  removeClippedSubviews={true}
/>
```

## 🧪 Error Handling

### Error Boundaries
```typescript
// Screens for error states
- api-error.tsx       // API failures
- no-internet.tsx     // Network errors
- no-branch.tsx       // Location errors
```

### Network Error Handling
```typescript
const { isConnected } = useNetworkStatus();

if (!isConnected) {
  router.push('/no-internet');
}
```

## 📱 Platform-Specific Code

### Conditional Rendering
```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.select({
      ios: 20,
      android: 10,
      default: 15,
    }),
  },
});
```

### Platform Files
```
hooks/
├── use-color-scheme.ts      # iOS/Android
└── use-color-scheme.web.ts  # Web-specific
```

## 🔄 Navigation Flow

### Main User Flows

1. **Onboarding → Home**
   ```
   Splash Screen → Onboarding → Phone Verification → OTP → Home
   ```

2. **Product Discovery**
   ```
   Home → Routine → Product Card → Product Details
   ```

3. **Quiz Flow**
   ```
   Home → Quiz Start → Questions → Complete → Results
   ```

4. **Checkout Flow**
   ```
   Product → Payment → Delivery Form → Checkout Summary → Success
   ```

## 📦 State Persistence

### AsyncStorage Keys
```typescript
- @routine_app:language          // User language preference
- @routine_app:onboarding        // Onboarding status
- @routine_app:user_token        // Auth token
```

### Persistence Strategy
- Language settings persist across sessions
- Onboarding status persists permanently
- Auth tokens stored securely
- Cache invalidation on logout

## 🎯 Best Practices

### 1. Component Design
- Keep components small and focused
- Use TypeScript for type safety
- Implement proper prop types
- Extract reusable logic into hooks

### 2. State Management
- Use Redux for shared state
- Use Context for configuration
- Keep local state minimal
- Avoid prop drilling

### 3. Performance
- Memoize expensive computations
- Use FlatList for long lists
- Optimize images
- Lazy load non-critical components

### 4. Code Organization
- Group by feature, not type
- Keep related files together
- Use index files for exports
- Maintain consistent naming

### 5. Styling
- Use scaling utilities
- Follow design system
- Platform-specific styles when needed
- Consistent spacing/padding

## 🔮 Future Architecture Considerations

### Potential Enhancements

1. **API Integration**
   - Add API service layer
   - Implement React Query/RTK Query for data fetching
   - Cache management strategy

2. **Authentication**
   - JWT token management
   - Refresh token flow
   - Secure storage implementation

3. **Offline Support**
   - Offline-first architecture
   - Local database (SQLite/Realm)
   - Sync strategy

4. **Analytics**
   - Event tracking system
   - User behavior analytics
   - Performance monitoring

5. **Testing**
   - Unit tests (Jest)
   - Integration tests
   - E2E tests (Detox/Maestro)

## 📚 Key Dependencies

### Core
- **Expo SDK 54**: Framework
- **React Native 0.81**: Mobile framework
- **Expo Router 6**: Navigation

### State Management
- **Redux Toolkit 2.11**: Global state
- **React Redux 9.2**: React bindings

### Storage & Network
- **AsyncStorage 2.2**: Local storage
- **NetInfo 11.5**: Network status

### UI & Animations
- **React Native Reanimated 4.1**: Animations
- **Expo Image 3.0**: Optimized images
- **React Native SVG 15.12**: SVG support

### Localization
- **i18n-js 4.5**: Internationalization
- **Expo Localization 17.0**: Device locale

## 🤝 Contributing

When adding new features, follow these guidelines:

1. Create feature-specific slices for new state
2. Use typed Redux hooks
3. Add translations for all UI text
4. Implement responsive scaling
5. Add proper TypeScript types
6. Follow existing component patterns
7. Document complex logic
8. Test on both iOS and Android

---

**Last Updated**: February 2026
**Version**: 1.0.0
