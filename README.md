# next-navigation-progress

[![npm version](https://img.shields.io/npm/v/next-navigation-progress.svg)](https://www.npmjs.com/package/next-navigation-progress)
[![npm downloads](https://img.shields.io/npm/dm/next-navigation-progress.svg)](https://www.npmjs.com/package/next-navigation-progress)
[![Coverage Status](https://img.shields.io/codecov/c/github/thu-san/next-navigation-progress)](https://codecov.io/gh/thu-san/next-navigation-progress)
[![Build Status](https://img.shields.io/github/actions/workflow/status/thu-san/next-navigation-progress/test.yml?branch=main)](https://github.com/thu-san/next-navigation-progress/actions)
[![License](https://img.shields.io/npm/l/next-navigation-progress.svg)](https://github.com/thu-san/next-navigation-progress/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A lightweight, customizable navigation progress bar for Next.js applications with React 19 support. Shows a smooth progress indicator during route transitions.

## Features

- 🚀 React 19 support with `useOptimistic` and `startTransition`
- 🎨 Fully customizable appearance
- 📦 Lightweight with zero dependencies
- 🔧 TypeScript support
- ⚡ Smooth animations with easing functions
- 🎯 Easy integration with Next.js App Router

## Installation

```bash
npm install next-navigation-progress
# or
yarn add next-navigation-progress
# or
pnpm add next-navigation-progress
```

## Quick Start

### 1. Wrap your app with the provider

In your root layout or `_app.tsx`:

```tsx
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
import { NavigationLink } from 'next-navigation-progress';

export default function MyComponent() {
  return <NavigationLink href="/about">Go to About</NavigationLink>;
}
```

#### Option B: Using the hook manually

For more control, use the `useNavigationProgress` hook with `startTransition`:

```tsx
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

Check out the [example](./example) directory for a complete Next.js application demonstrating the usage.

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

1. Write tests for new features
2. Ensure all tests pass
3. Maintain or improve code coverage

## License

MIT
