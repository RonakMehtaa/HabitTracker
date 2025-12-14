# Habit Tracker

A minimal, calm habit tracking app for iOS built with React Native and Expo. Designed for daily repeated use with a clean interface similar to Apple Reminders.

## Tech Stack

### Framework & Language
- **React Native** - Cross-platform mobile framework
- **Expo** (~52.0.0) - Development platform and tooling
- **TypeScript** - Type-safe JavaScript
- **Expo Router** (~4.0.0) - File-based navigation

### Storage
- **AsyncStorage** (@react-native-async-storage/async-storage) - Local data persistence

### UI Components
- React Native core components (View, Text, Pressable, FlatList, TextInput)
- React Native Safe Area Context - Safe area handling for modern devices

### Development Tools
- npm - Package manager
- TypeScript compiler
- Expo CLI

## Features

### Core Functionality
- ✅ Create habits with custom names
- ✅ Set habit frequency (Daily or Weekly)
- ✅ Track completion by date
- ✅ View current streak (consecutive days)
- ✅ See last completed date
- ✅ Delete habits with confirmation
- ✅ Persistent storage across app sessions

### User Interface
- Clean, minimal design
- Optimized for daily use
- Apple Reminders aesthetic
- No clutter or decorative elements
- Smooth animations and interactions

## User Manual

### Getting Started

1. **Launch the app** - You'll see the "Today" screen with your habit list
2. **Add your first habit** - Tap the blue "Add Habit" button at the bottom

### Adding a Habit

1. Tap "Add Habit" button on the Today screen
2. Enter a habit name (e.g., "Morning meditation", "Read for 30 minutes")
3. Select frequency:
   - **Daily** - For habits you want to do every day
   - **Weekly** - For habits you want to do weekly
4. Tap "Save" to create the habit

### Marking Habits Complete

On the Today screen:
- **Tap the circle** on the right side of any habit to mark it complete for today
- Empty circle = not completed
- Filled blue circle = completed
- Completed habits show in gray text

### Viewing Habit Details

1. **Tap the habit name** (not the circle) on the Today screen
2. You'll see:
   - **Current Streak** - Number of consecutive days you've completed the habit
   - **Last Completed** - The most recent date you completed the habit

### Deleting a Habit

1. Tap the habit name to open the detail screen
2. Scroll down to see the "Delete Habit" button
3. Tap "Delete Habit"
4. Confirm deletion in the alert
5. The habit is permanently removed

### Understanding Streaks

- **Streak** counts consecutive days you've completed a habit
- Streak resets to 0 if you miss a day
- Streaks are calculated up to today (future dates are ignored)
- You can build a streak by completing the habit today or yesterday

## App Structure

### Screens

**Today Screen** (`app/index.tsx`)
- Main screen showing all habits for today
- List of habits with completion indicators
- Add Habit button

**Add Habit Screen** (`app/add-habit.tsx`)
- Modal form for creating new habits
- Habit name input
- Frequency selector (Daily/Weekly)
- Save button

**Habit Detail Screen** (`app/habit/[id].tsx`)
- Shows detailed information about a specific habit
- Current streak count
- Last completed date
- Delete habit option

### Data Model

```typescript
interface Habit {
  id: string;              // Unique identifier
  name: string;            // Habit name
  frequency: 'Daily' | 'Weekly';  // How often
  completedDates: string[]; // ISO date strings
  createdAt: string;       // ISO date string
}
```

### Key Files

- `types/habit.ts` - TypeScript type definitions
- `utils/storage.ts` - AsyncStorage operations (CRUD)
- `utils/habitUtils.ts` - Streak calculation and date helpers
- `components/HabitRow.tsx` - Reusable habit list item component

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Emulator

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

### Project Structure

```
HabitTracker/
├── app/                  # Screens (Expo Router file-based routing)
│   ├── _layout.tsx      # Root navigation layout
│   ├── index.tsx        # Today screen
│   ├── add-habit.tsx    # Add habit modal
│   └── habit/
│       └── [id].tsx     # Habit detail screen
├── components/          # Reusable UI components
│   └── HabitRow.tsx    # Habit list item
├── types/              # TypeScript type definitions
│   └── habit.ts
├── utils/              # Business logic and helpers
│   ├── storage.ts      # AsyncStorage service
│   └── habitUtils.ts   # Date and streak calculations
├── app.json            # Expo configuration
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript configuration
```

## Design Principles

1. **Minimal & Calm** - No unnecessary elements or decorations
2. **Daily Optimized** - Designed for repeated daily use
3. **iOS Native Feel** - Follows iOS design patterns and conventions
4. **Type Safe** - Full TypeScript coverage
5. **Persistent** - All data stored locally on device

## Future Enhancements

Potential features for future versions:
- Weekly view option
- Habit statistics and charts
- Custom habit colors
- Notifications/reminders
- Export data
- Dark mode support
- iCloud sync

## License

MIT

## Author

Built with ❤️ using Expo and React Native
