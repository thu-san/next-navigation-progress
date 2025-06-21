# next-navigation-progress

[![npm version](https://img.shields.io/npm/v/next-navigation-progress.svg)](https://www.npmjs.com/package/next-navigation-progress)
[![npm downloads](https://img.shields.io/npm/dm/next-navigation-progress.svg)](https://www.npmjs.com/package/next-navigation-progress)
[![Coverage Status](https://img.shields.io/codecov/c/github/thu-san/next-navigation-progress)](https://codecov.io/gh/thu-san/next-navigation-progress)
[![Build Status](https://img.shields.io/github/actions/workflow/status/thu-san/next-navigation-progress/test.yml?branch=main)](https://github.com/thu-san/next-navigation-progress/actions)
[![GitHub Release](https://img.shields.io/github/v/release/thu-san/next-navigation-progress)](https://github.com/thu-san/next-navigation-progress/releases)
[![License](https://img.shields.io/npm/l/next-navigation-progress.svg)](https://github.com/thu-san/next-navigation-progress/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A lightweight, customizable navigation progress bar for Next.js applications with React 19 support. Shows a smooth progress indicator during route transitions using React's latest features like `useOptimistic` and `startTransition`.

## Demo

🚀 **[View Live Demo](https://thu-san.github.io/next-navigation-progress/)**

Experience the smooth navigation progress bar in action with our interactive demo showcasing various navigation patterns and customization options.

## Features

- 🚀 React 19 support with `useOptimistic` and `startTransition`
- 🎨 Fully customizable appearance
- 📦 Lightweight with zero dependencies (~2KB gzipped)
- 🔧 TypeScript support with full type definitions
- ⚡ Smooth animations with customizable easing functions
- 🎯 Easy integration with Next.js App Router
- 🔄 Automatic progress management during route transitions
- 💡 Requires `'use client'` directive (uses React Context)

## Installation

```bash
npm install next-navigation-progress
# or
yarn add next-navigation-progress
# or
pnpm add next-navigation-progress
```

## Quick Start

> **Important**: This library uses React Context and hooks, so you must add the `'use client'` directive to any file that imports from `next-navigation-progress`.

### 1. Wrap your app with the provider

In your root layout or `_app.tsx`:

```tsx
'use client'; // Required! This library uses React Context

import { NextNavigationProgressProvider } from 'next-navigation-progress';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextNavigationProgressProvider>
          {children}
        </NextNavigationProgressProvider>
      </body>
    </html>
  );
}
```

### 2. Add the progress bar component

Add the progress bar component inside the provider:

```tsx
'use client'; // Required! This library uses React Context

import {
  NextNavigationProgressProvider,
  NextNavigationProgressBar,
  NavigationLink,
} from 'next-navigation-progress';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextNavigationProgressProvider>
          <NextNavigationProgressBar />
          {children}
        </NextNavigationProgressProvider>
      </body>
    </html>
  );
}
```

### 3. Trigger progress on navigation

You have two options for triggering the progress bar:

#### Option A: Using NavigationLink (Recommended)

The easiest way is to use the built-in `NavigationLink` component:

```tsx
'use client'; // Required! This library uses React Context

import { NavigationLink } from 'next-navigation-progress';

export default function MyComponent() {
  return <NavigationLink href="/about">Go to About</NavigationLink>;
}
```

#### Option B: Using the hook manually

For more control, use the `useNavigationProgress` hook with `startTransition`:

```tsx
'use client'; // Required! This library uses React Context

import { useNavigationProgress } from 'next-navigation-progress';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

export default function MyComponent() {
  const router = useRouter();
  const { startNewProgress } = useNavigationProgress();

  const handleNavigation = (href: string) => {
    startTransition(() => {
      startNewProgress();
      router.push(href);
    });
  };

  return (
    <button onClick={() => handleNavigation('/about')}>Go to About</button>
  );
}
```

## TypeScript Examples

### Basic Usage with TypeScript

```tsx
'use client'; // Required! This library uses React Context

import type { FC, ReactNode } from 'react';
import {
  NextNavigationProgressProvider,
  NextNavigationProgressBar,
  NavigationLink,
} from 'next-navigation-progress';

interface LayoutProps {
  children: ReactNode;
}

const RootLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <NextNavigationProgressProvider>
          <NextNavigationProgressBar />
          <nav>
            <NavigationLink href="/" className="nav-link">
              Home
            </NavigationLink>
            <NavigationLink href="/about" className="nav-link">
              About
            </NavigationLink>
          </nav>
          {children}
        </NextNavigationProgressProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

### Custom Hook with Type Safety

```tsx
'use client'; // Required! This library uses React Context

import { useNavigationProgress } from 'next-navigation-progress';
import { startTransition } from 'react';
import type { MouseEventHandler } from 'react';

function useCustomNavigation() {
  const { progress, startNewProgress, optimisticObj, stateObj } =
    useNavigationProgress();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    startTransition(() => {
      startNewProgress();
      // Your navigation logic here
    });
  };

  return {
    progress,
    isLoading: optimisticObj.loading,
    isShowing: stateObj.showing,
    handleClick,
  };
}
```

## API Reference

### Components

#### `NextNavigationProgressProvider`

The context provider that manages the progress state.

```tsx
<NextNavigationProgressProvider>{children}</NextNavigationProgressProvider>
```

#### `NextNavigationProgressBar`

The progress bar component that displays the navigation progress.

```tsx
<NextNavigationProgressBar />
```

Currently, the progress bar uses default styling with a blue color (#228be6) and 3px height. Custom styling can be achieved by creating your own progress component using the `useNavigationProgress` hook.

#### `NavigationLink`

A pre-configured Link component that automatically triggers the progress bar:

```tsx
<NavigationLink href="/about" className="link-class" prefetch={false}>
  About Page
</NavigationLink>
```

**Props:**

| Prop        | Type                  | Default | Description               |
| ----------- | --------------------- | ------- | ------------------------- |
| `href`      | `string`              | -       | The destination URL       |
| `children`  | `React.ReactNode`     | -       | Link content              |
| `className` | `string`              | -       | CSS class name            |
| `style`     | `React.CSSProperties` | -       | Inline styles             |
| `target`    | `string`              | -       | Link target attribute     |
| `prefetch`  | `boolean`             | -       | Next.js prefetch behavior |
| `onClick`   | `function`            | -       | Click handler             |

### Hooks

#### `useNavigationProgress()`

Returns the progress context with the following:

```tsx
const {
  progress, // Current progress value (0-100)
  startNewProgress, // Function to start new progress
  optimisticObj, // { loading: boolean }
  stateObj, // { showing: boolean }
} = useNavigationProgress();
```

## Advanced Usage

### Custom Progress Component

You can create your own progress component using the `useNavigationProgress` hook:

```tsx
'use client'; // Required! This library uses React Context

import { useNavigationProgress } from 'next-navigation-progress';

function CustomProgressBar() {
  const { progress, stateObj } = useNavigationProgress();

  if (!stateObj.showing) return null;

  return (
    <div className="custom-progress">
      <div className="custom-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}
```

## Examples

Check out the [example](./example) directory for a complete Next.js application demonstrating various usage patterns and customizations.

To run the example:

```bash
cd example
npm install
npm run dev
```

## Troubleshooting

### Common Issues

#### Error: "useContext must be used within a Provider"

- **Solution**: Add `'use client'` directive at the top of your file. This library uses React Context which only works in client components.

```tsx
'use client'; // Add this line!

import { NextNavigationProgressProvider } from 'next-navigation-progress';
```

#### Progress bar not showing

- Ensure you've wrapped your app with `NextNavigationProgressProvider`
- Check that the file containing the provider has `'use client'` directive
- Verify you're using `NavigationLink` or calling `startNewProgress()` within `startTransition`
- Ensure you're using React 19 and Next.js 15 or later

#### TypeScript errors with React 19

- Make sure your `@types/react` and `@types/react-dom` are version 19+
- Update your `tsconfig.json` to include `"jsx": "react-jsx"`

#### Progress bar completes too quickly

- This is expected behavior for fast navigation. The progress animates to 90% gradually, then jumps to 100% when navigation completes

#### Custom styling not working

- The default progress bar uses inline styles. Create a custom component with `useNavigationProgress` hook for full styling control

## Browser Support

This library requires browsers that support React 19 features:

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

## Comparison with Similar Libraries

| Feature            | next-navigation-progress | nextjs-toploader | nprogress |
| ------------------ | ------------------------ | ---------------- | --------- |
| React 19 Support   | ✅                       | ❌               | ❌        |
| Zero Dependencies  | ✅                       | ❌               | ❌        |
| TypeScript         | ✅                       | ✅               | ❌        |
| Bundle Size        | ~2KB                     | ~4KB             | ~7KB      |
| Custom Animations  | ✅                       | ✅               | ✅        |
| Next.js App Router | ✅                       | ✅               | ⚠️        |

## Testing

This package includes a comprehensive test suite using Vitest:

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test

# Run tests once (for CI)
npm run test:run

# Generate coverage report
npm run test:coverage

# View interactive test UI
npm run test:ui
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Make sure to:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for new features
4. Ensure all tests pass
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

For more details, see [CONTRIBUTING.md](./CONTRIBUTING.md).

### Releasing

To release a new version:

```bash
npm run release        # Interactive release process
npm run release:patch  # Release a patch version (bug fixes)
npm run release:minor  # Release a minor version (new features)
npm run release:major  # Release a major version (breaking changes)
```

See [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) for the complete release process.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a history of changes to this library.

## License

MIT - see [LICENSE](./LICENSE) for details.
