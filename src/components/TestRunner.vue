<template>
  <div class="test-runner bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-5 shadow-2xl border-2 border-green-400/20">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 text-transparent bg-clip-text flex items-center gap-2">
        <span class="animate-pulse">🧪</span> Test Results
      </h3>
      <button
        @click="runTests"
        class="px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 rounded-xl font-bold text-white transition-all transform hover:scale-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        :disabled="running"
      >
        {{ running ? '⏳ Running...' : '🚀 Run Tests' }}
      </button>
    </div>

    <div v-if="!hasRun" class="text-center py-12 bg-gray-900/30 rounded-xl border-2 border-dashed border-gray-600">
      <div class="text-6xl mb-4 animate-bounce-slow">🎯</div>
      <p class="text-gray-300 text-lg font-medium">Ready to test your code?</p>
      <p class="text-gray-400 text-sm mt-2">Click "Run Tests" to see how you did!</p>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="result in testResults"
        :key="result.testId"
        class="p-4 rounded-xl border-2 transform transition-all hover:scale-102"
        :class="result.passed 
          ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-400/50 hover:shadow-lg hover:shadow-green-500/20' 
          : 'bg-gradient-to-r from-red-900/30 to-pink-900/30 border-red-400/50 hover:shadow-lg hover:shadow-red-500/20'"
      >
        <div class="flex items-start gap-3">
          <span class="text-3xl" :class="result.passed ? 'animate-bounce' : 'animate-wiggle'">
            {{ result.passed ? '✅' : '❌' }}
          </span>
          <div class="flex-1">
            <p class="font-bold text-lg" :class="result.passed ? 'text-green-300' : 'text-red-300'">
              {{ getTestDescription(result.testId) }}
            </p>
            <p v-if="!result.passed && result.error" class="text-sm text-red-200 mt-2 font-mono bg-red-950/30 p-2 rounded border border-red-500/30">
              {{ result.error }}
            </p>
            <div v-if="!result.passed && result.actualOutput !== undefined" class="text-sm text-gray-300 mt-2 bg-gray-900/50 p-3 rounded-lg border border-gray-600/30">
              <div class="mb-1">
                <span class="font-bold text-yellow-300">Expected:</span> 
                <span class="font-mono text-green-300">{{ result.expectedOutput }}</span>
              </div>
              <div>
                <span class="font-bold text-yellow-300">Got:</span> 
                <span class="font-mono text-red-300">{{ result.actualOutput }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5 p-5 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl border-2 border-purple-400/30">
        <div class="text-base text-purple-100 font-bold mb-2">
          Score: <span class="text-2xl bg-gradient-to-r from-green-300 to-emerald-300 text-transparent bg-clip-text">{{ passedCount }}</span> / {{ totalCount }}
        </div>
        <div v-if="allPassed" class="mt-3 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border-2 border-yellow-400/50 animate-pulse">
          <p class="text-yellow-200 font-black text-xl flex items-center gap-2">
            <span class="text-3xl animate-bounce">🎉</span> 
            Perfect Score! 
            <span class="text-2xl">+{{ xpReward }} XP</span>
            <span class="text-3xl animate-bounce">🏆</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { TestCase, TestResult } from '@/types';
import { useUserStore } from '@/stores/user';

const props = defineProps<{
  testCases: TestCase[];
  userCode: string;
  patternId: string;
  xpReward: number;
}>();

const userStore = useUserStore();
const testResults = ref<TestResult[]>([]);
const running = ref(false);
const hasRun = ref(false);

const passedCount = computed(() => testResults.value.filter(r => r.passed).length);
const totalCount = computed(() => testResults.value.length);
const allPassed = computed(() => passedCount.value === totalCount.value && totalCount.value > 0);

const getTestDescription = (testId: string) => {
  return props.testCases.find(tc => tc.id === testId)?.description || 'Unknown test';
};

const runTests = async () => {
  running.value = true;
  hasRun.value = true;
  testResults.value = [];

  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate test execution

  for (const testCase of props.testCases) {
    try {
      // Create a safe evaluation context
      const result = evaluateTest(props.userCode, testCase);
      
      testResults.value.push({
        testId: testCase.id,
        passed: result.passed,
        actualOutput: result.actualOutput,
        expectedOutput: result.expectedOutput,
        error: result.error
      });
    } catch (error) {
      testResults.value.push({
        testId: testCase.id,
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  if (allPassed.value) {
    userStore.completePattern(props.patternId, props.xpReward);
  }

  running.value = false;
};

const evaluateTest = (userCode: string, testCase: TestCase) => {
  try {
    // This is a simplified test runner
    // In production, you'd want to use a proper sandboxed environment
    const func = new Function('test', `
      ${userCode}
      
      ${testCase.code}
    `);
    
    const actualOutput = func(testCase);
    const passed = JSON.stringify(actualOutput) === JSON.stringify(testCase.expectedOutput);
    
    return {
      passed,
      actualOutput,
      expectedOutput: testCase.expectedOutput
    };
  } catch (error) {
    return {
      passed: false,
      actualOutput: undefined,
      expectedOutput: testCase.expectedOutput,
      error: error instanceof Error ? error.message : 'Execution error'
    };
  }
};

defineExpose({ runTests });
</script>
