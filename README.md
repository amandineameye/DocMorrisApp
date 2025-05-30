# DocMorris Dual-Brand Pharmacy App Architecture

## 🧭 Overview

This document outlines the architectural and technical decisions for building a cross-platform mobile app for two licensed online pharmacy brands under **DocMorris N.V.**, targeting both Android and iOS platforms. The architecture emphasizes scalability, maintainability, team collaboration, and compliance with healthcare data regulations in Germany.

## 🔍 Assumptions

1. Functional parity between both brands with distinct branding.
2. Teams consist of 5 mobile development squads and 1 backend team.
3. Secure and performant support for e-prescriptions (QR, NFC).
4. Monorepo development for streamlined collaboration.
5. Security and data protection are paramount due to the sensitive nature of health data.

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

### Deployment Tooling

- **CodePush** — OTA updates for JS bundles
- **Fastlane** — Build automation for App Store & Play Store
- **Bitrise** — CI/CD orchestrator integrated with GitHub

### Automation

- **GitHub Actions** — CI tasks: linting, unit tests, build checks
- **Bitrise** — Runs E2E tests, builds, and deploys apps to testers

### Monitoring & Feature Flags

- **Sentry** — JS runtime error tracking
- **Firebase Crashlytics** — Native crash reporting
- **Datadog** — App performance observability
- **Firebase Analytics** — Behavior & funnel tracking
- **LaunchDarkly / Firebase Remote Config** — Feature flags, A/B testing, remote config

## 🏗️ Architecture

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
  data-access/
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

### The Monorepo

#### Why We Use a Monorepo

- A monorepo allows all teams to collaborate in a single codebase with consistent tooling and shared components.
- It promotes code reuse, avoids duplication, and simplifies cross-team communication and integration.
- All features, apps, and libraries live in the same repository, reducing versioning conflicts and siloed development.

#### Why We Chose Turborepo

- **Simplicity and Flexibility:** Turborepo offers a lightweight, flexible approach that aligns well with JavaScript/TypeScript projects, especially those using React or React Native.
- **Zero-config build pipelines:** You can define tasks (build, lint, test) per package using existing package.json scripts, and Turbo handles caching, parallel execution, and dependency ordering automatically.
- **Remote Caching:** With Vercel’s remote caching, teams can share build artifacts across environments, drastically reducing CI/CD times.
- **Tooling Agnostic:** Unlike Nx, Turborepo doesn’t impose opinionated plugins or CLI wrappers. You can use native tools like Metro, Jest, ESLint, and TypeScript directly.
- **Ideal for custom React Native setups:** For teams using custom configurations or non-standard workflows, Turborepo avoids the complexity and learning curve that Nx sometimes introduces.

#### What Are Workspaces

- Turborepo relies on native workspace protocols from npm, yarn, or pnpm.
- Each package (like features/prescriptions, ui/, or apps/docmorris) is listed as a workspace in the root-level package.json
- Turborepo uses a turbo.json file to orchestrate tasks and manage caching across these workspaces.

Each workspace (app or package) should have its own **package.json** to define:

- Its name, dependencies, and scripts.
- This lets Turborepo treat it as a modular unit with independent lifecycle hooks.

**`package.json`**

```json
{
  "name": "docmorris",
  "version": "1.0.0",
  "scripts": {
    "start": "react-native start",
    "android": "react-native run-android",
    "ios": "react-native run-ios"
  }
}
```

For applications (apps/docmorris, apps/brandb), we also include an **app.json** file to:

- Define internal app name for build tools.
- Support CodePush, deep linking, and branded build scripts.

These files are required to enable:

- Smooth workspace dependency resolution
- Clear build artifact definitions
- Isolated development and deployment of apps and features

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
  "workspaces": ["apps/*", "packages/*", "libs/*"],
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

3. Configure workspaces in root package.json:

```ts
"workspaces": ["apps/*", "packages/*/*", "packages/*", "libs/*"]
```

4. Add Your Apps and Packages

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

5. Run Your Tasks

Use Turborepo to execute scripts across packages:

```
npm run dev
npm run build
npm run lint
```

Only affected packages will run, with task caching and parallel execution.

### Feature Scaffolding

Each feature in the packages/features/ directory is structured to encapsulate all logic, UI, and domain responsibilities for that vertical. This modular layout ensures team autonomy, reusability, and testability.

- Ensures every feature is independently testable and deployable.
- Promotes domain ownership — each team maintains their feature’s folder.
- Allows features to be loaded modularly and support lazy loading if needed.

```
packages/features/<feature-name>/
  src/
    components/     # Shared presentational components
    screens/        # Entry-point screens used in navigation
    hooks/          # Feature-specific logic hooks
    services/       # Data fetchers, handlers, and domain logic
  __tests__/        # Unit & integration tests
  index.ts          # Public API entry
  package.json      # Defines the feature as a workspace
```

## 🎨 Styling Strategy

We use **styled-components** in this React Native monorepo to ensure a scalable, brand-themable, and maintainable styling system.

### Why styled-components?

- **Scoped styles, clean JSX**
  Styles are defined alongside component logic, but without cluttering the render code. This preserves both readability and separation of concerns.
- **Dynamic theming via ThemeProvider**
  Inject a full theme object contextually (e.g., per brand) and access it in all styled components with full type support.
- **Flexible styling for all components**
  Supports styling any native or custom component — no need to adopt wrapper-specific primitives.
- **Dynamic styling via props and logic**
  Write expressive, condition-based styles using regular JavaScript and component props.
- **Seamless TypeScript support**
  - IntelliSense for component props and theme values
  - Autocompletion for tokens and styles
  - Type-checked style definitions with helpful IDE feedback

### Why not NativeWind?

- Clutters JSX with long Tailwind class strings
- Violates separation of concerns by embedding style logic in markup
- Poor visibility and readability when classes are conditional or deeply nested
- Difficult to implement dynamic theming or runtime brand switching
- Tailwind classes are untyped string literals — no type safety, no autocomplete, no validation
- Error-prone and harder to maintain in large codebases

### Why not Restyle?

- Theming is only supported through Restyle's limited component set (<Box>, <Text>, etc.)
- Lacks flexibility to style native or third-party components without extra wrappers
- Less ergonomic in real-world component trees that mix custom and external components
- No support for conditionally styled props in a clean, intuitive way
- TypeScript support is functional but less expressive and harder to extend for dynamic styles

We prioritize **component-level styling, rich theming, code clarity, and TypeScript support.**
**styled-components** provides the most balanced and future-proof solution for these requirements in a multi-brand React Native app.

## ♻️ Component Reusability Strategy

To support a scalable, multi-brand architecture, the app leverages a shared `@repo/ui` package that contains all core UI components. These components are brand-agnostic and derive their visual styling from theme tokens injected at runtime from the `@repo/theme` package.

### Design Principles

All components in `@repo/ui` are:

- **Stateless** and driven by props and theme values.
- **Compatible with `styled-components/native`**, enabling runtime theming.
- **Generic and composable**, such as `Button`, `Card`, `Modal`, or `TextField`.
- Built following **accessibility** and **performance** best practices.

This setup ensures:

- A **single source of truth** for UI elements.
- **No duplication** across brand implementations.
- **Consistent design language** and faster iteration.

### Brand Customization via `@repo/theme`

All brand-specific tokens (e.g. colors, fonts, spacing) are declared in the `@repo/theme` package, which also exposes the `BrandProvider` and `useBrand` hook for brand context access.

Each app provides its own `brandConfig`, extending a shared base with runtime assets like logos, ads, and product images.

```tsx
// apps/docmorris/App.tsx
import { BrandProvider } from '@repo/theme/context'
import { brandConfig } from './brandConfig'

export default function App() {
  return (
    <BrandProvider config={brandConfig}>
      <TabsNavigator />
    </BrandProvider>
  )
}
```

- `BrandProvider` injects the current brand's `theme` using `ThemeProvider`.
- All `@repo/ui` components consume `theme` values directly—no need for brand-specific logic.

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

Each brand exports its own variant (`docMorrisTheme`, `brandBTheme`) from `@repo/theme/themes`.

### Example: Themed Component from `@repo/ui`

```tsx
const StyledButton = styled.TouchableOpacity\`
  background-color: \${({ theme }) => theme.colors.primary.primary1};
  padding: 12px;
  border-radius: 6px;
\`;
```

- No brand logic in `@repo/ui`.
- Theme values are injected from the app through `BrandProvider`.

### Summary

| Layer         | Responsibility                                        |
| ------------- | ----------------------------------------------------- |
| `@repo/theme` | Brand configs, theme tokens, context, `ThemeProvider` |
| `@repo/ui`    | Generic, theme-aware components                       |
| App           | Selects brand config and injects it at runtime        |

This modular layering ensures that the UI is fully reusable while supporting unique branding per app instance. Let me know if you'd like to document best practices for adding new tokens or brands!

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

export async function readEGK() {
  await NfcManager.start()
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef)
    const tag = await NfcManager.getTag()
    return tag
  } finally {
    NfcManager.cancelTechnologyRequest()
  }
}
```

**Sample QR Code Scanner**

```ts
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CameraKitCameraScreen } from 'react-native-camera-kit';

export const QRScanner = () => {
  const [scannedCode, setScannedCode] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      {scannedCode ? (
        <Text style={styles.resultText}>Scanned QR: {scannedCode}</Text>
      ) : (
        <CameraKitCameraScreen
          showFrame={true}
          scanBarcode={true}
          laserColor="blue"
          frameColor="green"
          onReadCode={(event) => {
            setScannedCode(event.nativeEvent.codeStringValue);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  resultText: { fontSize: 18, padding: 16 },
});
```

### Backend Data Flow

When a QR or NFC-based e-prescription is redeemed, the following is transmitted securely to the backend:

- Prescription token (Task ID) and access code (if any)
- Medication information (drug name, dosage, quantity)
- Patient and prescriber identifiers (pseudonymized or hashed)
- Timestamp and submission source (QR vs NFC)
- Verification status (e.g. signature validity)

Only what's needed is stored:

- Task ID, metadata, and fulfillment status
- Audit logs for legal compliance
- Sensitive payloads are encrypted, never stored in plain text

Security best practices include TLS transport, encrypted storage, user authentication, and GDPR-compliant handling.

## 💾 Local Storage Strategy

Local storage is split into two clear categories based on data sensitivity:

### Non-sensitive Data

Used to cache user preferences, UI states, session flags, and temporary metadata.

#### Tool: `react-native-mmkv`

- Extremely fast and efficient
- Encryption supported, but optional for this layer
- Used to persist non-critical app state between launches

#### Examples:

| Data Type         | Use Case                          |
| ----------------- | --------------------------------- |
| Onboarding status | Whether user completed onboarding |
| Active brand ID   | Selected brand ('brandA', etc.)   |
| Theme preference  | Light/Dark mode                   |

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

- Business logic is placed in services/, hooks in hooks/, and each has its respective test files inside **tests**/ folders or colocated near the file.
- We aim for high coverage on medication logic, prescription workflows, and conditional UI states.

### E2E Testing

- We use Detox for end-to-end flows — prescription redemption, QR scanning, authentication, and checkout.
- Tests run on both iOS and Android simulators/emulators as part of our CI pipeline (Bitrise).
  E2E coverage ensures the full customer journey is reproducible, including platform-specific permissions like camera access and NFC handshakes.

## 🚀 Deployment Strategy

### Internal Testing Channels

To support pre-release validation and iterative QA:

- Firebase App Distribution (Android): Quick delivery to internal testers.
- TestFlight (iOS): Seamless testing experience for Apple testers.
- Play Store Internal Track: For staging Android releases before public rollout.

### CI-Triggered Build Pipelines

- Merges to develop or release/\* trigger Bitrise workflows.
- Workflows automatically:
  - Run tests
  - Build artifacts
  - Upload to Firebase/TestFlight
- Testers receive links with install instructions.

### CodePush Deployment Script

For JavaScript-only updates that don’t require app store approval.

```ts
import { execSync } from 'child_process';

const apps = [
  { name: 'docmorris', platform: 'ios', deployment: 'Staging' },
  { name: 'docmorris', platform: 'android', deployment: 'Staging' },
  { name: 'brandb', platform: 'ios', deployment: 'Staging' },
  { name: 'brandb', platform: 'android', deployment: 'Staging' },
];

apps.forEach(app => {
  const cmd = \`appcenter codepush release-react -a your-org/\${app.name}-\${app.platform}     -d \${app.deployment} --mandatory --description "Release update for \${app.name}"\`;
  console.log(\`Deploying \${app.name}\`);
  execSync(cmd, { stdio: 'inherit' });
});
```

## ⚙️ Automation Pipeline

Our pipeline is designed for fast feedback, automated testing, and zero-touch deployments. It bridges the gap between development and delivery, ensuring each change is validated, tested, and delivered without unnecessary manual steps.

### How It Works

Below is a high-level diagram describing the automation flow:

```
[ Git Push / PR ]
      ↓
[ GitHub Actions CI ]
  ├── Lint
  ├── Unit Tests (Jest)
  └── Build Check
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

This flow supports rapid development by ensuring:

- **All commits are verified** with linting, tests, and type checks.
- **Builds are automatically delivered** to internal testers with proper branding and configuration.
- **Feedback is streamlined** via distribution platforms (Firebase, TestFlight).

### CI: GitHub Actions

This is the first line of validation for any code pushed or merged:

- Ensures code style via linting
- Runs Jest tests to validate local logic
- Builds the app to catch any compile or configuration errors early

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm run lint

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm run build
```

### CD: Bitrise

Once CI passes, Bitrise picks up to handle:

- Dependency installation
- Detox tests on emulators/simulators
- Full native builds via Fastlane
- Uploads artifacts to QA channels for immediate feedback

```bash
Git clone → Install dependencies → Run E2E tests (Detox) → Build → Deploy
```

This division of labor ensures both speed and safety across teams and platforms.

## 📡 Monitoring, Tracking & Feature Flagging

Observability and runtime control are critical in a healthcare-grade mobile app. We implement a robust monitoring and experimentation stack that helps us catch bugs early, understand user behavior, and safely roll out features.

### Monitoring

Monitoring tools ensure reliability by alerting developers to errors, performance regressions, or crashes:

- **Sentry**: Captures unhandled JavaScript exceptions, network errors, and stack traces with user and environment metadata.
- **Firebase Crashlytics**: Aggregates and reports native mobile crashes. Integrated with Android/iOS for OS-level insights.
- **Datadog**: Tracks app performance metrics (startup time, memory usage, API latency) and helps trace root causes across systems.
  Each tool feeds into our incident response workflows to enable proactive triaging.

### Analytics & Tracking

Understanding user flows helps us improve both UX and compliance outcomes:

- **Firebase Analytics**: Records screen transitions, key business events (e.g., prescription redeemed), and conversion funnels.
- **Custom tagging**: All analytics events are annotated with brand ID, platform, and user journey context.
  We use these insights to drive product improvements and to validate feature adoption across brands.

### Feature Flags

To ship confidently in a dual-brand environment, we use feature flags to gate new capabilities:

- **LaunchDarkly** or **Firebase Remote Config**: Enable toggling features on/off remotely without app updates.
- Supports A/B testing, gradual rollout by brand or user segment, and instant rollback.

This gives both developers and product managers flexible control over deployments, experiments, and phased launches.

## 🧼 Maintainability Principles

This architecture emphasizes maintainability through several deliberate choices:

- **Modular Folder Structure:** The monorepo is divided by feature and domain (e.g., features/, ui/, theme/), which allows teams to work in parallel and isolate changes.
- **Type Safety:** TypeScript is used throughout the codebase to catch errors early and provide developer guidance via IDEs.
- **Shared Component Libraries:** Common UI patterns are abstracted into packages/ui, avoiding duplication and simplifying updates across brands.
- **Centralized Configuration:** Linting, formatting, testing, and build settings are centralized in .config/, ensuring consistent tooling across teams.
- **Theming and Branding:** Styles and behavior are cleanly separated from UI logic through dynamic theming, reducing friction in maintaining multiple brand identities.
- **Robust Testing Stack:** A combination of unit, integration, and E2E testing ensures confidence during refactoring and scaling.
- **Automation:** CI/CD pipelines, CodePush scripts, and automated testing prevent regressions and streamline deployment.

These practices together form a strong foundation for long-term maintainability and scalability.

## ✅ Conclusion

This architecture enables secure, scalable, and maintainable mobile development for dual-brand pharmacy apps under DocMorris. With its robust monorepo, native integrations, and DevOps setup, it supports agile iteration and regulatory compliance.
