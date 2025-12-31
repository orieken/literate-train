import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useUserStore } from '@/stores/user';

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('should initialize with default values', () => {
    const userStore = useUserStore();
    
    expect(userStore.totalXp).toBe(0);
    expect(userStore.level).toBe(1);
    expect(userStore.completedPatterns).toEqual([]);
    expect(userStore.achievements.length).toBeGreaterThan(0);
  });

  it('should add XP correctly', () => {
    const userStore = useUserStore();
    
    userStore.addXp(50);
    
    expect(userStore.totalXp).toBe(50);
  });

  it('should level up when reaching XP threshold', () => {
    const userStore = useUserStore();
    
    userStore.addXp(100);
    
    expect(userStore.level).toBe(2);
    expect(userStore.totalXp).toBe(100);
  });

  it('should unlock achievement when completing first pattern', () => {
    const userStore = useUserStore();
    
    userStore.completePattern('singleton', 50);
    
    const firstStepsAchievement = userStore.achievements.find(a => a.id === 'first-steps');
    expect(firstStepsAchievement?.unlocked).toBe(true);
    expect(userStore.completedPatterns).toContain('singleton');
    expect(userStore.totalXp).toBe(50);
  });

  it('should not add XP twice for the same pattern', () => {
    const userStore = useUserStore();
    
    userStore.completePattern('singleton', 50);
    userStore.completePattern('singleton', 50);
    
    expect(userStore.totalXp).toBe(50);
    expect(userStore.completedPatterns.length).toBe(1);
  });

  it('should calculate XP to next level correctly', () => {
    const userStore = useUserStore();
    
    expect(userStore.xpToNextLevel).toBe(100);
    
    userStore.addXp(100);
    
    expect(userStore.xpToNextLevel).toBe(200);
  });

  it('should calculate current level progress correctly', () => {
    const userStore = useUserStore();
    
    userStore.addXp(50);
    
    expect(userStore.currentLevelProgress).toBe(50);
  });

  it('should unlock Century Club achievement at 100 XP', () => {
    const userStore = useUserStore();
    
    userStore.addXp(100);
    
    const centuryClubAchievement = userStore.achievements.find(a => a.id === 'century-club');
    expect(centuryClubAchievement?.unlocked).toBe(true);
  });

  it('should save and load progress from localStorage', () => {
    const userStore = useUserStore();
    
    userStore.addXp(75);
    userStore.completePattern('singleton', 50);
    userStore.saveProgress();
    
    // Create a new store instance
    const newStore = useUserStore();
    newStore.loadProgress();
    
    expect(newStore.totalXp).toBe(125);
    expect(newStore.completedPatterns).toContain('singleton');
  });

  it('should filter unlocked achievements', () => {
    const userStore = useUserStore();
    
    userStore.completePattern('singleton', 50);
    
    expect(userStore.unlockedAchievements.length).toBeGreaterThan(0);
    expect(userStore.lockedAchievements.length).toBeGreaterThan(0);
  });
});
