import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Frequency } from '../types/habit';
import { storageService } from '../utils/storage';

export default function AddHabitScreen() {
  const router = useRouter();
  const [habitName, setHabitName] = useState('');
  const [frequency, setFrequency] = useState<Frequency>('Daily');

  const handleSave = async () => {
    if (habitName.trim()) {
      const newHabit = {
        id: Date.now().toString(),
        name: habitName.trim(),
        frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      
      await storageService.addHabit(newHabit);
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Habit name"
          value={habitName}
          onChangeText={setHabitName}
          autoFocus
        />

        <View style={styles.frequencyContainer}>
          <Pressable
            style={[
              styles.frequencyButton,
              frequency === 'Daily' && styles.frequencyButtonActive,
            ]}
            onPress={() => setFrequency('Daily')}
          >
            <Text
              style={[
                styles.frequencyText,
                frequency === 'Daily' && styles.frequencyTextActive,
              ]}
            >
              Daily
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.frequencyButton,
              frequency === 'Weekly' && styles.frequencyButtonActive,
            ]}
            onPress={() => setFrequency('Weekly')}
          >
            <Text
              style={[
                styles.frequencyText,
                frequency === 'Weekly' && styles.frequencyTextActive,
              ]}
            >
              Weekly
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.saveButtonPressed,
          ]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
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
  form: {
    padding: 20,
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 17,
    borderRadius: 12,
    marginBottom: 20,
  },
  frequencyContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  frequencyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  frequencyButtonActive: {
    backgroundColor: '#007AFF',
  },
  frequencyText: {
    fontSize: 17,
    color: '#000',
  },
  frequencyTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonPressed: {
    opacity: 0.8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
