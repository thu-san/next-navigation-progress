# next-navigation-progress

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
  NextNavigationProgressBar 
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

Use the `useNavigationProgress` hook with `startTransition`:

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
    <button onClick={() => handleNavigation('/about')}>
      Go to About
    </button>
  );
}
```

## API Reference

### Components

#### `NextNavigationProgressProvider`

The context provider that manages the progress state.

```tsx
<NextNavigationProgressProvider>
  {children}
</NextNavigationProgressProvider>
```

#### `NextNavigationProgressBar`

The progress bar component with customizable props:

```tsx
<NextNavigationProgressBar
  color="#228be6"
  height={3}
  showAtBottom={false}
  // ... other props
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `#228be6` | Progress bar color |
| `height` | `number \| string` | `3` | Height of the progress bar |
| `showAtBottom` | `boolean` | `false` | Show progress bar at bottom |
| `zIndex` | `number` | `1600` | z-index of the progress bar |
| `shadow` | `string \| false` | `0 0 10px #228be6, 0 0 5px #228be6` | Box shadow of the progress bar |
| `speed` | `number` | `200` | Transition speed in ms |
| `easing` | `string` | `ease` | CSS easing function |

### Hooks

#### `useNavigationProgress()`

Returns the progress context with the following:

```tsx
const {
  progress,          // Current progress value (0-100)
  startNewProgress,  // Function to start new progress
  optimisticObj,     // { loading: boolean }
  stateObj,         // { showing: boolean }
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
      <div 
        className="custom-progress-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

### With Custom Link Component

```tsx
import Link from 'next/link';
import { useNavigationProgress } from 'next-navigation-progress';
import { startTransition } from 'react';

function ProgressLink({ href, children, ...props }) {
  const { startNewProgress } = useNavigationProgress();

  const handleClick = (e) => {
    e.preventDefault();
    startTransition(() => {
      startNewProgress();
      window.location.href = href;
    });
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
```

## Examples

Check out the [example](./example) directory for a complete Next.js application demonstrating the usage.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT