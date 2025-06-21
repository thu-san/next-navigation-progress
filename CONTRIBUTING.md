# Contributing to next-navigation-progress

Thank you for your interest in contributing to next-navigation-progress! We welcome contributions from the community and are grateful for any help you can provide.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you are expected to uphold this code.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/next-navigation-progress.git
   cd next-navigation-progress
   ```
3. Add the upstream repository as a remote:
   ```bash
   git remote add upstream https://github.com/thu-san/next-navigation-progress.git
   ```

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm 7+

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the library:
   ```bash
   npm run build
   ```

3. Run tests to ensure everything is working:
   ```bash
   npm test
   ```

### Development Workflow

1. Start the build in watch mode:
   ```bash
   npm run dev
   ```

2. In another terminal, navigate to the example directory:
   ```bash
   cd example
   npm install
   npm run dev
   ```

3. Make changes to the library source code in `src/`
4. The example app will automatically reflect your changes

## Making Changes

### Branch Naming

Create a feature branch from `main`:
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### Code Style

- We use TypeScript for type safety
- Follow the existing code style
- Keep the library lightweight - avoid adding dependencies
- Write clear, self-documenting code
- Add JSDoc comments for exported functions

### Commit Messages

Follow conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for code style changes
- `refactor:` for code refactoring
- `test:` for test changes
- `chore:` for maintenance tasks

Example:
```bash
git commit -m "feat: add custom easing function support"
```

## Testing

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Generate coverage report
npm run test:coverage

# Open interactive test UI
npm run test:ui
```

### Writing Tests

- Add tests for any new functionality
- Ensure existing tests pass
- Aim for high test coverage
- Test files go in `src/__tests__/`

Example test structure:
```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

describe('YourComponent', () => {
  it('should render correctly', () => {
    // Your test code
  });
});
```

## Submitting a Pull Request

1. Update your fork with the latest upstream changes:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. Rebase your feature branch:
   ```bash
   git checkout feature/your-feature-name
   git rebase main
   ```

3. Run tests and ensure they pass:
   ```bash
   npm run test:run
   ```

4. Push your changes:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request on GitHub:
   - Use a clear, descriptive title
   - Reference any related issues
   - Describe what changes you made and why
   - Include screenshots for UI changes

### PR Requirements

- All tests must pass
- Code coverage should not decrease
- No linting errors
- Update documentation if needed
- Add tests for new features

## Reporting Issues

### Before Creating an Issue

- Check existing issues to avoid duplicates
- Try to reproduce the issue in the latest version
- Gather relevant information about your environment

### Issue Template

When creating an issue, include:

1. **Description**: Clear description of the problem
2. **Steps to Reproduce**: Minimal steps to reproduce the issue
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**:
   - next-navigation-progress version
   - Next.js version
   - React version
   - Node.js version
   - Browser and version
6. **Code Example**: Minimal reproduction code
7. **Screenshots**: If applicable

## Release Process

### Quick Release (Recommended)

Use the automated release script:

```bash
npm run release        # Interactive release
npm run release:patch  # Direct patch release
npm run release:minor  # Direct minor release
npm run release:major  # Direct major release
```

The script will:
- Check you're on main branch
- Run tests and build
- Update version
- Create and push tag
- Trigger changelog generation
- Guide you through npm publishing

### Manual Release

If you prefer to release manually, follow the steps in [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md).

### Commit Message Format

Follow conventional commits for automatic changelog generation:
- `feat:` - New features (appears in "Features" section)
- `fix:` - Bug fixes (appears in "Bug Fixes" section)
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks
- `test:` - Test changes
- `refactor:` - Code refactoring
- `style:` - Code style changes
- `perf:` - Performance improvements

## Questions?

If you have questions about contributing, feel free to:
- Open a discussion on GitHub
- Ask in an issue
- Reach out to the maintainers

Thank you for contributing to next-navigation-progress!