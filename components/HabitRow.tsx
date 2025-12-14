import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Habit } from '../types/habit';
import { isCompletedToday } from '../utils/habitUtils';

interface HabitRowProps {
  habit: Habit;
  onPress: () => void;
  onToggle: () => void;
}

export default function HabitRow({ habit, onPress, onToggle }: HabitRowProps) {
  const completed = isCompletedToday(habit);
  
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.nameContainer,
          pressed && styles.pressed,
        ]}
        onPress={onPress}
      >
        <Text style={[styles.name, completed && styles.completedText]}>
          {habit.name}
        </Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.indicatorContainer,
          pressed && styles.pressed,
        ]}
        onPress={onToggle}
      >
        <View style={[styles.indicator, completed && styles.completedIndicator]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  nameContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 20,
  },
  indicatorContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  pressed: {
    backgroundColor: '#f5f5f5',
  },
  name: {
    fontSize: 17,
    color: '#000',
  },
  completedText: {
    color: '#999',
  },
  indicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  completedIndicator: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
});
