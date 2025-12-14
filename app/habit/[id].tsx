import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, useFocusEffect, useRouter } from 'expo-router';
import { useState, useCallback } from 'react';
import { Habit } from '../../types/habit';
import { storageService } from '../../utils/storage';
import { getCurrentStreak, getLastCompletedDate } from '../../utils/habitUtils';

export default function HabitDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [habit, setHabit] = useState<Habit | null>(null);

  const loadHabit = useCallback(async () => {
    const habits = await storageService.getHabits();
    const foundHabit = habits.find(h => h.id === id);
    if (foundHabit) {
      setHabit(foundHabit);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      loadHabit();
    }, [loadHabit])
  );

  const formatDate = (date: Date | null) => {
    if (!date) return 'Never';
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleDelete = () => {
    if (!habit) return;

    Alert.alert(
      'Delete Habit',
      `Are you sure you want to delete "${habit.name}"? This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await storageService.deleteHabit(habit.id);
            router.back();
          },
        },
      ]
    );
  };

  if (!habit) {
    return null;
  }

  const currentStreak = getCurrentStreak(habit);
  const lastCompleted = getLastCompletedDate(habit);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.habitName}>{habit.name}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Current Streak</Text>
          <Text style={styles.statValue}>{currentStreak} days</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Last Completed</Text>
          <Text style={styles.statValue}>{formatDate(lastCompleted)}</Text>
        </View>
      </View>

      <View style={styles.deleteContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.deleteButtonPressed,
          ]}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>Delete Habit</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  habitName: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
  },
  statsContainer: {
    padding: 20,
  },
  statItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 15,
    color: '#999',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  deleteContainer: {
    padding: 20,
  },
  deleteButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  deleteButtonPressed: {
    opacity: 0.6,
  },
  deleteButtonText: {
    color: '#ff3b30',
    fontSize: 17,
  },
});
