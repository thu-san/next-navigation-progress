# next-navigation-progress Example

This example demonstrates how to use the `next-navigation-progress` library in a Next.js application.

## Features Demonstrated

- Basic setup with `NextNavigationProgressProvider`
- Using `NavigationLink` component for automatic progress triggering
- Custom navigation with `useNavigationProgress` hook
- Integration with UI libraries (Mantine)
- Different navigation patterns (client-side navigation, programmatic navigation)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
example/
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout with progress bar setup
│       ├── page.tsx        # Home page with navigation examples
│       ├── detail/
│       │   └── page.tsx    # Detail page example
│       └── profile/
│           └── page.tsx    # Profile page example
├── package.json
└── README.md
```

## Key Implementation Details

### 1. Root Layout Setup

The progress bar is initialized in `src/app/layout.tsx`:

```tsx
'use client'; // Required! This library uses React Context

<NextNavigationProgressProvider>
  <NextNavigationProgressBar />
  {children}
</NextNavigationProgressProvider>
```

**Important**: The `'use client'` directive is required because this library uses React Context, which only works in client components.

### 2. Navigation Examples

The home page (`src/app/page.tsx`) shows different navigation patterns:

- **NavigationLink Component**: Automatic progress triggering
- **Programmatic Navigation**: Using the hook with custom buttons
- **External Links**: How to handle external navigation

### 3. Styling Integration

The example shows how to integrate with Mantine UI library while maintaining the progress bar functionality.

## Customization Examples

### Custom Progress Bar Color

To customize the progress bar appearance, create your own progress component:

```tsx
'use client'; // Required! This library uses React Context

import { useNavigationProgress } from 'next-navigation-progress';

function CustomProgressBar() {
  const { progress, stateObj } = useNavigationProgress();

  if (!stateObj.showing) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        backgroundColor: '#e0e0e0',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: '#ff6b6b',
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );
}
```

### Different Animation Speeds

You can control the animation behavior by wrapping the navigation with different timing:

```tsx
const handleSlowNavigation = (href: string) => {
  startTransition(() => {
    startNewProgress();
    // Add artificial delay for demonstration
    setTimeout(() => {
      router.push(href);
    }, 2000);
  });
};
```

## Common Patterns

### 1. Conditional Navigation

```tsx
const handleConditionalNav = (href: string) => {
  if (someCondition) {
    startTransition(() => {
      startNewProgress();
      router.push(href);
    });
  }
};
```

### 2. Navigation with Data Fetching

```tsx
const handleNavWithData = async (href: string) => {
  startTransition(() => {
    startNewProgress();
    // Progress will show while data is being fetched
    router.push(href);
  });
};
```

### 3. Form Submission with Navigation

```tsx
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  
  try {
    await submitForm(data);
    startTransition(() => {
      startNewProgress();
      router.push('/success');
    });
  } catch (error) {
    // Handle error
  }
};
```

## Troubleshooting

### Progress bar not appearing

1. Check that `NextNavigationProgressProvider` wraps your entire app
2. **Ensure your layout file has `'use client'` directive at the top**
3. Verify you're using `NavigationLink` or calling `startNewProgress()` within `startTransition()`
4. Check React 19 and Next.js 15+ are installed

### TypeScript errors

Make sure your TypeScript configuration matches the example:
- `@types/react` and `@types/react-dom` version 19+
- `"jsx": "react-jsx"` in tsconfig.json

## Learn More

- [next-navigation-progress Documentation](https://github.com/thu-san/next-navigation-progress)
- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Features](https://react.dev/blog/2024/04/25/react-19)