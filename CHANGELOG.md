# Changelog

All notable changes to the **Gloord** app are documented in this file. Entries follow a weekly delivery format: each section describes what was delivered that week, what was tested, and what carried over to the next sprint. The format is based on [Keep a Changelog](https://keepachangelog.com).

---

## [Unreleased]

_Work in progress after 2026-03-03. No release date set._

---

## Week 7 — 2026-03-03 (Sprint 7)

### Delivered

- App configuration updates for runtime and build
- Backend integration enhancements (API client and environment handling)

### Tested

- App launch and config loading on target devices
- Backend connectivity and error paths

### Carried Over

- None (current head of development)

### Statistics

- **Commits:** 1
- **Files changed:** 53 (cumulative from project start: 519)

---

## Week 6 — 2026-02-25 (Sprint 6)

### Delivered

- Code quality improvements across the codebase
- Stronger error handling and user-facing error messages
- Notification handling and app configuration refinements
- ESLint workflow migrated to Bun for dependency management and linting

### Tested

- Error display and retry flows for API and network failures
- Notification sheet and push notification behaviour
- ESLint CI run with Bun

### Carried Over

- App configuration and backend integration (delivered in Week 7)

### Statistics

- **Commits:** 3
- **Files changed:** 124 (cumulative: 545)

---

## Week 5 — 2026-02-19–22 (Sprint 5)

### Delivered

- OTP verification screen updated with improved input handling and error states
- App branding updated to Gloord (icon, splash screen, adaptive icons)
- Photo preparation flow streamlined with better camera guidance and preview
- Treatment plan screen enhanced (comparison slider, protocol details, trust badges)
- Payment flow enhancements (checkout, delivery form, card entry, coupons, order creation, tracking)

### Tested

- OTP entry, paste, backspace, and country code picker across screen sizes
- Photo prep and camera capture flow
- Treatment plan comparison slider and “What’s Inside” accordion
- Checkout and order creation end-to-end

### Carried Over

- Code quality and error handling (Week 6)
- Notification and config refinements (Week 6)

### Statistics

- **Commits:** 5
- **Files changed:** 214 (cumulative: 524)

---

## Week 4 — 2026-02-17 (Sprint 4)

### Delivered

- Internationalization (i18n) with English, French, Arabic, and Japanese
- ESLint workflow configuration simplified
- ARCHITECTURE.md removed (content no longer maintained)

### Tested

- Language switching and translated strings in main flows
- ESLint workflow on push/PR

### Carried Over

- OTP and branding refinements (Week 5)
- Treatment plan and payment flow work (Week 5)

### Statistics

- **Commits:** 4
- **Files changed:** 1 (cumulative: 457)

---

## Week 3 — 2026-02-08–12 (Sprint 3)

### Delivered

- Phone number authentication with OTP verification and country code picker
- New screens and enhancements to OTP and phone verification flows
- App configuration and notification handling improvements
- Comprehensive app features and UI: onboarding, home dashboard, treatment plan card, skin routine card, progress steps, dermatology insights, face scan (photo prep, camera, analysis), face scan history, product details, skincare tab, routine tab, progress tab, top improvements, payment flow, order management, lab test module, profile, notifications, legal pages, contact support, prescription upload, network monitoring, API error display
- Redux state management (auth, home, payment, orders, notifications, profile, progress, photo prep)
- Backend API routes (auth, home, profile, orders, cards, coupons, notifications, progress, file uploads)
- SQLite database schema and seed data
- Custom icon system (50+ SVG icons)
- Haptic feedback, edge-to-edge display, React Compiler and New Architecture
- Docs directory removed

### Tested

- Auth and OTP flow
- Main navigation and tab switching
- Key screens: home, treatment plan, routine, progress, payment, orders, profile

### Carried Over

- i18n integration (Week 4)
- OTP and branding refinements (Week 5)

### Statistics

- **Commits:** 7
- **Files changed:** 377 (cumulative: 458)

---

## Week 2 — 2026-02-06 (Sprint 2)

### Delivered

- Home tab with treatment plan card, skin routine card, progress steps, and dermatology insights
- Progress tab with before/after comparison cards, routine consistency tracking, and improvement metrics
- UI components, icons, and assets for Home and Progress

### Tested

- Home and Progress tab navigation and layout
- Component rendering and basic interactions

### Carried Over

- OTP and verification flows (Week 3)
- Broader feature set (screens, backend, state) (Week 3)

### Statistics

- **Commits:** 1
- **Files changed:** 53 (cumulative: 142)

---

## Week 1 — 2026-01-28–29 (Sprint 1)

### Delivered

- Initial project commit and app configuration
- UI component base and app shell
- ESLint workflow for JavaScript (GitHub Actions, SARIF upload)
- Expo Router with typed routes for type-safe navigation

### Tested

- App boot and basic navigation
- ESLint workflow on push/PR

### Carried Over

- Home and Progress tabs with full UI (Week 2)

### Statistics

- **Commits:** 5
- **Files changed:** 99 (cumulative: 99)

---

## v1.0.0 — 2026-02-11

Summary release anchor. For a full feature list through the above weekly deliveries, see the **Added**, **Improved**, and **Fixed** items that were previously documented under “Version 1.0 — February 2026”; those have been distributed into the weekly sections above. Version 1.0 represents the state of the app through Sprints 1–3 (through 2026-02-12).
