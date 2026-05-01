# Gym Buddy: Phase 4 - Frontend (The Duo Hub) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the React Native mobile application, focusing on the Duo Dashboard and the collaborative user experience.

**Architecture:** React Native (Expo) with TypeScript. Navigation via React Navigation (Bottom Tabs). State management via simple React Context (DuoContext).

**Tech Stack:** React Native, Expo, TypeScript, React Navigation, Axios.

---

### Task 1: Expo Setup & Navigation

**Files:**
- Create: `frontend/package.json`
- Create: `frontend/App.tsx`
- Create: `frontend/src/navigation/TabNavigator.tsx`

- [ ] **Step 1: Initialize Expo Project**
```bash
cd /home/bacancy/Desktop/Projects/side/gym-duo
npx create-expo-app@latest frontend --template blank-typescript
cd frontend
npm install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context axios
```

- [ ] **Step 2: Create Bottom Tab Navigator**
Setup 4 tabs: Home (Dashboard), Workout, Stats, Steps.

- [ ] **Step 3: Commit baseline**
```bash
git add frontend/
git commit -m "chore: initial frontend setup with navigation"
```

---

### Task 2: Duo Dashboard (The Hub)

**Files:**
- Create: `frontend/src/screens/HomeScreen.tsx`
- Create: `frontend/src/components/SharedStreak.tsx`
- Create: `frontend/src/components/MuscleHeatmap.tsx`

- [ ] **Step 1: Implement the Shared Streak Component**
A large, prominent "Flame" icon with the current streak number and a status message (e.g., "Partner is waiting for you!").

- [ ] **Step 2: Implement Side-by-Side Heatmaps**
Two SVG-based human silhouettes that fill with color based on volume data from the backend.

- [ ] **Step 3: Mock Dashboard Data**
Initially, use mock data to verify the layout (Streak: 12, MVP: Partner, Heatmap: Chest/Arms highlighted).

- [ ] **Step 4: Commit**
```bash
git add frontend/src/
git commit -m "feat: implement duo dashboard wireframe"
```

---

### Task 3: Workout Logger UI

**Files:**
- Create: `frontend/src/screens/WorkoutScreen.tsx`
- Create: `frontend/src/components/SetInput.tsx`

- [ ] **Step 1: Build the Logging Flow**
Select exercise -> Add Sets (Weight/Reps) -> Submit.
Use a "Quick Log" pattern to minimize friction for the daily streak.

- [ ] **Step 2: Connect to Backend API**
Use Axios to POST the workout log to our existing backend endpoint.

- [ ] **Step 3: Commit**
```bash
git add frontend/src/screens/WorkoutScreen.tsx
git commit -m "feat: add workout logging interface"
```
