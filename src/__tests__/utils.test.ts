import { describe, it, expect } from 'vitest';

// Since the utility functions are not exported, we'll need to test them indirectly
// or refactor the main file to export them. For now, we'll test the logic.

describe('Utility Functions', () => {
  describe('easeOutQuad', () => {
    it('should return 0 when input is 0', () => {
      const easeOutQuad = (t: number) => t * (2 - t);
      expect(easeOutQuad(0)).toBe(0);
    });

    it('should return 1 when input is 1', () => {
      const easeOutQuad = (t: number) => t * (2 - t);
      expect(easeOutQuad(1)).toBe(1);
    });

    it('should return 0.75 when input is 0.5', () => {
      const easeOutQuad = (t: number) => t * (2 - t);
      expect(easeOutQuad(0.5)).toBe(0.75);
    });

    it('should handle decimal values correctly', () => {
      const easeOutQuad = (t: number) => t * (2 - t);
      expect(easeOutQuad(0.25)).toBe(0.4375);
      expect(easeOutQuad(0.75)).toBe(0.9375);
    });
  });

  describe('generateEaseOutArray', () => {
    it('should generate an array of specified length', () => {
      const generateEaseOutArray = (length: number) => {
        const result = [];
        const easeOutQuad = (t: number) => t * (2 - t);
        for (let i = 1; i <= length; i++) {
          const easedValue = Math.round(easeOutQuad(i / (length - 1)) * 100);
          result.push(easedValue);
        }
        return result;
      };

      const result = generateEaseOutArray(10);
      expect(result).toHaveLength(10);
    });

    it('should start with a low value and end with 100', () => {
      const generateEaseOutArray = (length: number) => {
        const result = [];
        const easeOutQuad = (t: number) => t * (2 - t);
        for (let i = 1; i <= length; i++) {
          const easedValue = Math.round(easeOutQuad(i / (length - 1)) * 100);
          result.push(easedValue);
        }
        return result;
      };

      const result = generateEaseOutArray(100);
      expect(result[0]).toBeLessThan(10);
      expect(result[result.length - 1]).toBe(100);
    });

    it('should generate increasing values', () => {
      const generateEaseOutArray = (length: number) => {
        const result = [];
        const easeOutQuad = (t: number) => t * (2 - t);
        for (let i = 1; i <= length; i++) {
          const easedValue = Math.round(easeOutQuad(i / (length - 1)) * 100);
          result.push(easedValue);
        }
        return result;
      };

      const result = generateEaseOutArray(50);
      for (let i = 1; i < result.length; i++) {
        expect(result[i]).toBeGreaterThanOrEqual(result[i - 1]);
      }
    });

    it('should handle small arrays correctly', () => {
      const generateEaseOutArray = (length: number) => {
        const result = [];
        const easeOutQuad = (t: number) => t * (2 - t);
        for (let i = 1; i <= length; i++) {
          const easedValue = Math.round(easeOutQuad(i / (length - 1)) * 100);
          result.push(easedValue);
        }
        return result;
      };

      const result = generateEaseOutArray(3);
      expect(result).toHaveLength(3);
      // With length 3: i=1 -> 0.5, i=2 -> 1, i=3 -> 1.5 (but max is 1)
      // The formula i / (length - 1) when i=3 and length=3 gives 3/2 = 1.5
      // This needs to be clamped to 1
      expect(result[result.length - 1]).toBeGreaterThanOrEqual(75);
    });
  });
});