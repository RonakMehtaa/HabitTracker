import { Habit } from '../types/habit';

export function getTodayDateString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export function isCompletedToday(habit: Habit): boolean {
  const today = getTodayDateString();
  return habit.completedDates.includes(today);
}

export function getCurrentStreak(habit: Habit): number {
  if (habit.completedDates.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter out future dates and convert to Date objects
  const validDates = habit.completedDates
    .map(dateStr => {
      const date = new Date(dateStr);
      date.setHours(0, 0, 0, 0);
      return date;
    })
    .filter(date => date.getTime() <= today.getTime())
    .sort((a, b) => b.getTime() - a.getTime()); // Sort descending (most recent first)

  if (validDates.length === 0) return 0;

  const mostRecentDate = validDates[0];
  
  // Streak only counts if the most recent completion is today or yesterday
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (mostRecentDate.getTime() !== today.getTime() && 
      mostRecentDate.getTime() !== yesterday.getTime()) {
    return 0; // Streak is broken
  }

  // Count consecutive days starting from the most recent date
  let streak = 0;
  let expectedDate = new Date(mostRecentDate);

  for (const completedDate of validDates) {
    if (completedDate.getTime() === expectedDate.getTime()) {
      streak++;
      // Move to the previous day
      expectedDate.setDate(expectedDate.getDate() - 1);
    } else if (completedDate.getTime() < expectedDate.getTime()) {
      // Gap found, streak is broken
      break;
    }
    // If completedDate > expectedDate, it's a duplicate, skip it
  }

  return streak;
}

export function getLastCompletedDate(habit: Habit): Date | null {
  if (habit.completedDates.length === 0) return null;

  const sortedDates = [...habit.completedDates]
    .map(d => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime());

  return sortedDates[0];
}
