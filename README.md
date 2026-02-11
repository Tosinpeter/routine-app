# Routine App

A comprehensive skincare routine management app built with Expo and React Native. This app helps users manage their skincare journey, track progress, receive personalized recommendations, and connect with dermatologists.

## 🚀 Features

- **Personalized Skincare Routines**: Customized skincare plans based on user needs
- **Progress Tracking**: Monitor your skin health journey with visual progress indicators
- **Product Management**: Detailed product information and usage instructions
- **Lab Test Integration**: Upload and manage lab test prescriptions
- **Quiz System**: Interactive quiz to assess skincare needs
- **Multi-language Support**: Available in English, Arabic, French, and Japanese
- **Offline Support**: Network status detection and offline handling
- **Payment Integration**: Secure checkout and delivery management

## 📱 Screens

### Main Tab Navigation

The app uses a bottom tab navigation with 5 main screens:

1. **Home** (`app/(tabs)/index.tsx`)
   - Main dashboard with personalized content
   - Locked/Unlocked views based on user progress
   - Progress steps card
   - Upload prescription card
   - Skin routine card
   - Dermatology insights
   - Product reminders
   - Progress preview

2. **Routine** (`app/(tabs)/routine.tsx`)
   - Daily skincare routine display
   - Product cards with progress tracking
   - Step-by-step routine guidance
   - Product linking to details screen

3. **Skincare** (`app/(tabs)/skincare.tsx`)
   - Skincare product catalog
   - Product recommendations
   - Category browsing

4. **Progress** (`app/(tabs)/progress.tsx`)
   - Visual progress tracking
   - Before/after comparisons
   - Progress analytics and insights

5. **Profile** (`app/(tabs)/profile.tsx`)
   - User profile overview
   - Quick access to profile settings

### Authentication Screens

6. **Phone Verification** (`app/auth/phone-verification.tsx`)
   - Phone number input and verification
   - Country code selection

7. **OTP Verification** (`app/auth/otp-verification.tsx`)
   - One-time password verification
   - Resend OTP functionality

### Onboarding

8. **Onboarding** (`app/onboarding/index.tsx`)
   - Welcome screens for new users
   - App introduction and features
   - Skip and get started options

### Profile Screens

9. **Profile Details** (`app/profile/profile-details.tsx`)
   - Edit user profile information
   - Personal details management

10. **Saved Address** (`app/profile/saved-address/index.tsx`)
    - List of saved delivery addresses
    - Address management

11. **Add Address** (`app/profile/saved-address/add-address.tsx`)
    - Add new delivery address
    - Address form with validation

12. **Order History** (`app/profile/order-history.tsx`)
    - Past orders list
    - Order details and tracking

13. **Skin Progress** (`app/profile/skin-progress.tsx`)
    - Detailed skin progress tracking
    - Historical progress data

14. **History** (`app/profile/history.tsx`)
    - User activity history
    - Treatment history

15. **Doctor Review** (`app/profile/doctor-review.tsx`)
    - Doctor consultations and reviews
    - Review submission

16. **Treatment Starts** (`app/profile/treatment-starts.tsx`)
    - Treatment timeline
    - Treatment start dates

17. **Emergency Support** (`app/profile/emergency-support.tsx`)
    - Emergency contact information
    - Quick support access

18. **FAQ** (`app/profile/faq.tsx`)
    - Frequently asked questions
    - Help and support

19. **Language** (`app/profile/language.tsx`)
    - Language selection
    - App localization settings

20. **Permissions** (`app/profile/permissions.tsx`)
    - App permissions management
    - Permission settings

21. **Privacy Policy** (`app/profile/privacy-policy.tsx`)
    - Privacy policy document
    - Data protection information

22. **Support** (`app/profile/support.tsx`)
    - Customer support
    - Contact information

23. **Terms of Use** (`app/profile/terms-of-use.tsx`)
    - Terms and conditions
    - Legal information

### Quiz Screens

24. **Quiz Index** (`app/quiz/index.tsx`)
    - Quiz introduction
    - Quiz start screen

25. **Quiz Questions** (`app/quiz/questions.tsx`)
    - Interactive quiz questions
    - Answer selection

26. **Quiz Complete** (`app/quiz/complete.tsx`)
    - Quiz completion screen
    - Results summary

### Lab Test Screens

27. **Lab Test Index** (`app/lab-test/index.tsx`)
    - Lab test overview
    - Test management

28. **Prescription Upload** (`app/lab-test/prescription-upload.tsx`)
    - Upload lab test prescriptions
    - Document picker integration

29. **Prescription Download** (`app/lab-test/precription-download.tsx`)
    - Download prescription documents
    - Document preview

### Product & Payment Screens

30. **Product Details** (`app/product-details.tsx`)
    - Detailed product information
    - Product specifications
    - Usage instructions
    - Doctor notes and warnings

31. **Payment/Checkout** (`app/payment/index.tsx`)
    - Checkout screen
    - Payment options

32. **Checkout Summary** (`app/payment/checkout-summary.tsx`)
    - Order summary
    - Payment confirmation

33. **Delivery Form** (`app/payment/delivery-form.tsx`)
    - Delivery information form
    - Address selection

### Utility Screens

34. **Select Lab Test** (`app/select-lab-test.tsx`)
    - Lab test selection
    - Test type selection

35. **Upload** (`app/upload.tsx`)
    - File upload interface
    - Document upload

36. **Notification** (`app/notification.tsx`)
    - Notification center
    - Notification list

37. **Notification Sheet** (`app/notification-sheet.tsx`)
    - Bottom sheet notification
    - Quick notification view

38. **Face Scan History** (`app/face-scan-history.tsx`)
    - Face scan records
    - Scan history timeline

39. **Top Improvements** (`app/top-improvements.tsx`)
    - Improvement recommendations
    - Top suggestions display

### Error & Status Screens

40. **API Error** (`app/api-error.tsx`)
    - API error handling
    - Error display and retry

41. **No Branch** (`app/no-branch.tsx`)
    - Branch availability error
    - Location error handling

42. **No Internet** (`app/no-internet.tsx`)
    - Offline state display
    - Network connectivity check

### Example/Demo Screens

43. **Network Demo** (`app/examples/network-demo.tsx`)
    - Network status demo
    - Testing utilities

## 🛠️ Tech Stack

- **Framework**: Expo ~54.0.32
- **React Native**: 0.81.5
- **Navigation**: Expo Router ~6.0.22
- **State Management**: Redux Toolkit (@reduxjs/toolkit)
- **UI Components**: Custom components with React Native
- **Internationalization**: i18n-js (English, Arabic, French, Japanese)
- **Storage**: AsyncStorage
- **Maps**: React Native Maps
- **Animations**: React Native Reanimated

## 📦 Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

Or use platform-specific commands:

```bash
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

## 🏗️ Project Structure

```
routine-app/
├── app/                    # Screen components (file-based routing)
│   ├── (tabs)/            # Tab navigation screens
│   ├── auth/              # Authentication screens
│   ├── profile/           # Profile-related screens
│   ├── quiz/              # Quiz screens
│   ├── lab-test/          # Lab test screens
│   ├── payment/           # Payment screens
│   └── onboarding/        # Onboarding screens
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── store/                 # Redux store and slices
├── constants/             # App constants and themes
├── utils/                 # Utility functions
├── i18n/                  # Internationalization files
└── assets/                # Images, fonts, and static assets
```

## 🌐 Internationalization

The app supports multiple languages:
- English (en)
- Arabic (ar)
- French (fr)
- Japanese (ja)

Language files are located in `i18n/locales/`.

## 🎨 Design System

The app uses a custom design system with:
- Custom fonts (Aeonik, SF Pro Display)
- Consistent color palette
- Responsive scaling utilities
- Theme support (light/dark mode)

## 📝 Key Features Implementation

### Product Linking
Products on the Routine page link to detailed product information screens, showing specifications, usage instructions, and doctor recommendations.

### Network Status
Real-time network monitoring with automatic offline state handling and user-friendly error screens.

### Progress Tracking
Visual progress indicators and analytics to track skincare journey improvements.

## 🔧 Development

### Reset Project

To get a fresh project structure:

```bash
npm run reset-project
```

### Linting

```bash
npm run lint
```

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or support, please contact the development team.
