import { defineStore } from 'pinia';
import type { UserProgress, Achievement } from '@/types';

export const useUserStore = defineStore('user', {
  state: (): UserProgress => ({
    userId: 'user-1',
    totalXp: 0,
    level: 1,
    completedPatterns: [],
    achievements: [
      {
        id: 'first-steps',
        title: 'First Steps',
        description: 'Complete your first pattern',
        icon: '🎯',
        requirement: 1,
        unlocked: false
      },
      {
        id: 'pattern-master',
        title: 'Pattern Master',
        description: 'Complete 5 patterns',
        icon: '🏆',
        requirement: 5,
        unlocked: false
      },
      {
        id: 'century-club',
        title: 'Century Club',
        description: 'Earn 100 XP',
        icon: '💯',
        requirement: 100,
        unlocked: false
      },
      {
        id: 'level-five',
        title: 'Rising Star',
        description: 'Reach level 5',
        icon: '⭐',
        requirement: 5,
        unlocked: false
      }
    ]
  }),

  getters: {
    xpToNextLevel(): number {
      return this.level * 100;
    },
    
    currentLevelProgress(): number {
      const xpInCurrentLevel = this.totalXp % 100;
      return (xpInCurrentLevel / this.xpToNextLevel) * 100;
    },

    unlockedAchievements(): Achievement[] {
      return this.achievements.filter(a => a.unlocked);
    },

    lockedAchievements(): Achievement[] {
      return this.achievements.filter(a => !a.unlocked);
    }
  },

  actions: {
    addXp(amount: number) {
      this.totalXp += amount;
      this.checkLevelUp();
      this.checkAchievements();
      this.saveProgress();
    },

    checkLevelUp() {
      const newLevel = Math.floor(this.totalXp / 100) + 1;
      if (newLevel > this.level) {
        this.level = newLevel;
      }
    },

    completePattern(patternId: string, xpReward: number) {
      if (!this.completedPatterns.includes(patternId)) {
        this.completedPatterns.push(patternId);
        this.addXp(xpReward);
      }
    },

    checkAchievements() {
      this.achievements.forEach(achievement => {
        if (!achievement.unlocked) {
          let achieved = false;
          
          switch (achievement.id) {
            case 'first-steps':
              achieved = this.completedPatterns.length >= 1;
              break;
            case 'pattern-master':
              achieved = this.completedPatterns.length >= 5;
              break;
            case 'century-club':
              achieved = this.totalXp >= 100;
              break;
            case 'level-five':
              achieved = this.level >= 5;
              break;
          }
          
          if (achieved) {
            achievement.unlocked = true;
            achievement.unlockedAt = new Date();
          }
        }
      });
    },

    saveProgress() {
      localStorage.setItem('userProgress', JSON.stringify({
        totalXp: this.totalXp,
        level: this.level,
        completedPatterns: this.completedPatterns,
        achievements: this.achievements
      }));
    },

    loadProgress() {
      const saved = localStorage.getItem('userProgress');
      if (saved) {
        const data = JSON.parse(saved);
        this.totalXp = data.totalXp || 0;
        this.level = data.level || 1;
        this.completedPatterns = data.completedPatterns || [];
        if (data.achievements) {
          this.achievements = this.achievements.map(ach => {
            const saved = data.achievements.find((a: Achievement) => a.id === ach.id);
            return saved || ach;
          });
        }
      }
    }
  }
});
