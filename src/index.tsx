import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  createContext,
  memo,
  startTransition,
  useContext,
  useEffect,
  useOptimistic,
  useState,
} from 'react';

function easeOutQuad(t: number) {
  return t * (2 - t);
}

function generateEaseOutArray(length: number) {
  const result = [];
  for (let i = 1; i <= length; i++) {
    const easedValue = Math.round(easeOutQuad(i / (length - 1)) * 100);
    result.push(easedValue);
  }
  return result;
}

const Context = createContext<{
  progress: number;
  startNewProgress: () => void;
  optimisticObj: { loading: boolean };
  stateObj: { showing: boolean };
}>({
  progress: 0,
  startNewProgress: () => {},
  optimisticObj: { loading: false },
  stateObj: { showing: false },
});

/**
 * Internal hook for managing progress state
 * @internal
 */
export const useProgress = () => {
  const [optimisticObj, setOptimisticObj] = useOptimistic({
    loading: false,
  });
  const [stateObj, setStateObj] = useState({
    showing: false,
  }); // to show latest status, use obj instead of just boolean
  const [progress, setProgress] = useState(5);

  useEffect(() => {
    if (!optimisticObj.loading) {
      return;
    }

    setStateObj(() => {
      return {
        showing: true,
      };
    });
    setProgress(0);
  }, [optimisticObj]);

  useEffect(() => {
    if (optimisticObj.loading || !stateObj.showing) {
      return;
    }

    const timeout = setTimeout(() => {
      setProgress(0);
      setStateObj((obj) => {
        return {
          ...obj,
          showing: false,
        };
      });
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [optimisticObj.loading, stateObj.showing]);

  useEffect(() => {
    if (!stateObj.showing) {
      return;
    }

    let index = 0;
    const arr = generateEaseOutArray(100).map((val) => val * (90 / 100));

    const updateProgress = () => {
      setProgress((prev) => {
        if (!optimisticObj.loading) {
          return 100;
        }

        const val = arr[index];
        index++;

        if (!val) {
          return prev;
        }

        return val;
      });
    };

    const interval = setInterval(updateProgress, 100);
    updateProgress();

    return () => {
      clearInterval(interval);
    };
  }, [stateObj, optimisticObj.loading]);

  const startNewProgress = () => {
    setOptimisticObj({
      loading: true,
    });
  };

  return {
    startNewProgress,
    progress,
    optimisticObj,
    stateObj,
  };
};

/**
 * Provider component that manages navigation progress state
 * Wrap your application with this provider to enable navigation progress functionality
 * 
 * @example
 * ```tsx
 * <NextNavigationProgressProvider>
 *   <NextNavigationProgressBar />
 *   {children}
 * </NextNavigationProgressProvider>
 * ```
 */
export const NextNavigationProgressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { progress, startNewProgress, optimisticObj, stateObj } = useProgress();

  return (
    <Context.Provider
      value={{ progress, startNewProgress, optimisticObj, stateObj }}
    >
      {children}
    </Context.Provider>
  );
};

/**
 * Progress bar component that displays navigation progress
 * Must be used inside NextNavigationProgressProvider
 * 
 * @example
 * ```tsx
 * <NextNavigationProgressProvider>
 *   <NextNavigationProgressBar />
 *   {children}
 * </NextNavigationProgressProvider>
 * ```
 */
export const NextNavigationProgressBar = () => {
  const { progress, stateObj } = useContext(Context);

  return (
    <div
      style={{
        display: stateObj.showing ? 'block' : 'none',
      }}
    >
      <div
        style={{
          width: stateObj.showing ? `${progress}%` : 0,
          height: '3px',
          backgroundColor: '#228be6',
          transition: stateObj.showing ? 'width 0.3s' : 'none',
          opacity: stateObj.showing ? 1 : 0,
        }}
      ></div>
    </div>
  );
};

/**
 * Hook to access navigation progress state and controls
 * Must be used inside NextNavigationProgressProvider
 * 
 * @returns {Object} Progress state and control functions
 * @returns {number} progress - Current progress value (0-100)
 * @returns {Function} startNewProgress - Function to start a new progress animation
 * @returns {Object} optimisticObj - Object containing loading state
 * @returns {Object} stateObj - Object containing visibility state
 * 
 * @example
 * ```tsx
 * const { progress, startNewProgress, optimisticObj, stateObj } = useNavigationProgress();
 * ```
 */
export const useNavigationProgress = () => {
  return useContext(Context);
};

/**
 * Pre-configured Link component that automatically triggers navigation progress
 * Wraps Next.js Link component with progress bar integration
 * 
 * @param {React.ReactNode} children - Link content
 * @param {string} className - CSS class name
 * @param {string} href - Destination URL
 * @param {string} [target] - Link target attribute
 * @param {Function} [onClick] - Custom click handler
 * @param {boolean} [prefetch] - Next.js prefetch behavior
 * @param {React.CSSProperties} [style] - Inline styles
 * 
 * @example
 * ```tsx
 * <NavigationLink href="/about" className="nav-link">
 *   About Page
 * </NavigationLink>
 * ```
 */
export const NavigationLink = memo(function NavigationLink({
  children,
  className,
  href,
  target,
  onClick,
  prefetch,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  prefetch?: boolean;
  style?: React.CSSProperties;
}) {
  const router = useRouter();
  const { startNewProgress } = useNavigationProgress();

  return (
    <Link
      prefetch={prefetch}
      className={className}
      href={href}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
          return;
        }

        startTransition(async () => {
          startNewProgress();
          router.push(href);
        });
      }}
      target={target}
      style={style}
    >
      {children}
    </Link>
  );
});
