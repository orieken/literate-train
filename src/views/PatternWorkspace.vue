<template>
  <div class="pattern-workspace min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header with playful design -->
      <header class="mb-6 text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-2 animate-float">
          <span class="bg-gradient-to-r from-fun-cyan via-fun-pink to-fun-orange text-transparent bg-clip-text">
            Pattern Master
          </span>
          <span class="text-4xl ml-2 inline-block animate-wiggle">🎯</span>
        </h1>
        <p class="text-gray-300 text-lg">Level up your coding skills through epic challenges! 🚀</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <!-- Sidebar - Pattern List & User Progress -->
        <aside class="lg:col-span-3 space-y-4">
          <UserProgress />
          <PatternList @select-pattern="loadPattern" />
        </aside>

        <!-- Main Content Area -->
        <main v-if="currentPattern" class="lg:col-span-9 space-y-4">
          <!-- Pattern Description -->
          <div class="lg:col-span-12 transform transition-all hover:scale-[1.01]">
            <PatternDescription :pattern="currentPattern" />
          </div>

          <!-- Code Editor and Test Runner -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <!-- Code Editor -->
            <div class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 h-[600px] shadow-2xl border-2 border-purple-500/20 hover:border-purple-500/40 transition-all">
              <CodeEditor v-model="userCode" />
            </div>

            <!-- Test Runner -->
            <div class="h-[600px] transform transition-all hover:scale-[1.02]">
              <TestRunner
                ref="testRunnerRef"
                :test-cases="currentPattern.testCases"
                :user-code="userCode"
                :pattern-id="currentPattern.id"
                :xp-reward="currentPattern.xpReward"
              />
            </div>
          </div>
        </main>

        <!-- Welcome Message when no pattern selected -->
        <main v-else class="lg:col-span-9">
          <div class="bg-gradient-to-br from-purple-800/50 to-pink-800/50 backdrop-blur-sm rounded-3xl p-12 text-center shadow-2xl border-2 border-white/10">
            <div class="text-7xl mb-6 animate-bounce-slow">🎮</div>
            <h2 class="text-4xl font-bold text-white mb-4">
              Ready to Level Up? 🚀
            </h2>
            <p class="text-gray-200 text-xl mb-8">
              Choose your first challenge and start your coding adventure! 💪
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
              <div class="bg-gradient-to-br from-blue-600/30 to-cyan-600/30 p-6 rounded-2xl backdrop-blur-sm border-2 border-blue-400/20 hover:border-blue-400/50 transition-all transform hover:scale-105 hover:rotate-1">
                <div class="text-4xl mb-3 animate-pulse">💻</div>
                <h3 class="font-bold text-white text-xl mb-2">Code & Create</h3>
                <p class="text-sm text-gray-200">Write awesome solutions in our interactive editor</p>
              </div>
              <div class="bg-gradient-to-br from-purple-600/30 to-pink-600/30 p-6 rounded-2xl backdrop-blur-sm border-2 border-purple-400/20 hover:border-purple-400/50 transition-all transform hover:scale-105">
                <div class="text-4xl mb-3 animate-pulse-slow">📚</div>
                <h3 class="font-bold text-white text-xl mb-2">Learn & Grow</h3>
                <p class="text-sm text-gray-200">Master patterns with crystal-clear explanations</p>
              </div>
              <div class="bg-gradient-to-br from-orange-600/30 to-yellow-600/30 p-6 rounded-2xl backdrop-blur-sm border-2 border-orange-400/20 hover:border-orange-400/50 transition-all transform hover:scale-105 hover:-rotate-1">
                <div class="text-4xl mb-3 animate-bounce">🏆</div>
                <h3 class="font-bold text-white text-xl mb-2">Win Rewards</h3>
                <p class="text-sm text-gray-200">Earn XP, unlock achievements, and flex your skills!</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePatternsStore } from '@/stores/patterns';
import { useUserStore } from '@/stores/user';
import CodeEditor from '@/components/CodeEditor.vue';
import TestRunner from '@/components/TestRunner.vue';
import PatternDescription from '@/components/PatternDescription.vue';
import UserProgress from '@/components/UserProgress.vue';
import PatternList from '@/components/PatternList.vue';
import type { Pattern } from '@/types';

const patternsStore = usePatternsStore();
const userStore = useUserStore();

const currentPattern = ref<Pattern | null>(null);
const userCode = ref('');
const testRunnerRef = ref<InstanceType<typeof TestRunner>>();

const loadPattern = (patternId: string) => {
  const pattern = patternsStore.getPatternById(patternId);
  if (pattern) {
    currentPattern.value = pattern;
    userCode.value = pattern.starterCode;
    patternsStore.setCurrentPattern(patternId);
  }
};

onMounted(() => {
  userStore.loadProgress();
  
  // Auto-select first pattern if available
  if (patternsStore.patterns.length > 0 && patternsStore.patterns[0]) {
    loadPattern(patternsStore.patterns[0].id);
  }
});
</script>
