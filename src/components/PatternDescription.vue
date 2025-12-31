<template>
  <div class="pattern-description bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-2 border-purple-400/20">
    <div class="mb-4">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-3xl font-black bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 text-transparent bg-clip-text">
          {{ pattern.title }}
        </h2>
        <span
          class="px-4 py-2 rounded-xl text-sm font-bold border-2 transform hover:scale-110 transition-transform"
          :class="difficultyClass"
        >
          {{ pattern.difficulty.toUpperCase() }}
        </span>
      </div>
      <div class="flex gap-2 mb-4 flex-wrap">
        <span class="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 rounded-lg text-sm font-bold border border-blue-400/30">
          {{ categoryLabel }}
        </span>
        <span class="px-3 py-1.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-orange-300 rounded-lg text-sm font-bold border border-orange-400/30 animate-pulse">
          🌟 {{ pattern.xpReward }} XP
        </span>
      </div>
    </div>

    <div class="prose prose-invert max-w-none mb-6">
      <div class="text-gray-200 whitespace-pre-line leading-relaxed">{{ pattern.description }}</div>
    </div>

    <div v-if="pattern.visualization" class="mb-6">
      <h3 class="text-xl font-bold text-purple-200 mb-3 flex items-center gap-2">
        <span class="animate-pulse">🎨</span> Visualization
      </h3>
      <pre class="bg-gradient-to-br from-gray-900 to-black p-5 rounded-xl border-2 border-cyan-500/30 overflow-x-auto text-sm text-cyan-200 font-mono shadow-lg">{{ pattern.visualization }}</pre>
    </div>

    <div v-if="pattern.hints.length > 0" class="mb-6">
      <h3 class="text-xl font-bold text-purple-200 mb-3 flex items-center gap-2">
        <span>💡</span> Hints
      </h3>
      <button
        @click="showHints = !showHints"
        class="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl text-sm text-white font-bold mb-3 transform hover:scale-105 transition-all shadow-lg"
      >
        {{ showHints ? '🙈 Hide Hints' : '👀 Show Hints' }}
      </button>
      <ul v-if="showHints" class="list-none space-y-2 text-gray-200">
        <li v-for="(hint, index) in pattern.hints" :key="index" class="flex items-start gap-2 bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/30">
          <span class="text-yellow-400 font-bold">{{ index + 1 }}.</span>
          <span>{{ hint }}</span>
        </li>
      </ul>
    </div>

    <div class="border-t-2 border-purple-500/20 pt-5">
      <h3 class="text-xl font-bold text-purple-200 mb-3 flex items-center gap-2">
        <span class="animate-bounce">🧪</span> Test Cases
      </h3>
      <div class="space-y-2">
        <div
          v-for="(testCase, index) in pattern.testCases"
          :key="testCase.id"
          class="p-4 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl border-2 border-indigo-500/30 hover:border-indigo-400/50 transition-all"
        >
          <p class="text-gray-200 font-semibold flex items-center gap-2">
            <span class="text-xl">✅</span>
            Test {{ index + 1 }}: {{ testCase.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Pattern } from '@/types';

const props = defineProps<{
  pattern: Pattern;
}>();

const showHints = ref(false);

const difficultyClass = computed(() => {
  switch (props.pattern.difficulty) {
    case 'beginner':
      return 'bg-green-500/20 text-green-400';
    case 'intermediate':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'advanced':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
});

const categoryLabel = computed(() => {
  switch (props.pattern.category) {
    case 'design-pattern':
      return 'Design Pattern';
    case 'ml-algorithm':
      return 'ML Algorithm';
    case 'dsa':
      return 'Data Structures & Algorithms';
    default:
      return props.pattern.category;
  }
});
</script>
