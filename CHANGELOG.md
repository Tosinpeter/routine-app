# Changelog

All notable changes to the Routine App will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

#### API Endpoints & Backend
- **New API Routes**:
  - `app/api/home+api.ts` - Home page data and treatment plan information
  - `app/api/profile+api.ts` - User profile management with comprehensive documentation
  - `app/api/address+api.ts` - Address CRUD operations (create, read, update, delete)
  - `app/api/routine+api.ts` - Routine management and tracking
  - `app/api/notification+api.ts` - Notification handling and preferences
  
- **API Documentation**:
  - `PROFILE_API_README.md` - Comprehensive profile API documentation (565 lines)
  - `ADDRESS_API_README.md` - Complete address API specification (182 lines)
  - Enhanced error handling and response formats across all APIs

#### Custom Hooks
- `hooks/use-fetch-home.ts` - Hook for fetching home page data
- `hooks/use-fetch-progress.ts` - Hook for fetching user progress data
- `hooks/use-profile.ts` - Hook for profile data management
- `hooks/use-address.ts` - Hook for address operations (163 lines)

#### Redux Store
- `store/slices/profile-slice.ts` - Profile state management
- `store/slices/progress-slice.ts` - Progress tracking state
- Enhanced `store/slices/home-slice.ts` with:
  - Home data management
  - Treatment plan tracking
  - Loading and error states
  - User unlock status

#### UI Components
- `components/api-error-display.tsx` - Reusable error display component
- `components/loader.tsx` - Loading state component
- `components/routine-shimmer.tsx` - Shimmer effect for routine loading states

#### Features
- Performance monitoring scripts in `package.json`:
  - `perf:devtools` - React DevTools for performance analysis
  - `perf:bundle` - Bundle size visualization
  - `perf:analyze` - Source map analysis for bundle optimization
- Bun package manager support with `bun.lock`
- Enhanced tab navigation with updated layouts

### Changed

#### Core App Files
- **`app.json`**: Updated app configuration (16 changes)
- **`app/_layout.tsx`**: Enhanced root layout with new providers and initialization (37+ changes)
- **`app/(tabs)/_layout.tsx`**: Improved tab navigation layout (7 changes)

#### Tab Screens
- **`app/(tabs)/index.tsx`**: 
  - Integrated home data fetching
  - Added treatment plan card
  - Improved loading states (62+ changes)
  
- **`app/(tabs)/progress.tsx`**:
  - Connected to Redux store
  - Added progress data fetching
  - Enhanced error handling (54+ changes)
  
- **`app/(tabs)/routine.tsx`**:
  - Improved routine tracking
  - Better user experience (84+ changes)

#### Feature Screens
- **`app/notification.tsx`**: Enhanced notification handling (97 changes)
- **`app/notification-sheet.tsx`**: Improved bottom sheet functionality (77+ changes)
- **`app/lab-test/index.tsx`**: Updated lab test interface (79+ changes)
- **`app/profile/profile-details.tsx`**: 
  - Connected to profile hooks
  - Enhanced form handling
  - Better error states (119+ changes)
- **`app/profile/saved-address/add-address.tsx`**: Improved address form (44+ changes)

#### Components
- **`components/home/ProductReminderCard.tsx`**: Minor improvements (4 changes)
- **`components/home/TreatmentPlanCard.tsx`**: Enhanced treatment plan display (20 changes)
- **`components/primary-button.tsx`**: Improved button component (31 changes)

#### API Changes
- **`app/api/progress+api.ts`**: 
  - Migrated from `ExpoRequest/ExpoResponse` to standard `Request/Response`
  - Added error simulation for testing
  - Increased API delay to 1500ms for realistic testing
  - Improved error handling (64 changes)
  
- **`app/api/hello+api.ts`**: Simplified implementation (70 changes)

#### Store & State Management
- **`store/index.ts`**: Added new slices to store configuration (4 changes)
- **`store/slices/home-slice.ts`**: Added comprehensive home data management (53+ changes)

#### Utilities
- **`utils/api-client.ts`**: Major refactoring of API client implementation (478 changes)

### Removed
- **`app/api/README.md`**: Deleted old API documentation (104 lines removed)
  - Replaced with more specific API documentation files

### Improved
- **Error Handling**: Consistent error handling across all API endpoints
- **Loading States**: Added proper loading states throughout the app
- **Type Safety**: Enhanced TypeScript types for better type safety
- **Code Organization**: Better separation of concerns with custom hooks
- **API Responses**: Standardized API response formats
- **Developer Experience**: Added performance monitoring tools

### Dependencies
- Added performance analysis tools
- Updated various Expo packages
- Enhanced Redux Toolkit integration

### Technical Improvements
- **State Management**: Centralized state with Redux slices
- **Data Fetching**: Custom hooks for cleaner data fetching
- **API Architecture**: RESTful API design with proper documentation
- **Component Reusability**: Shared components for common UI patterns
- **Error Recovery**: Better error states and recovery mechanisms

## Statistics
- **Files Changed**: 22 files
- **Lines Added**: 947
- **Lines Removed**: 612
- **Net Change**: +335 lines
- **New Files**: 18
- **Deleted Files**: 1

---

## Previous Releases

### [1.0.0] - 2025-02-11
- feat: Add comprehensive app features and UI enhancements
- feat: Introduce new Home and Progress tabs with comprehensive UI components, icons, and assets
- Update app configuration and enhance UI components
- Initial commit

---

## Notes
- All API endpoints include mock data for development
- Error simulation available via query parameters for testing
- Comprehensive documentation added for all major features
