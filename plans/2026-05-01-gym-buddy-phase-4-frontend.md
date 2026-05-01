# IronBond: Phase 4 - Frontend (The Duo Hub) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the React Native mobile application, focusing on the Duo Dashboard and the collaborative user experience, matching the Stitch designs.

**Architecture:** React Native (Expo) with TypeScript. Navigation via React Navigation. State management via React Context.

**Tech Stack:** React Native, Expo, TypeScript, React Navigation, Axios, Lucide-react-native.

---

### Task 1: Expo Setup & Global Theme

**Files:**
- Create: `frontend/src/theme/colors.ts`
- Create: `frontend/src/theme/typography.ts`
- Modify: `frontend/App.tsx`

- [ ] **Step 1: Initialize Expo Project**
```bash
cd /home/bacancy/Desktop/Projects/side/ironbond
npx create-expo-app@latest frontend --template blank-typescript
cd frontend
npm install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context axios lucide-react-native
```

- [ ] **Step 2: Pull Design Tokens from Stitch**
Extract the primary colors (Neon accents, Dark background) and fonts from the Duo Dashboard screen in Stitch and save to `src/theme/colors.ts`.

- [ ] **Step 3: Commit**
```bash
git add frontend/
git commit -m "chore: initial expo setup and design theme"
```

---

### Task 2: Navigation & Onboarding Flow

**Files:**
- Create: `frontend/src/navigation/RootNavigator.tsx`
- Create: `frontend/src/screens/OnboardingScreen.tsx`
- Create: `frontend/src/screens/InvitePartnerScreen.tsx`

- [ ] **Step 1: Implement Onboarding Flow**
Pull code from Stitch screen `7ad0329cddc544328a46351c6a03bc04` and adapt for React Native.

- [ ] **Step 2: Implement Invite Partner Screen**
Pull code from Stitch screen `a4954de919244e5c98f70bb629b68ac8`.

- [ ] **Step 3: Setup Root Navigation (Switch between Onboarding and App)**
If user is not in a Duo, show Onboarding.

- [ ] **Step 4: Commit**
```bash
git add frontend/src/navigation/ frontend/src/screens/
git commit -m "feat: implement onboarding and invite partner flow"
```

---

### Task 3: Duo Dashboard (The Hub)

**Files:**
- Create: `frontend/src/screens/DashboardScreen.tsx`
- Create: `frontend/src/components/SharedStreak.tsx`
- Create: `frontend/src/components/DuoHeatmap.tsx`

- [ ] **Step 1: Implement Dashboard UI**
Pull code from Stitch screen `4d962858f83144fbba480e6506ccd213`. 
Ensure the "Shared Streak" flame and "Weekly MVP" card match the design exactly.

- [ ] **Step 2: Integrate with Backend APIs**
Connect the dashboard to `/api/duo/status` and `/api/stats/heatmap`.

- [ ] **Step 3: Commit**
```bash
git add frontend/src/
git commit -m "feat: implement duo dashboard with backend integration"
```

---

### Task 4: Workout Logging & History

**Files:**
- Create: `frontend/src/screens/WorkoutLoggerScreen.tsx`
- Create: `frontend/src/screens/WorkoutHistoryScreen.tsx`

- [ ] **Step 1: Implement Workout Logger**
Pull code from Stitch screen `7ea607c96cf8446cb2e5ef3b36e88566`.

- [ ] **Step 2: Implement Workout History**
Pull code from Stitch screen `679b4d0e000447d4a253be4b698fc204`.

- [ ] **Step 3: Commit**
```bash
git add frontend/src/screens/
git commit -m "feat: add workout logger and history screens"
```
