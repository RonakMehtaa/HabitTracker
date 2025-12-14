import { View, FlatList, StyleSheet, Pressable, Text } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import HabitRow from '../components/HabitRow';
import { Habit } from '../types/habit';
import { storageService } from '../utils/storage';
import { getTodayDateString } from '../utils/habitUtils';

export default function TodayScreen() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);

  const loadHabits = useCallback(async () => {
    const loadedHabits = await storageService.getHabits();
    setHabits(loadedHabits);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadHabits();
    }, [loadHabits])
  );

  const handleHabitPress = (habit: Habit) => {
    router.push(`/habit/${habit.id}`);
  };

  const handleToggleCompletion = async (habit: Habit) => {
    const today = getTodayDateString();
    await storageService.toggleHabitCompletion(habit.id, today);
    await loadHabits();
  };

  const handleAddHabit = () => {
    router.push('/add-habit');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitRow 
            habit={item} 
            onPress={() => handleHabitPress(item)}
            onToggle={() => handleToggleCompletion(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.addButtonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed,
          ]}
          onPress={handleAddHabit}
        >
          <Text style={styles.addButtonText}>Add Habit</Text>
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
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingTop: 0,
    paddingBottom: 100,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonPressed: {
    opacity: 0.8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
