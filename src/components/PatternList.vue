<template>
  <div class="pattern-list bg-gradient-to-br from-blue-800/40 to-indigo-800/40 backdrop-blur-sm rounded-2xl p-5 shadow-2xl border-2 border-blue-400/20 hover:border-blue-400/40 transition-all">
    <div class="mb-4">
      <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 text-transparent bg-clip-text mb-4 flex items-center gap-2">
        <span class="animate-pulse">🎯</span> Challenges
      </h2>
      
      <div class="flex gap-2 mb-4 flex-wrap">
        <button
          v-for="category in categories"
          :key="category.value ?? 'all'"
          @click="selectedCategory = category.value"
          class="px-3 py-2 rounded-xl transition-all transform hover:scale-105 font-semibold text-sm"
          :class="selectedCategory === category.value 
            ? 'bg-gradient-to-r from-fun-cyan to-fun-pink text-white shadow-lg' 
            : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600/30'"
        >
          {{ category.label }}
        </button>
      </div>
    </div>

    <div class="space-y-3 max-h-[500px] overflow-y-auto pr-1">
      <div
        v-for="pattern in filteredPatterns"
        :key="pattern.id"
        @click="selectPattern(pattern.id)"
        class="p-4 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-105 hover:-rotate-1"
        :class="isCompleted(pattern.id) 
          ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50 hover:shadow-lg hover:shadow-green-500/20' 
          : currentPatternId === pattern.id 
            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20' 
            : 'bg-gray-800/40 border-gray-600/30 hover:border-purple-400/50'"
      >
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-base font-bold text-white">{{ pattern.title }}</h3>
          <span v-if="isCompleted(pattern.id)" class="text-green-400 text-2xl animate-bounce">✓</span>
        </div>
        
        <div class="flex gap-2 items-center text-xs flex-wrap">
          <span
            class="px-2 py-1 rounded-lg font-bold"
            :class="getDifficultyClass(pattern.difficulty)"
          >
            {{ pattern.difficulty }}
          </span>
          <span class="px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-orange-300 rounded-lg font-bold border border-orange-400/30">
            {{ pattern.xpReward }} XP ⭐
          </span>
        </div>
      </div>

      <div v-if="filteredPatterns.length === 0" class="text-center text-gray-400 py-8">
        <div class="text-4xl mb-2">🔍</div>
        <p>No challenges here yet!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePatternsStore } from '@/stores/patterns';
import { useUserStore } from '@/stores/user';

const emit = defineEmits<{
  (e: 'selectPattern', patternId: string): void;
}>();

const patternsStore = usePatternsStore();
const userStore = useUserStore();

const selectedCategory = ref<string | null>(null);
const currentPatternId = ref<string | null>(null);

const categories = [
  { value: null, label: '✨ All' },
  { value: 'design-pattern', label: '🎨 Patterns' },
  { value: 'dsa', label: '🧩 DS&A' },
  { value: 'ml-algorithm', label: '🤖 ML' }
];

const filteredPatterns = computed(() => {
  if (!selectedCategory.value) {
    return patternsStore.patterns;
  }
  return patternsStore.patterns.filter(p => p.category === selectedCategory.value);
});

const isCompleted = (patternId: string) => {
  return userStore.completedPatterns.includes(patternId);
};

const getDifficultyClass = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-300 border border-green-400/40';
    case 'intermediate':
      return 'bg-gradient-to-r from-yellow-500/30 to-orange-500/30 text-yellow-300 border border-yellow-400/40';
    case 'advanced':
      return 'bg-gradient-to-r from-red-500/30 to-pink-500/30 text-red-300 border border-red-400/40';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

const selectPattern = (patternId: string) => {
  currentPatternId.value = patternId;
  emit('selectPattern', patternId);
};
</script>
