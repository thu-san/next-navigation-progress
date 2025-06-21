# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

next-navigation-progress is a lightweight React 19-based navigation progress bar library for Next.js applications. It provides visual feedback during route transitions using React 19's `useOptimistic` and `startTransition` features.

## Key Commands

### Development
- `npm run dev` - Start Rollup in watch mode for library development
- `npm run build` - Build the library for production (outputs to dist/)
- `npm test` - Run tests in watch mode with Vitest
- `npm run test:run` - Run tests once (used in CI)
- `npm run test:coverage` - Generate test coverage report
- `npm run test:ui` - Open Vitest UI for interactive testing

### Example App
- `cd example && npm run dev` - Run the example Next.js app in development mode
- `cd example && npm run build` - Build the example app
- `cd example && npm run lint` - Lint the example app

## Architecture

### Core Components

1. **Context Provider (NextNavigationProgressProvider)**
   - Manages global progress state using React Context
   - Wraps the entire application to provide progress functionality

2. **Progress Bar (NextNavigationProgressBar)**
   - Visual component that displays the progress
   - Uses inline styles for zero-dependency rendering
   - Implements smooth animations with easing functions

3. **Navigation Link (NavigationLink)**
   - Pre-configured Link component that triggers progress automatically
   - Wraps Next.js Link component with progress integration

4. **Custom Hook (useNavigationProgress)**
   - Provides access to progress state and control functions
   - Returns `progress`, `startNewProgress`, `optimisticObj`, and `stateObj`

### Key Technical Details

- **React 19 Features**: Uses `useOptimistic` for immediate UI updates and `startTransition` for non-blocking navigation
- **Easing Function**: Implements custom `easeOutQuad` function for smooth progress animation
- **Progress Algorithm**: Generates pre-calculated ease-out values that progress to 90% gradually, then jumps to 100% on completion
- **State Management**: Uses combination of `useOptimistic` for immediate feedback and `useState` for actual progress tracking

### Build System

- **Rollup Configuration**: Builds both CommonJS and ES modules with TypeScript declarations
- **Peer Dependencies**: React 19+, React DOM 19+, Next.js 15+
- **External Dependencies**: None (zero runtime dependencies)

### Testing

- **Framework**: Vitest with React Testing Library
- **Environment**: jsdom for DOM simulation
- **Coverage**: Configured to exclude example app, test files, and config files
- **Test Structure**: Component tests in `src/__tests__/components.test.tsx`, hook tests in `src/__tests__/hooks.test.tsx`

## Important Considerations

1. **React 19 Requirement**: This library specifically requires React 19 for `useOptimistic` hook
2. **Client Components Required**: All components using this library must have `'use client'` directive because it uses React Context
3. **Next.js App Router**: Designed for Next.js App Router (not Pages Router)
4. **Bundle Size**: Keep the library lightweight - currently has zero dependencies
5. **Browser Compatibility**: Modern browsers only due to React 19 requirements
6. **Performance**: Progress updates are throttled to 100ms intervals to prevent excessive re-renders

## Common User Issues

- **Missing 'use client' directive**: The most common issue is forgetting to add `'use client'` at the top of files that import from this library. Always remind users about this requirement in examples and documentation.