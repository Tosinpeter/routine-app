# Changelog

All notable changes to the **Gloord** app are documented in this file. Entries follow a weekly delivery format aligned with sprint milestones. Each section documents what was delivered that week, what was tested, and what carries over to the next sprint. The format is based on [Keep a Changelog](https://keepachangelog.com).

> **Cumulative totals** — 27 commits across 8 sprints, 916 tracked files in the current tree, 1 235 unique file paths touched since project inception.

---

## [Unreleased]

_Work in progress after 2026-03-09. Next planned delivery: Week 9 (Sprint 9), targeting 2026-03-16._

### Pending Items

- End-to-end integration tests for refactored feature modules
- CI pipeline validation for app-bundle builds
- Backend API contract alignment with restructured client layer

---

## Week 8 — 2026-03-09 (Sprint 8)

**Theme:** Codebase restructure and test infrastructure

### Delivered

- Major codebase refactor to feature-based architecture (`src/features/*`, `src/shared/*`)
- Removed unused files and redundant screen components to reduce maintenance surface
- Deleted `app.json` in favour of `app.config.ts` for dynamic configuration
- EAS build type changed from APK to app-bundle for Android
- Added testing scripts and updated dependencies in `package.json`
- TypeScript configuration updated with new path aliases and stricter excludes
- 6 new test suites added: profile model, API client, auth slice, order slice, date helpers, phone utils

### Tested

- Build with updated EAS configuration (app-bundle)
- TypeScript compilation with new path mappings
- New unit tests: `profile.test.ts`, `client.test.ts`, `auth-slice.test.ts`, `order-slice.test.ts`, `date-helpers.test.ts`, `phone.test.ts`
- Feature module imports after directory restructure

### Carried Over

- Full integration test pass on refactored modules
- CI validation of app-bundle builds

### Statistics

- **Commits this sprint:** 1
- **Files changed this sprint:** 696
- **Cumulative unique files touched:** 1 235
- **Current tracked files:** 916

---

## Week 7 — 2026-03-03 (Sprint 7)

**Theme:** Configuration and backend integration

### Delivered

- App configuration updates for runtime and build
- Backend integration enhancements (API client and environment handling)

### Tested

- App launch and config loading on target devices
- Backend connectivity and error paths

### Carried Over

- Codebase restructure and test infrastructure (delivered in Week 8)

### Statistics

- **Commits this sprint:** 1
- **Files changed this sprint:** 53
- **Cumulative unique files touched:** 519

---

## Week 6 — 2026-02-25 (Sprint 6)

**Theme:** Code quality, error handling, and CI tooling

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

- **Commits this sprint:** 3
- **Files changed this sprint:** 124
- **Cumulative unique files touched:** 545

---

## Week 5 — 2026-02-19–22 (Sprint 5)

**Theme:** OTP, branding, treatment plan, and payment flow

### Delivered

- OTP verification screen updated with improved input handling and error states
- App branding updated to Gloord (icon, splash screen, adaptive icons)
- Photo preparation flow streamlined with better camera guidance and preview
- Treatment plan screen enhanced (comparison slider, protocol details, trust badges)
- Payment flow enhancements (checkout, delivery form, card entry, coupons, order creation, tracking)

### Tested

- OTP entry, paste, backspace, and country code picker across screen sizes
- Photo prep and camera capture flow
- Treatment plan comparison slider and "What's Inside" accordion
- Checkout and order creation end-to-end

### Carried Over

- Code quality and error handling (delivered in Week 6)
- Notification and config refinements (delivered in Week 6)

### Statistics

- **Commits this sprint:** 5
- **Files changed this sprint:** 214
- **Cumulative unique files touched:** 524

---

## Week 4 — 2026-02-17 (Sprint 4)

**Theme:** Internationalization and workflow cleanup

### Delivered

- Internationalization (i18n) with English, French, Arabic, and Japanese
- ESLint workflow configuration simplified
- ARCHITECTURE.md removed (content no longer maintained)

### Tested

- Language switching and translated strings in main flows
- ESLint workflow on push/PR

### Carried Over

- OTP and branding refinements (delivered in Week 5)
- Treatment plan and payment flow work (delivered in Week 5)

### Statistics

- **Commits this sprint:** 4
- **Files changed this sprint:** 1
- **Cumulative unique files touched:** 457

---

## Week 3 — 2026-02-08–12 (Sprint 3)

**Theme:** Core feature build-out — screens, state, backend, and data layer

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

- i18n integration (delivered in Week 4)
- OTP and branding refinements (delivered in Week 5)

### Statistics

- **Commits this sprint:** 7
- **Files changed this sprint:** 377
- **Cumulative unique files touched:** 458

---

## Week 2 — 2026-02-06 (Sprint 2)

**Theme:** Home and Progress tabs with UI foundations

### Delivered

- Home tab with treatment plan card, skin routine card, progress steps, and dermatology insights
- Progress tab with before/after comparison cards, routine consistency tracking, and improvement metrics
- UI components, icons, and assets for Home and Progress

### Tested

- Home and Progress tab navigation and layout
- Component rendering and basic interactions

### Carried Over

- OTP and verification flows (delivered in Week 3)
- Broader feature set — screens, backend, state (delivered in Week 3)

### Statistics

- **Commits this sprint:** 1
- **Files changed this sprint:** 53
- **Cumulative unique files touched:** 142

---

## Week 1 — 2026-01-28–29 (Sprint 1)

**Theme:** Project bootstrap and app shell

### Delivered

- Initial project commit and app configuration
- UI component base and app shell
- ESLint workflow for JavaScript (GitHub Actions, SARIF upload)
- Expo Router with typed routes for type-safe navigation

### Tested

- App boot and basic navigation
- ESLint workflow on push/PR

### Carried Over

- Home and Progress tabs with full UI (delivered in Week 2)

### Statistics

- **Commits this sprint:** 5
- **Files changed this sprint:** 99
- **Cumulative unique files touched:** 99

---

## v1.0.0 — 2026-02-11

Release anchor covering Sprints 1–3 (2026-01-28 through 2026-02-12). The full feature inventory for this version is distributed across the Week 1, Week 2, and Week 3 entries above. Key milestones in this release:

- Project scaffolding with Expo Router, React Compiler, and New Architecture
- Complete screen set: onboarding, auth, home, treatment plan, routine, progress, face scan, payment, orders, lab tests, profile, notifications
- Redux state management across all feature domains
- Backend API with SQLite persistence and seed data
- ESLint CI pipeline via GitHub Actions
