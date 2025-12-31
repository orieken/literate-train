export interface Pattern {
  id: string;
  title: string;
  category: 'design-pattern' | 'ml-algorithm' | 'dsa';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  visualization?: string;
  xpReward: number;
  starterCode: string;
  solution: string;
  testCases: TestCase[];
  hints: string[];
}

export interface TestCase {
  id: string;
  description: string;
  input: any;
  expectedOutput: any;
  code: string;
}

export interface UserProgress {
  userId: string;
  totalXp: number;
  level: number;
  completedPatterns: string[];
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface TestResult {
  testId: string;
  passed: boolean;
  actualOutput?: any;
  expectedOutput?: any;
  error?: string;
}
