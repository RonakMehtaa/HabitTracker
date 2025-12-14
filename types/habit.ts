export type Frequency = 'Daily' | 'Weekly';

export interface Habit {
  id: string;
  name: string;
  frequency: Frequency;
  completedDates: string[]; // ISO date strings
  createdAt: string;
}
