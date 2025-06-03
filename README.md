# DocMorris Dual-Brand Pharmacy App Architecture

## 🧭 Overview

This document outlines the architectural and technical decisions for building a cross-platform mobile app for two licensed online pharmacy brands under **DocMorris N.V.**, targeting both Android and iOS platforms. The architecture emphasizes scalability, maintainability, team collaboration, and compliance with healthcare data regulations in Germany.

Key project characteristics include:

- Functional parity across both brands, with distinct theming and branding per app.
- A team structure of 5 mobile development squads and 1 backend team, collaborating in parallel.
- Secure and performant support for e-prescription workflows, including QR code scanning and NFC health card integration.

## 🔍 Assumptions

1. The architecture must support dynamic theming and shared code across multiple brands.
2. All tooling should be flexible, unopinionated, and easy to adopt across teams.
3. Versioning and release cycles are unified across brands and features — per-package versioning is not required.
4. The monorepo is scoped to mobile development; the backend team provides APIs separately and maintains them outside this codebase.

## 🧱 Technology Stack

### Programming Language

- **TypeScript** — Strong typing, better IDE support, fewer runtime bugs

### Styling

- **styled-components** - Scoped styles & dynamic theming. Enhanced with `babel-plugin-styled-components` for cleaner debugging and optimized builds

### State Management

- **Zustand** — lightweight, boilerplate-free local state
- **React Query** — handles server state, caching, background updates

### Navigation

- **React Navigation** — Native-stack, bottom-tabs, deep linking
- **react-native-screens** — Improves memory usage and transition performance

### API Communication

- **Axios** — HTTP client with interceptors and cancellation
- **React Query** — API caching, background sync, retry logic

### Local Storage

- **react-native-mmkv** — Fast, encrypted key-value store
- **react-native-encrypted-storage** — OS-backed secure store for credentials & tokens

### Monorepo Tooling

- **Turborepo** — Smart caching, incremental and parallel task execution, streamlined code sharing, zero-config monorepo orchestration

### Native Layer Libraries

- **react-native-nfc-manager** — NFC for e-prescriptions
- **react-native-camera-kit** — QR code scanning
- **react-native-mmkv** — High-performance storage
- **react-native-encrypted-storage** — Secure native vault

### Testing

- **Jest** — Unit & logic tests
- **React Native Testing Library** — Component testing
- **Detox** — E2E testing on real devices/simulators

### Deployment and Automation Tooling

- **GitHub Actions** — CI tasks: linting, unit tests, build checks
- **Bitrise** — Runs E2E tests, builds, and deploys apps to testers
- **Fastlane** — Build automation for App Store & Play Store
- **CodePush** — OTA updates for JS bundles

### Internal Testing

- **Firebase App Distribution (Android):** Send test builds quickly to the team. Great for early testing and fast feedback.
- **TestFlight (IOS):** Apple’s official testing tool.
- **Play Store Internal Track (Android):** Used to test the app through the real Play Store. Works like a real release, allowing to catch store-related issues before launch.

### Monitoring & Feature Flags

- **Sentry** — JS runtime error tracking
- **Firebase Crashlytics** — Native crash reporting
- **Datadog** — App performance observability
- **Firebase Analytics** — Behavior & funnel tracking
- **LaunchDarkly / Firebase Remote Config** — Feature flags, A/B testing, remote config

## 🏗️ Architecture

### The Monorepo

#### Why We Use a Monorepo

- A monorepo allows all teams to collaborate in a single codebase with consistent tooling and shared components.
- It promotes code reuse, avoids duplication, and simplifies cross-team communication and integration.
- All features, apps, and libraries live in the same repository, reducing versioning conflicts and siloed development.

#### Why We Chose Turborepo

- **Simplicity and Flexibility:** Turborepo offers a lightweight, flexible approach that aligns well with JavaScript/TypeScript projects, especially those using React or React Native.
- **Independent app builds with automatic dependency ordering:** Each app defines its own build, lint, and test tasks via package.json scripts. Turborepo enables running them independently, while ensuring shared packages (like ui or features) are built first based on dependencies.
- **Tooling Agnostic:** Turborepo doesn’t impose opinionated plugins or wrappers, making it ideal for teams with custom Metro, Jest, or TypeScript setups. You can use your tools directly, without the extra complexity Nx sometimes adds.

#### What Are Workspaces

- Workspaces are the building blocks of a monorepo. Each one can be treated like its own package and used in other workspaces — just like installing a dependency from npm.
- Turborepo relies on native workspace protocols from npm, yarn, or pnpm.
- Each package (like features/prescriptions, ui/, or apps/docmorris) is listed as a workspace in the root-level package.json

Each workspace (app or package) should have its own **package.json** to define:

- Its name, dependencies, exports, and scripts.
- This allows Turborepo to run, build, and test each app on its own.

**`package.json`**

```json
{
  "name": "docmorris",
  "version": "1.0.0",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "start": "react-native start",
    "android": "react-native run-android",
    "ios": "react-native run-ios"
  }
}
```

Each app (e.g. apps/docmorris, apps/brandb) includes an app.json to define the app name, branding, and settings for CodePush, deep linking, and build tools. This also helps with workspace resolution and isolated builds.

### Setting Up a Turborepo Monorepo

1. Scaffold Your Monorepo

You can quickly generate a new Turborepo setup using the official starter template:

```ts
npx create-turbo@latest
```

2. Update your root-level package.json to include all workspace paths:

```json
{
  "name": "my-turbo-workspace",
  "private": true,
  "workspaces": ["apps/*", "packages/*/*", "libs/*"],
  "devDependencies": {
    "turbo": "^1.10.0"
  },
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint"
  }
}
```

3. Add Your Apps and Packages

- Create individual folders under apps/, packages/, and libs/:
- Each should have a package.json with its name and dependencies.
- Example structure:

```
apps/
  ├── docmorris/
  └── brandb/
packages/
  ├── ui/
  └── features/
libs/
  └── utils/
```

4. Run Your Tasks

Use Turborepo to execute scripts across packages:

```
npm run dev
npm run build
npm run lint
```

Only affected packages will run.

### Feature Scaffolding

Each folder in packages/features/ is a self-contained feature module. It includes the feature's own UI, screens, logic, and tests — making it easy for teams to develop independently.

However, shared logic like reusable hooks or API clients lives in dedicated packages like packages/hooks/ and packages/api/, outside the features/ folder. This keeps features clean and avoids code duplication.

Benefits:

- Features are modular, testable, and owned by specific teams
- Encourages clear separation between feature-specific and shared logic

```
packages/features/<feature-name>/
  src/
    components/     # Reusable UI pieces (only for this feature)
    screens/        # Entry-point screens for navigation
    hooks/          # Feature-specific logic hooks
    services/       # Feature-local data fetching or domain logic
  __tests__/        # Unit and integration tests
  index.ts          # Public API entry
  package.json      # Declares the feature as its own workspace
```

### Repository Structure

```bash
apps/
  docmorris/
  brandb/
  shared-e2e/

packages/
  ui/
  features/
    discovery/
    prescription-redemption/
    checkout/
    user-account/
    prescription-services/
  services/
  navigation/
  theme/
  config/
  stores/

libs/
  utils/
  constants/

.config/
  jest/
  detox/
  eslint/
```

## ♻️ Scalable Brand Theming

To support true multi-brand scalability, the `@repo/theme` package centralizes all brand-specific tokens and runtime assets — enabling each app to seamlessly apply its own branding **without duplicating UI code**.

### What’s in `@repo/theme`?

- **Specific brand theme objects**: Colors, fonts, spacing — typed and structured for consistency.
- **BrandProvider**: A wrapper that applies brand-specific config to the app.
- **useBrand hook**: Provides access to brand-specific theme and runtime assets (e.g. logos, product images, ad banners).

### How it works

Each app (e.g. DocMorris, BrandB) defines its own `brandConfig`, which includes:

- A theme object (e.g. `docMorrisTheme`) with color/font tokens
- Runtime brand assets (e.g. logos, images, banners)

This `brandConfig` is passed into `BrandProvider` at the root of the app:

```tsx
// apps/docmorris/App.tsx
import { BrandProvider } from '@repo/theme'
import { brandConfig } from './brandConfig'

export default function App() {
  return (
    <BrandProvider config={brandConfig}>
      <TabsNavigator />
    </BrandProvider>
  )
}
```

### What does `BrandProvider` actually do?

Internally, `BrandProvider` wraps your app with two powerful layers:

1. **React Context (`BrandContext`)**  
   Exposes brand-specific runtime data via the `useBrand()` hook.

2. **Styled-Components’ `ThemeProvider`**  
   Injects the active brand’s theme tokens — making them available to every `@repo/ui` component via `styled-components`.

That means all your UI components automatically reflect the selected brand’s look & feel — without having to write any brand logic in them.

### Why this matters

| Benefit                   | What it means                                                                           |
| ------------------------- | --------------------------------------------------------------------------------------- |
| Fully reusable UI         | Components like `Button`, `Card`, `SearchBar` don’t know or care what brand they’re in. |
| Centralized theming       | All visual styles come from a single source: the theme tokens in `@repo/theme`.         |
| Easy brand switching      | Just swap out `brandConfig` — the entire app updates its look.                          |
| Testable and maintainable | You can test components in isolation, independent of branding.                          |

### Theme Structure (from `@repo/theme`)

Themes are strongly typed and organized around tokens:

```ts
interface Theme {
  colors: {
    primary: { primary1: string; background: string; /* ... */ };
    secondary: { secondary1: string; /* ... */ };
    complementary: { success1: string; /* ... */ };
    interferer: { interferer1: string };
  };
  fonts: {
    body: { 1: { regular: {...} } };
    button: { medium: {...} };
    // ...
  };
}
```

Each brand exports its own variant (`docMorrisTheme`, `brandBTheme`) from `@repo/theme`.

### Example: Themed Component from `@repo/ui`

```tsx
const StyledButton = styled.TouchableOpacity`
  background-color: \${({ theme }) => theme.colors.primary.primary1};
  padding: 12px;
  border-radius: 6px;
`
```

- No brand logic in `@repo/ui`.
- Theme values are injected from the app through `BrandProvider`.

### Summary

| Layer         | Responsibility                                        |
| ------------- | ----------------------------------------------------- |
| `@repo/theme` | Brand configs, theme tokens, context, `ThemeProvider` |
| `@repo/ui`    | Generic, theme-aware components                       |
| App           | Selects brand config and injects it at runtime        |

This modular layering ensures that the UI is fully reusable while supporting unique branding per app instance.

## 🎨 Styling Strategy

We use **styled-components** in this React Native monorepo to ensure a scalable, brand-themable, and maintainable styling system.

### Why styled-components?

- **Scoped styles, clean JSX:** Styles are defined alongside component logic, but without cluttering the render code. This preserves both readability and separation of concerns.
- **Dynamic theming via ThemeProvider:** Inject a full theme object contextually (e.g., per brand) and access it in all styled components with full type support.
- **Flexible styling for all components:** Supports styling any native or custom component — no need to adopt wrapper-specific primitives.
- **Dynamic styling via props and logic:** Write expressive, condition-based styles using regular JavaScript and component props.
- **Seamless TypeScript support:** Get autocomplete for props and theme tokens like colors.primary, plus instant type checking and IDE feedback.

### Why not NativeWind?

- Clutters JSX with long Tailwind class strings
- Violates separation of concerns by embedding style logic in markup
- Poor visibility and readability when classes are conditional or deeply nested
- Difficult to implement dynamic theming or runtime brand switching
- Tailwind classes are untyped string literals — no type safety, no autocomplete, no validation
- Error-prone and harder to maintain in large codebases

### Why not Restyle?

- You can only use Restyle’s theming with its own components like `<Box>` or `<Text>`.
- Native or third-party components (like from libraries) need extra wrappers to use the same styles.
- When you mix your own components with native and library ones, styling becomes inconsistent and harder to manage.
- It's not straightforward to apply styles based on props or state in a clean way.
- Autocomplete and type checking work, but are limited.

We prioritize **component-level styling, rich theming, code clarity, and TypeScript support.**
**styled-components** provides the most balanced and future-proof solution for these requirements in a multi-brand React Native app.

## 📲 Native Integrations

### Role of Native Layer

The native layer plays a critical role in enabling hardware-dependent functionality, ensuring performance, and meeting regulatory demands for a secure pharmacy experience. This includes:

- NFC support for reading electronic health cards (eGK), which is a requirement under the German healthcare system.
- QR code scanning using the device camera for reading e-prescription barcodes.
- Secure data storage using native encryption APIs or high-performance libraries like MMKV.
- Integration hooks for system-level services such as:
  - Deep linking (to support navigation via external URLs or notifications)
  - Push notifications (for order updates and reminders)
  - Access to the Secure Enclave / Keychain (for sensitive health data)

These features are made available via native modules (e.g. react-native-nfc-manager, react-native-camera-kit, react-native-encrypted-storage) and are tightly integrated into the mobile workflows while respecting platform-specific requirements.

### E-Prescriptions (eGK, QR)

**Sample NFC Reader**

```ts
import NfcManager, { NfcTech } from 'react-native-nfc-manager'

// This function starts an NFC session and reads data from an NFC tag (e.g. an eGK health card)

export async function readEGK() {
  // Step 1: Initialize the NFC manager to make sure the NFC hardware is ready

  await NfcManager.start()

  try {
    // Step 2: Request access to a specific NFC technology — here we're using NDEF,
    // which is a common data format for NFC tags (used in many cards and e-documents)

    await NfcManager.requestTechnology(NfcTech.Ndef)

    // Step 3: Wait for the user to scan their card.
    // Once a compatible NFC tag is detected, get its data.

    const tag = await NfcManager.getTag()

    // Step 4: Return the tag object, which contains the card’s data.

    return tag
  } finally {
    // Step 5: Always clean up after the read attempt (success or fail)
    // This stops the NFC session and releases the hardware

    NfcManager.cancelTechnologyRequest()
  }
}
```

**Sample QR Code Scanner**

```ts
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CameraKitCameraScreen } from 'react-native-camera-kit';

// This component opens the camera and scans QR codes using the react-native-camera-kit library

export const QRScanner = () => {

  // State to store the scanned QR code result

  const [scannedCode, setScannedCode] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      {scannedCode ? (

        // If a QR code has been scanned, display the result text

        <Text style={styles.resultText}>Scanned QR: {scannedCode}</Text>
      ) : (

        // Otherwise, show the camera view for scanning

        <CameraKitCameraScreen
          showFrame={true} // Show a visual frame to help the user align the QR code
          scanBarcode={true} // Enable barcode/QR scanning
          laserColor="blue" // Color of the scanning laser
          frameColor="green" // Color of the scanning frame border
          onReadCode={(event) => {

            // When a QR code is read, extract the value and update state

            setScannedCode(event.nativeEvent.codeStringValue);
          }}
        />
      )}
    </View>
  );
};

// Basic styling for layout

const styles = StyleSheet.create({
  container: { flex: 1 }, // Full screen
  resultText: { fontSize: 18, padding: 16 }, // Style for displaying the scanned result
});

```

### Backend Data Flow

When a QR or NFC-based e-prescription is redeemed, the following is transmitted securely to the backend:

- Prescription token (Task ID) and access code (if any)
- Medication information (drug name, dosage, quantity)
- Patient and prescriber identifiers (pseudonymized or hashed)
- Timestamp and submission source (QR vs NFC)

Only what's needed is stored:

- Task ID, metadata (drug name, status, timestamps), and fulfillment status
- Audit logs for legal compliance (e.g. who scanned what, when)
- Sensitive payloads are encrypted, never stored in plain text

Security best practices include:

- **TLS transport:** All data sent from app to backend is encrypted.
- **Encrypted storage:** Sensitive payloads are encrypted, never stored in plain text.
- **User authentication:** Only logged-in users (like patients or pharmacists) can send or access the data.
- **GDPR-compliant handling:** (You anonymize or pseudonymize personal data, and don’t store unnecessary details).

## 💾 Local Storage Strategy

Local storage is split into two clear categories based on data sensitivity:

### Non-sensitive Data

Used to cache user preferences, UI states, session flags, and temporary metadata.  
Examples: Theme preference, onboarding status

#### Tool: `react-native-mmkv`

- Extremely fast and efficient
- Encryption supported, but optional for this layer
- Used to persist non-critical app state between launches

### Sensitive Data

This includes e-prescriptions, tokens, patient IDs, and any information protected under GDPR and BfArM compliance.

#### Tools:

- `react-native-mmkv` with encryption (for fast, short-term caching)
- `react-native-encrypted-storage` (for secure, long-term secrets)

#### Best Practices:

- Encrypt all prescription payloads before caching
- Purge sensitive data on logout or app uninstallation
- Use `encrypted-storage` for any credentials or medical identifiers

#### Examples:

| Data Type                 | Storage Type                     | Notes                        |
| ------------------------- | -------------------------------- | ---------------------------- |
| Session token             | `react-native-mmkv` (encrypted)  | Short-term use with refresh  |
| ePrescription Task ID     | `react-native-mmkv` (encrypted)  | Stored temporarily post-scan |
| Health card (eGK) ID      | `react-native-encrypted-storage` | Highly sensitive ID          |
| User PIN or login secrets | `react-native-encrypted-storage` | Never stored in plain format |

### Goals

- Encrypt all sensitive health-related data at rest.
- Use secure, platform-native solutions where possible.
- Comply with **GDPR**, **BfArM**, and other regulatory frameworks.
- Ensure performance for frequent reads/writes (e.g. caching tokens, user session state).

### Summary of Practices

- All prescription payloads are encrypted before being cached.
- Personally identifiable data (e.g., hashed IDs) is never stored in plaintext.
- Sensitive items are automatically purged on logout or app uninstall.
- MMKV is used for fast access patterns (e.g., caching tokens for short periods), while encrypted storage is used for secure secrets.

## 🧪 Testing Strategy

Our testing strategy reflects our focus on safety, quality, and speed across multiple teams and complex domains. It is designed to ensure:

- Critical health-related logic is validated early.
- UI and flows work reliably across brands.
- Teams can refactor with confidence.

### Unit & Component Testing

Each feature module includes unit tests for business logic and reusable UI components.

- Jest is used to run fast, isolated tests for utilities, domain logic, and hooks.
- React Native Testing Library allows us to test the actual rendered output and behavior of UI components, improving coverage for runtime interactions.

Tests follow a colocated structure:

- Business logic tests are placed in services/, hooks tests in hooks/, and each has its respective test files inside **tests**/ folders or colocated near the file.
- We aim for high coverage on medication logic, prescription workflows, and conditional UI states.

### E2E Testing

- We use Detox for end-to-end flows — prescription redemption, QR scanning, authentication, checkout etc.
- Tests run on both iOS and Android simulators/emulators as part of our CI pipeline (Bitrise).

E2E coverage ensures the full customer journey is reproducible, including platform-specific permissions like camera access and NFC handshakes.

### Why These Testing Libraries?

**Jest** → Chosen over Mocha, AVA, etc.

- Jest is the de facto standard for JavaScript/TypeScript unit testing.
- It's widely supported in React Native ecosystems and integrates smoothly with monorepos — ideal for testing isolated business logic and hooks.

**React Native Testing Library (RNTL)** → Chosen over Enzyme or shallow rendering

- RNTL encourages testing components as users interact with them, not by inspecting internal state. For example:

✅ “Does the spinner appear when I press the button?”  
❌ “Did the isLoading state become true?”

- Unlike Enzyme, which is not well-maintained for React Native, RNTL fully supports styled-components and themed rendering.

**Detox** → Chosen over Appium or manual QA

- Detox is built specifically for React Native E2E testing. It runs directly on iOS and Android emulators with synchronization features, making it faster and more stable than Appium.
- It handles native modules like NFC and camera permissions reliably — critical for testing e-prescription and hardware flows.

## ⚙️ Automation & Deployment Strategy

Our pipeline is designed for **fast feedback**, **automated testing**, and **zero-touch delivery** across brands. It supports both full native releases and instant JavaScript-only updates via **CodePush**.

### How It Works

Below is a high-level overview of the automated flow:

```
[ Git Push / PR ]
      ↓
[ GitHub Actions CI ]
  ├── Lint
  ├── Unit Tests (Jest)
  ├── Build Check
  └── (Optional) CodePush Release (JS-only)
      ↓
[ Bitrise Workflow Triggered ]
  ├── Dependency Install
  ├── E2E Tests (Detox)
  ├── Fastlane Build (iOS & Android)
  └── Deploy:
      ├── Firebase App Distribution (Android)
      ├── TestFlight (iOS)
      └── Play Store Internal Track (Android)
      ↓
[ Tester Notification + Feedback Loop ]
```

This structure allows us to:

- Run fast JS-only deployments with **CodePush**.
- Use **Bitrise** only when native builds or app store releases are needed.
- Keep app behavior consistent across testing, staging, and production.

### CI: GitHub Actions

GitHub Actions is the first gate for any pushed or merged code:

- Lints and type-checks the codebase
- Runs unit tests (Jest)
- Builds apps to ensure no compile/config errors
- **Optionally triggers CodePush** if the update is JS-only
- Triggers Bitrise if everything passes

#### Sample Workflow: `.github/workflows/ci.yml`

```yaml
name: CI Monorepo

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test-docmorris:
    name: DocMorris - Lint & Test
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: apps/docmorris
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run lint
      - run: npm run test

  test-brandb:
    name: BrandB - Lint & Test
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: apps/brandb
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run lint
      - run: npm run test

  codepush:
    name: CodePush Release
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/release/js-only'
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: node scripts/deploy-codepush.js

  trigger-bitrise:
    needs: [test-docmorris, test-brandb]
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Bitrise build
        run: |
          curl -X POST https://api.bitrise.io/v0.1/apps/YOUR_APP_SLUG/builds \
          -H "Authorization: ${{ secrets.BITRISE_TOKEN }}" \
          -H "Content-Type: application/json" \
          -d '{
            "hook_info": { "type": "bitrise" },
            "build_params": {
              "branch": "${{ github.ref_name }}",
              "workflow_id": "primary"
            }
          }'
```

### CodePush for OTA Updates

We use CodePush to deliver JavaScript-only updates without needing store approval.

- Ideal for UI fixes, logic changes, or A/B experiments.
- Script automatically pushes bundles to staging channels on App Center.

**Script:** `scripts/deploy-codepush.js`

```js
import { execSync } from 'child_process';

const apps = [
  { name: 'docmorris', platform: 'ios', deployment: 'Staging' },
  { name: 'docmorris', platform: 'android', deployment: 'Staging' },
  { name: 'brandb', platform: 'ios', deployment: 'Staging' },
  { name: 'brandb', platform: 'android', deployment: 'Staging' },
];

apps.forEach(app => {
  const cmd = \`appcenter codepush release-react -a your-org/\${app.name}-\${app.platform} \
    -d \${app.deployment} --mandatory --description "Auto CodePush update"\`;
  console.log(\`Deploying \${app.name}\`);
  execSync(cmd, { stdio: 'inherit' });
});
```

### CD: Bitrise Workflows

Bitrise takes over after CI passes to:

- Install dependencies
- Run Detox E2E tests
- Build native apps via Fastlane
- Distribute builds to QA channels

```bash
Git clone → Install deps → Run E2E tests → Build → Deploy
```

**Deployment targets:**

- **Firebase App Distribution** for Android testers
- **TestFlight** for internal iOS testing
- **Play Store Internal Track** for pre-release Android staging

### In a nutshell

| Step            | Tool                               | Purpose                                  |
| --------------- | ---------------------------------- | ---------------------------------------- |
| CI              | GitHub Actions                     | Validate code, run tests, trigger builds |
| OTA Deployment  | CodePush                           | Ship JS-only updates instantly           |
| Native Build/CD | Bitrise + Fastlane                 | Full iOS/Android builds & testing        |
| Distribution    | Firebase / TestFlight / Play Store | Real-world QA                            |

## 📡 Monitoring, Tracking & Feature Flagging

In healthcare apps, bugs or crashes can impact user trust or safety. We use special tools to track issues, monitor performance, and control what features are active in the app — even after it's released.

### Monitoring (Bug & Crash Tracking)

These tools tell us if something breaks or slows down:

- **Sentry**: Catches JavaScript errors, failed API calls, and shows what the user was doing when it happened.
- **Firebase Crashlytics**: Tracks native (iOS/Android) app crashes and gives detailed reports by device or OS.
- **Datadog**: Monitors performance (startup speed, memory use, slow APIs) and helps find root causes across backend and app.

These tools alert us fast, so we can fix issues before they affect more users.

### Analytics & Tracking (User Behavior)

We track how people use the app to improve UX and feature adoption:

- **Firebase Analytics**: Logs screen views and key actions like scanning a prescription or checking out.
- **Custom tagging**: Every event includes info like brand, platform, and where the user is in their journey.

This helps us see what works, what’s confusing, and where users drop off.

### Feature Flags (Remote Feature Control)

We don’t have to release every feature to everyone at once. Instead, we use:

- **LaunchDarkly** or **Firebase Remote Config**: To turn features on/off without needing to update the app.

Benefits:

- Test features with a small group (A/B testing)
- Roll out slowly per brand or user type
- Turn off a broken feature instantly

This gives us safe, flexible control over what's live in production.

## 🧼 Maintainability Principles

This architecture emphasizes maintainability through several deliberate choices:

- **Modular Folder Structure:** The monorepo is organized by features and shared concerns (e.g., features/, ui/, theme/), allowing teams to work in parallel, isolate responsibilities, and reduce cross-impact when making changes.
- **Type Safety:** TypeScript is used throughout the codebase to catch errors early and provide developer guidance via IDEs.
- **Shared Component Libraries:** Common UI patterns are abstracted into packages/ui, avoiding duplication and simplifying updates across brands.
- **Centralized Configuration:** Linting, formatting, testing, and build settings are centralized in .config/, ensuring consistent tooling across teams.
- **Theming and Branding:** Styles and behavior are cleanly separated from UI logic through dynamic theming, reducing friction in maintaining multiple brand identities.
- **Robust Testing Stack:** A combination of unit, integration, and E2E testing ensures confidence during refactoring and scaling.
- **Automation:** CI/CD pipelines, CodePush scripts, and automated testing prevent regressions and streamline deployment.

These practices together form a strong foundation for long-term maintainability and scalability.

## ✅ Conclusion

This architecture enables secure, scalable, and maintainable mobile development for dual-brand pharmacy apps under DocMorris. With its robust monorepo, native integrations, and DevOps setup, it supports agile iteration and regulatory compliance.
