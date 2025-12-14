import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from '../types/habit';

const STORAGE_KEY = '@habits';

export const storageService = {
  async getHabits(): Promise<Habit[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading habits:', error);
      return [];
    }
  },

  async saveHabits(habits: Habit[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    } catch (error) {
      console.error('Error saving habits:', error);
    }
  },

  async addHabit(habit: Habit): Promise<void> {
    const habits = await this.getHabits();
    habits.push(habit);
    await this.saveHabits(habits);
  },

  async updateHabit(updatedHabit: Habit): Promise<void> {
    const habits = await this.getHabits();
    const index = habits.findIndex(h => h.id === updatedHabit.id);
    if (index !== -1) {
      habits[index] = updatedHabit;
      await this.saveHabits(habits);
    }
  },

  async toggleHabitCompletion(habitId: string, date: string): Promise<void> {
    const habits = await this.getHabits();
    const habit = habits.find(h => h.id === habitId);
    
    if (habit) {
      const dateIndex = habit.completedDates.indexOf(date);
      if (dateIndex > -1) {
        habit.completedDates.splice(dateIndex, 1);
      } else {
        habit.completedDates.push(date);
      }
      await this.saveHabits(habits);
    }
  },

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      console.log('All habits cleared');
    } catch (error) {
      console.error('Error clearing habits:', error);
    }
  },

  async deleteHabit(habitId: string): Promise<void> {
    const habits = await this.getHabits();
    const filteredHabits = habits.filter(h => h.id !== habitId);
    await this.saveHabits(filteredHabits);
  }
};
