# Gym Buddy: Design Prompt for Google Stitch

**Project:** Gym Buddy (Duo Hub)
**Concept:** A collaborative, gamified gym app for partners/couples.
**Visual Style:** Modern, energetic, dark-mode friendly (neon accents), focused on "Progress Visuals" (Heatmaps, Progress Bars).

---

## 1. Onboarding & Duo Link
*   **Screen:** `OnboardingFlow`
    *   **Content:** App value proposition (Shared Streaks, Weekly MVP).
    *   **Action:** Button to "Create Duo" or "Join Duo".
*   **Screen:** `InvitePartner`
    *   **Content:** Display unique Invite Code. "Share" button.
    *   **Input:** "Enter Partner's Code" field.

## 2. The Duo Dashboard (Primary Screen)
*   **Screen:** `DuoDashboard`
    *   **Hero Section:** Large "Shared Streak" Flame icon with number (e.g., 🔥 12). Status text: "Partner finished their workout! Your turn."
    *   **MVP Card:** High-impact card showing the current "Weekly MVP" with a crown icon and their name.
    *   **Dual Heatmaps:** Two side-by-side human silhouettes (front/back) showing muscle training intensity for "Me" vs "Partner".
    *   **Step Rivalry:** Small horizontal bar chart comparing today's step counts.

## 3. Workout Logging
*   **Screen:** `WorkoutLogger`
    *   **Content:** Search/Select Exercise list.
    *   **Input Section:** Inputs for Weight (kg) and Reps. "Add Set" button.
    *   **Summary:** List of current workout sets. "Finish & Sync Duo" button.

## 4. History & Visualization
*   **Screen:** `WorkoutHistory`
    *   **Content:** Timeline of past workouts. Each entry shows type, date, and total volume.
*   **Screen:** `MuscleDeepDive` (Detailed Heatmap)
    *   **Content:** Enlarged heatmap view. Tapping a muscle shows training volume stats for that specific group over the last 7 days.

## 5. Competition & Leaderboards
*   **Screen:** `PassiveRivalry` (Steps)
    *   **Content:** Detailed daily step chart. "MVP Points" breakdown (how steps contribute to the weekly crown).

---

## Technical Constraints for Stitch:
- Design for **Mobile (iOS/Android)**.
- Use **Tab Navigation** (Home, Workout, Stats, Profile).
- Ensure high contrast for readability in the gym.
- Incorporate "Positive Nudge" UI elements (High-fives, Celebration animations).
