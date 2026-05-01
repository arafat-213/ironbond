# IronBond 🏋️‍♂️💪

IronBond is a collaborative fitness tracking application designed fundamentally for partners and couples. It transforms individual workout tracking into a shared accountability system where your progress directly impacts your partner's experience.

## 🌟 Vision
The "soul" of IronBond lies in its collaborative experience. By creating a shared accountability system, IronBond aims to solve the "motivation gap." Your fitness journey is no longer a solo effort—it's a duo mission.

## ✨ Core Features

### 🔗 The Duo Connection
Connect with a partner via a unique invite code to form a "Duo." Once linked, you gain full visibility into each other's workout logs and progress, fostering a culture of mutual encouragement and accountability.

### 🔥 Shared Streak
The ultimate accountability engine. Your Duo's streak only increments if **both** partners complete their daily fitness goal (workout or step target). If one person misses a day, the streak resets for both. *Don't let your partner down!*

### 🏆 Weekly MVP
A friendly internal rivalry. A weighted score based on workout volume, consistency, and steps crowns one partner as the "Weekly MVP" for the Duo Dashboard.

### 📊 Muscle Heatmap
Visualize your training volume with a muscle heatmap that "lights up" based on your activity over the last 7 days. Compare your heatmap side-by-side with your partner's on the Duo Dashboard.

### 👟 Passive Step Rivalry
Always-on background step tracking via health integrations, featuring a daily leaderboard to see who's leading the Duo in movement.

## 🛠 Tech Stack

### Frontend
- **Framework:** [Expo](https://expo.dev/) / [React Native](https://reactnative.dev/)
- **Icons:** [Lucide React Native](https://lucide.dev/)
- **Fonts:** Inter, Lexend
- **Navigation:** React Navigation

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express](https://expressjs.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL (managed via Prisma)
- **Validation:** [Zod](https://zod.dev/)
- **Scheduling:** [node-cron](https://www.npmjs.com/package/node-cron)

## 📁 Project Structure

```
gym-duo/
├── backend/            # Express API, Prisma schema, and Cron jobs
│   ├── src/
│   │   ├── routes/     # API Endpoints (Duo, Workout, Stats, Steps)
│   │   ├── services/   # Business Logic (Streak, MVP, Heatmap)
│   │   ├── jobs/       # Scheduled tasks (Cron)
│   │   └── lib/        # Shared clients (Prisma)
│   └── prisma/         # Database schema
├── frontend/           # Expo Mobile Application
│   ├── src/
│   │   ├── screens/    # App Screens (Dashboard, Logger, History)
│   │   ├── components/ # Reusable UI components
│   │   ├── navigation/ # Navigation configuration
│   │   └── theme/      # Visual design system
└── specs/              # Design specifications and prompts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- PostgreSQL (or another Prisma-supported DB)
- Expo Go app (for mobile testing)

### Backend Setup
1. Navigate to the backend directory:
   ``bash
   cd backend
   ``
2. Install dependencies:
   ``bash
   npm install
   ``
3. Set up your environment variables (create a `.env` file):
   ``env
   DATABASE_URL="postgresql://user:password@localhost:5432/ironbond"
   ``
4. Run Prisma migrations:
   ``bash
   npx prisma migrate dev
   ``
5. Start the development server:
   ``bash
   npm run dev
   ``

### Frontend Setup
1. Navigate to the frontend directory:
   ``bash
   cd frontend
   ``
2. Install dependencies:
   ``bash
   npm install
   ``
3. Start the Expo development server:
   ``bash
   npm start
   ``
4. Open the app via Expo Go on your mobile device or use an emulator.

## 📜 License
This project is licensed under the ISC License - see the `backend/package.json` for details.
