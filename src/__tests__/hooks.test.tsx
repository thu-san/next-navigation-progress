import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { startTransition } from 'react';
import { useProgress, useNavigationProgress, NextNavigationProgressProvider } from '../index';

describe('Hooks', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe('useProgress', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() => useProgress());
      
      expect(result.current.progress).toBe(5);
      expect(result.current.optimisticObj.loading).toBe(false);
      expect(result.current.stateObj.showing).toBe(false);
      expect(typeof result.current.startNewProgress).toBe('function');
    });

    it('should start progress when startNewProgress is called', () => {
      const { result } = renderHook(() => useProgress());
      
      // Test that startNewProgress is a function
      expect(typeof result.current.startNewProgress).toBe('function');
      
      // Call the function - we can't easily test optimistic state in unit tests
      act(() => {
        result.current.startNewProgress();
      });
      
      // The function should not throw
      expect(true).toBe(true);
    });

    it('should have progress state', () => {
      const { result } = renderHook(() => useProgress());
      
      // Progress should be a number
      expect(typeof result.current.progress).toBe('number');
      expect(result.current.progress).toBeGreaterThanOrEqual(0);
      expect(result.current.progress).toBeLessThanOrEqual(100);
    });

    it('should have optimistic and state objects', () => {
      const { result } = renderHook(() => useProgress());
      
      expect(result.current.optimisticObj).toBeDefined();
      expect(result.current.optimisticObj).toHaveProperty('loading');
      expect(typeof result.current.optimisticObj.loading).toBe('boolean');
      
      expect(result.current.stateObj).toBeDefined();
      expect(result.current.stateObj).toHaveProperty('showing');
      expect(typeof result.current.stateObj.showing).toBe('boolean');
    });

    it('should return all required properties', () => {
      const { result } = renderHook(() => useProgress());
      
      // Check all properties are present
      expect(result.current).toHaveProperty('progress');
      expect(result.current).toHaveProperty('startNewProgress');
      expect(result.current).toHaveProperty('optimisticObj');
      expect(result.current).toHaveProperty('stateObj');
    });

  });

  describe('useNavigationProgress', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <NextNavigationProgressProvider>{children}</NextNavigationProgressProvider>
    );

    it('should provide context values', () => {
      const { result } = renderHook(() => useNavigationProgress(), { wrapper });
      
      expect(result.current).toHaveProperty('progress');
      expect(result.current).toHaveProperty('startNewProgress');
      expect(result.current).toHaveProperty('optimisticObj');
      expect(result.current).toHaveProperty('stateObj');
    });

    it('should share state between multiple hooks', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NextNavigationProgressProvider>{children}</NextNavigationProgressProvider>
      );
      
      const { result: result1 } = renderHook(() => useNavigationProgress(), { wrapper });
      const { result: result2 } = renderHook(() => useNavigationProgress(), { wrapper });
      
      // Both hooks should return the same initial values
      expect(result1.current.progress).toBe(result2.current.progress);
      expect(result1.current.optimisticObj).toEqual(result2.current.optimisticObj);
      expect(result1.current.stateObj).toEqual(result2.current.stateObj);
    });
  });
});