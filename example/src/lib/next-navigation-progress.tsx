import {
  createContext,
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

export const useNavigationProgress = () => {
  return useContext(Context);
};
