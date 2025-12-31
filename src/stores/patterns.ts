import { defineStore } from 'pinia';
import type { Pattern } from '@/types';

export const usePatternsStore = defineStore('patterns', {
  state: () => ({
    patterns: [
      {
        id: 'singleton',
        title: 'Singleton Pattern',
        category: 'design-pattern' as const,
        difficulty: 'beginner' as const,
        description: `The Singleton pattern ensures that a class has only one instance and provides a global point of access to it. This is useful when exactly one object is needed to coordinate actions across the system.

**Key Concepts:**
- Private constructor to prevent direct instantiation
- Static method to get the single instance
- Lazy initialization`,
        visualization: `
┌─────────────────────┐
│   Singleton         │
├─────────────────────┤
│ - instance: Singleton│
├─────────────────────┤
│ + getInstance()     │
│ - constructor()     │
└─────────────────────┘
        `,
        xpReward: 50,
        starterCode: `class Singleton {
  // TODO: Implement the Singleton pattern
  
  constructor() {
    // Your code here
  }
  
  static getInstance() {
    // Your code here
  }
  
  doSomething() {
    return "Singleton instance";
  }
}`,
        solution: `class Singleton {
  static instance;
  
  constructor() {
    // Private constructor prevents direct instantiation
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
  
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
  
  doSomething() {
    return "Singleton instance";
  }
}`,
        testCases: [
          {
            id: 'test-1',
            description: 'Should return the same instance',
            input: null,
            expectedOutput: true,
            code: `const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
return instance1 === instance2;`
          },
          {
            id: 'test-2',
            description: 'Should execute doSomething method',
            input: null,
            expectedOutput: 'Singleton instance',
            code: `const instance = Singleton.getInstance();
return instance.doSomething();`
          }
        ],
        hints: [
          'Use a static property to store the instance',
          'Make the constructor private',
          'Check if instance exists before creating a new one'
        ]
      },
      {
        id: 'binary-search',
        title: 'Binary Search',
        category: 'dsa' as const,
        difficulty: 'beginner' as const,
        description: `Binary Search is an efficient algorithm for finding an item in a sorted array. It works by repeatedly dividing the search interval in half.

**Key Concepts:**
- Array must be sorted
- Time complexity: O(log n)
- Divide and conquer approach`,
        visualization: `
Array: [1, 3, 5, 7, 9, 11, 13, 15]
Target: 7

Step 1: [1, 3, 5, 7, | 9, 11, 13, 15]  mid=7 ✓
        `,
        xpReward: 40,
        starterCode: `function binarySearch(arr, target) {
  // TODO: Implement binary search
  // Return the index of target, or -1 if not found
  
  return -1;
}`,
        solution: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`,
        testCases: [
          {
            id: 'test-1',
            description: 'Should find element in the middle',
            input: { arr: [1, 3, 5, 7, 9], target: 5 },
            expectedOutput: 2,
            code: `return binarySearch([1, 3, 5, 7, 9], 5);`
          },
          {
            id: 'test-2',
            description: 'Should return -1 for missing element',
            input: { arr: [1, 3, 5, 7, 9], target: 6 },
            expectedOutput: -1,
            code: `return binarySearch([1, 3, 5, 7, 9], 6);`
          },
          {
            id: 'test-3',
            description: 'Should find first element',
            input: { arr: [1, 3, 5, 7, 9], target: 1 },
            expectedOutput: 0,
            code: `return binarySearch([1, 3, 5, 7, 9], 1);`
          }
        ],
        hints: [
          'Start with left at 0 and right at array length - 1',
          'Calculate middle index: Math.floor((left + right) / 2)',
          'Compare middle element with target and adjust search range'
        ]
      },
      {
        id: 'linear-regression',
        title: 'Simple Linear Regression',
        category: 'ml-algorithm' as const,
        difficulty: 'intermediate' as const,
        description: `Linear Regression is a fundamental machine learning algorithm that models the relationship between variables by fitting a linear equation.

**Key Concepts:**
- Slope and intercept calculation
- Mean of x and y values
- Formula: y = mx + b`,
        visualization: `
     y
     │     ●
     │   ●   ●
     │ ●   ●
     │●  /
     │  /
     └────────── x
        `,
        xpReward: 60,
        starterCode: `// Point: { x: number, y: number }

function linearRegression(points) {
  // TODO: Calculate slope and intercept
  // slope = Σ((x - meanX) * (y - meanY)) / Σ((x - meanX)²)
  // intercept = meanY - slope * meanX
  
  return { slope: 0, intercept: 0 };
}`,
        solution: `// Point: { x: number, y: number }

function linearRegression(points) {
  const n = points.length;
  const meanX = points.reduce((sum, p) => sum + p.x, 0) / n;
  const meanY = points.reduce((sum, p) => sum + p.y, 0) / n;
  
  let numerator = 0;
  let denominator = 0;
  
  for (const point of points) {
    numerator += (point.x - meanX) * (point.y - meanY);
    denominator += (point.x - meanX) ** 2;
  }
  
  const slope = numerator / denominator;
  const intercept = meanY - slope * meanX;
  
  return { slope, intercept };
}`,
        testCases: [
          {
            id: 'test-1',
            description: 'Should calculate correct slope and intercept',
            input: [{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 6 }],
            expectedOutput: { slope: 2, intercept: 0 },
            code: `const result = linearRegression([{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 6 }]);
return { slope: Math.round(result.slope), intercept: Math.round(result.intercept) };`
          }
        ],
        hints: [
          'Calculate mean of x and y values first',
          'Use the covariance formula for slope',
          'intercept = meanY - slope * meanX'
        ]
      }
    ] as Pattern[],
    currentPattern: null as Pattern | null
  }),

  getters: {
    getPatternById: (state) => {
      return (id: string) => state.patterns.find(p => p.id === id);
    },

    getPatternsByCategory: (state) => {
      return (category: string) => state.patterns.filter(p => p.category === category);
    },

    getPatternsByDifficulty: (state) => {
      return (difficulty: string) => state.patterns.filter(p => p.difficulty === difficulty);
    }
  },

  actions: {
    setCurrentPattern(patternId: string) {
      this.currentPattern = this.patterns.find(p => p.id === patternId) || null;
    }
  }
});
