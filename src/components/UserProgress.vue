<template>
  <div class="user-progress bg-gradient-to-br from-purple-800/40 to-pink-800/40 backdrop-blur-sm rounded-2xl p-5 shadow-2xl border-2 border-purple-400/20 hover:border-purple-400/40 transition-all">
    <div class="flex items-center gap-3 mb-4">
      <div class="text-5xl animate-bounce-slow">🎮</div>
      <div class="flex-1">
        <h3 class="text-2xl font-extrabold bg-gradient-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text">
          Level {{ userStore.level }}
        </h3>
        <p class="text-sm text-purple-200 font-semibold">{{ userStore.totalXp }} XP ⚡</p>
      </div>
    </div>

    <div class="mb-5">
      <div class="flex justify-between text-sm text-purple-200 mb-2 font-medium">
        <span>Next Level 🚀</span>
        <span class="font-bold">{{ userStore.totalXp % 100 }} / {{ userStore.xpToNextLevel }}</span>
      </div>
      <div class="w-full bg-gray-900/50 rounded-full h-3 overflow-hidden border-2 border-purple-500/30">
        <div
          class="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-fun-cyan via-fun-pink to-fun-orange animate-pulse"
          :style="{ width: `${userStore.currentLevelProgress}%` }"
        ></div>
      </div>
    </div>

    <div class="mb-5">
      <h4 class="text-sm font-bold text-purple-100 mb-3 flex items-center gap-2">
        <span>📊</span> Your Stats
      </h4>
      <div class="grid grid-cols-2 gap-3 text-sm">
        <div class="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-3 rounded-xl border-2 border-green-400/30 hover:scale-105 transition-transform">
          <div class="text-gray-200 text-xs mb-1">Completed ✅</div>
          <div class="text-3xl font-black bg-gradient-to-r from-green-300 to-emerald-400 text-transparent bg-clip-text">
            {{ userStore.completedPatterns.length }}
          </div>
        </div>
        <div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3 rounded-xl border-2 border-purple-400/30 hover:scale-105 transition-transform">
          <div class="text-gray-200 text-xs mb-1">Badges 🏅</div>
          <div class="text-3xl font-black bg-gradient-to-r from-purple-300 to-pink-400 text-transparent bg-clip-text">
            {{ userStore.unlockedAchievements.length }}
          </div>
        </div>
      </div>
    </div>

    <div>
      <h4 class="text-sm font-bold text-purple-100 mb-3 flex items-center gap-2">
        <span class="animate-wiggle">🏆</span> Achievements
      </h4>
      <div class="space-y-2 max-h-64 overflow-y-auto pr-1">
        <div
          v-for="achievement in displayAchievements"
          :key="achievement.id"
          class="flex items-center gap-2 p-3 rounded-xl transition-all"
          :class="achievement.unlocked 
            ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/40 hover:scale-102' 
            : 'bg-gray-900/30 border-2 border-gray-700/30'"
        >
          <div 
            class="text-3xl transition-all" 
            :class="achievement.unlocked ? 'animate-bounce-slow' : 'grayscale opacity-40'"
          >
            {{ achievement.icon }}
          </div>
          <div class="flex-1">
            <p class="text-sm font-bold" :class="achievement.unlocked ? 'text-yellow-200' : 'text-gray-500'">
              {{ achievement.title }}
            </p>
            <p class="text-xs" :class="achievement.unlocked ? 'text-yellow-300/80' : 'text-gray-600'">
              {{ achievement.description }}
            </p>
          </div>
          <div v-if="achievement.unlocked" class="text-green-400 text-2xl animate-pulse">✓</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const displayAchievements = computed(() => {
  return [...userStore.achievements].sort((a, b) => {
    if (a.unlocked === b.unlocked) return 0;
    return a.unlocked ? -1 : 1;
  });
});
</script>
