import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { startTransition } from 'react';
import { 
  NextNavigationProgressBar, 
  NextNavigationProgressProvider,
  NavigationLink,
  useNavigationProgress 
} from '../index';

// Mock router.push
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Components', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  describe('NextNavigationProgressBar', () => {
    it('should not be visible initially', () => {
      const { container } = render(
        <NextNavigationProgressProvider>
          <NextNavigationProgressBar />
        </NextNavigationProgressProvider>
      );

      const progressBarContainer = container.querySelector('div') as HTMLElement;
      expect(progressBarContainer.style.display).toBe('none');
    });

    it('should become visible when progress starts', async () => {
      const TestComponent = () => {
        const { startNewProgress } = useNavigationProgress();
        return (
          <>
            <NextNavigationProgressBar />
            <button onClick={() => startTransition(() => startNewProgress())}>
              Start Progress
            </button>
          </>
        );
      };

      const { container } = render(
        <NextNavigationProgressProvider>
          <TestComponent />
        </NextNavigationProgressProvider>
      );

      const button = screen.getByText('Start Progress');
      const progressBarContainer = container.querySelector('div') as HTMLElement;
      
      expect(progressBarContainer.style.display).toBe('none');
      
      fireEvent.click(button);

      await waitFor(() => {
        expect(progressBarContainer.style.display).toBe('block');
      });
    });

    it('should update width based on progress', async () => {
      const TestComponent = () => {
        const { startNewProgress, progress } = useNavigationProgress();
        return (
          <>
            <NextNavigationProgressBar />
            <button onClick={() => startTransition(() => startNewProgress())}>
              Start Progress
            </button>
            <span data-testid="progress">{progress}</span>
          </>
        );
      };

      const { container } = render(
        <NextNavigationProgressProvider>
          <TestComponent />
        </NextNavigationProgressProvider>
      );

      const button = screen.getByText('Start Progress');
      fireEvent.click(button);

      await waitFor(() => {
        const progressBar = container.querySelectorAll('div')[1] as HTMLElement;
        const width = progressBar.style.width;
        expect(width).toMatch(/^\d+(\.\d+)?%$/);
      });
    });

    it('should have correct styles', () => {
      const { container } = render(
        <NextNavigationProgressProvider>
          <NextNavigationProgressBar />
        </NextNavigationProgressProvider>
      );

      const progressBar = container.querySelectorAll('div')[1] as HTMLElement;
      expect(progressBar.style.height).toBe('3px');
      expect(progressBar.style.backgroundColor).toBe('rgb(34, 139, 230)');
    });
  });

  describe('NavigationLink', () => {
    it('should render as a link', () => {
      render(
        <NextNavigationProgressProvider>
          <NavigationLink href="/test">Test Link</NavigationLink>
        </NextNavigationProgressProvider>
      );

      const link = screen.getByText('Test Link');
      expect(link.tagName.toLowerCase()).toBe('a');
      expect(link).toHaveAttribute('href', '/test');
    });

    it('should accept className prop', () => {
      render(
        <NextNavigationProgressProvider>
          <NavigationLink href="/test" className="custom-class">
            Test Link
          </NavigationLink>
        </NextNavigationProgressProvider>
      );

      const link = screen.getByText('Test Link');
      expect(link).toHaveClass('custom-class');
    });

    it('should accept style prop', () => {
      render(
        <NextNavigationProgressProvider>
          <NavigationLink href="/test" style={{ color: 'red' }}>
            Test Link
          </NavigationLink>
        </NextNavigationProgressProvider>
      );

      const link = screen.getByText('Test Link');
      expect(link).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    });

    it('should accept target prop', () => {
      render(
        <NextNavigationProgressProvider>
          <NavigationLink href="/test" target="_blank">
            Test Link
          </NavigationLink>
        </NextNavigationProgressProvider>
      );

      const link = screen.getByText('Test Link');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('should call custom onClick handler', async () => {
      const handleClick = vi.fn();
      
      render(
        <NextNavigationProgressProvider>
          <NavigationLink href="/test" onClick={handleClick}>
            Test Link
          </NavigationLink>
        </NextNavigationProgressProvider>
      );

      const link = screen.getByText('Test Link');
      await userEvent.click(link);

      expect(handleClick).toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });

    it('should trigger navigation and progress on click', async () => {
      const TestComponent = () => {
        const { stateObj } = useNavigationProgress();
        return (
          <>
            <NavigationLink href="/test">Test Link</NavigationLink>
            <span data-testid="showing">{stateObj.showing.toString()}</span>
          </>
        );
      };

      render(
        <NextNavigationProgressProvider>
          <TestComponent />
        </NextNavigationProgressProvider>
      );

      const link = screen.getByText('Test Link');
      
      expect(screen.getByTestId('showing')).toHaveTextContent('false');
      
      await userEvent.click(link);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/test');
      });
    });

    it('should support prefetch prop', () => {
      render(
        <NextNavigationProgressProvider>
          <NavigationLink href="/test" prefetch={false}>
            Test Link
          </NavigationLink>
        </NextNavigationProgressProvider>
      );

      const link = screen.getByText('Test Link');
      // The prefetch prop is passed to Next.js Link component, not the rendered anchor
      expect(link.tagName.toLowerCase()).toBe('a');
    });
  });

  describe('NextNavigationProgressProvider', () => {
    it('should provide context to children', () => {
      const TestComponent = () => {
        const context = useNavigationProgress();
        return (
          <div>
            <span data-testid="has-context">{context ? 'true' : 'false'}</span>
            <span data-testid="progress">{context.progress}</span>
          </div>
        );
      };

      render(
        <NextNavigationProgressProvider>
          <TestComponent />
        </NextNavigationProgressProvider>
      );

      expect(screen.getByTestId('has-context')).toHaveTextContent('true');
      expect(screen.getByTestId('progress')).toHaveTextContent('5'); // Initial progress
    });

    it('should render multiple children', () => {
      render(
        <NextNavigationProgressProvider>
          <div data-testid="child1">Child 1</div>
          <div data-testid="child2">Child 2</div>
        </NextNavigationProgressProvider>
      );

      expect(screen.getByTestId('child1')).toBeInTheDocument();
      expect(screen.getByTestId('child2')).toBeInTheDocument();
    });
  });
});