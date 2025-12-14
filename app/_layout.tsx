import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Today',
        }}
      />
      <Stack.Screen
        name="add-habit"
        options={{
          presentation: 'modal',
          title: 'Add Habit',
        }}
      />
      <Stack.Screen
        name="habit/[id]"
        options={{
          title: '',
        }}
      />
    </Stack>
  );
}
