# Changelog

All notable changes to the **Gloord** app will be documented in this file.

---

## Version 1.0 — February 2026

### Added

- Phone number authentication with OTP verification and country code picker
- Onboarding flow with personalized skin quiz (single and multi-select questions)
- Home dashboard with treatment plan card, skin routine card, progress steps, and dermatology insights
- AI-powered face scan with photo preparation guide, camera capture, and scan result analysis
- Face scan history screen to review past analyses
- Treatment plan screen with comparison slider, protocol details, and "What's Inside" accordion
- Product details screen with expandable sections, info cards, and progress ring
- Skincare tab with curated product recommendations
- Routine tab for daily skincare routine management with step cards and time toggles
- Progress tab with before/after comparison cards, routine consistency tracking, and improvement metrics
- Top improvements breakdown screen
- Full payment flow: checkout summary, delivery form, card entry, coupon application, order creation, tracking, and success/error screens
- Order management with order history, order details, and real-time order tracking with map integration
- Lab test module: booking, prescription upload, prescription download, lab location selection with map, and completion screen
- Profile section with profile details, gender selection, saved addresses, order history, permissions, and language preferences
- Notification system with notification sheet and push notification support via expo-notifications
- Legal pages: privacy policy, terms of use, cookie policy, and FAQ
- Contact support button with WhatsApp deep linking
- Upload prescription card for lab report submission
- Network connectivity monitoring with offline fallback screen
- API error display with retry functionality
- Redux state management with slices for auth, home, payment, orders, notifications, profile, progress, and photo prep
- Backend API server with routes for auth, home, profile, orders, cards, coupons, notifications, progress, and file uploads
- SQLite database with schema and seed data
- Internationalization (i18n) support with English, French, Arabic, and Japanese translations
- Custom icon system with 50+ SVG icons for UI consistency
- Haptic feedback on tab interactions
- Edge-to-edge display support on Android
- React Compiler and New Architecture enabled for improved performance
- ESLint CI workflow with GitHub Actions
- Expo Router with typed routes for type-safe navigation

### Improved

- App branding updated to Gloord with new icon, splash screen, and adaptive icons
- OTP verification screen refined with enhanced input handling and error states
- Photo preparation flow streamlined with better camera guidance and preview
- Treatment plan UI enhanced with comparison slider and trust badges
- Error handling strengthened across API client with structured error responses
- ESLint workflow migrated to Bun for faster dependency management and linting
- Navigation bar and status bar configured for seamless edge-to-edge experience
- Performance tooling added with bundle visualizer, source map explorer, and React DevTools support

### Fixed

- Network status wrapper correctly detects connectivity changes and shows appropriate fallback
- Order tracking map renders properly on both native and web platforms
- OTP input field handles paste and backspace events reliably
- API client gracefully handles timeout and network errors with user-friendly messages
- Country code picker displays correctly across different screen sizes
