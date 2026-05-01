# Gym Buddy: Phase 1 - Backend Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize the backend environment, define the core PostgreSQL schema via Prisma, and implement the Duo Linking system.

**Architecture:** Node.js Express server with Prisma ORM for type-safe database access. The "Duo" is a first-class entity representing the link between two users.

**Tech Stack:** Node.js, TypeScript, Express, Prisma, PostgreSQL.

---

### Task 1: Backend Setup & Schema Definition

**Files:**
- Create: `backend/package.json`
- Create: `backend/tsconfig.json`
- Create: `backend/prisma/schema.prisma`
- Create: `backend/src/index.ts`

- [ ] **Step 1: Initialize package.json and install dependencies**
```bash
cd /home/bacancy/Desktop/Projects/side/gym-duo/backend
npm init -y
npm install express @prisma/client dotenv cors
npm install --save-dev typescript @types/node @types/express @types/cors ts-node-dev prisma
```

- [ ] **Step 2: Setup tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

- [ ] **Step 3: Define Prisma Schema**
Create `backend/prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  name          String
  inviteCode    String    @unique @default(cuid())
  duoId         String?
  duo           Duo?      @relation(fields: [duoId], references: [id])
  workouts      Workout[]
  steps         StepLog[]
  createdAt     DateTime  @default(now())
}

model Duo {
  id                 String   @id @default(uuid())
  users              User[]
  sharedStreak       Int      @default(0)
  lastStreakUpdate   DateTime @default(now())
  weeklyMvpId        String?
  createdAt          DateTime @default(now())
}

model Workout {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  type      String   // e.g., "Leg Day"
  volume    Float    @default(0) // Total kg lifted
  timestamp DateTime @default(now())
}

model StepLog {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  count     Int
  date      DateTime @default(now())
}
```

- [ ] **Step 4: Commit baseline**
```bash
git add backend/
git commit -m "chore: initial backend setup and schema"
```

---

### Task 2: Duo Invitation API

**Files:**
- Create: `backend/src/routes/duo.ts`
- Modify: `backend/src/index.ts`

- [ ] **Step 1: Implement Invite/Accept Logic**
```typescript
// backend/src/routes/duo.ts snippet
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// Accept an invite code
router.post('/accept', async (req, res) => {
  const { userId, inviteCode } = req.body;
  
  const partner = await prisma.user.findUnique({ where: { inviteCode } });
  if (!partner || partner.duoId) return res.status(400).json({ error: "Invalid invite" });

  const newDuo = await prisma.duo.create({
    data: {
      users: { connect: [{ id: userId }, { id: partner.id }] }
    }
  });

  res.json(newDuo);
});

export default router;
```

- [ ] **Step 2: Verify with a test script**
Create a quick `repro_invite.ts` that uses Prisma to create two users and links them via the API.

- [ ] **Step 3: Commit**
```bash
git add backend/src/routes/duo.ts
git commit -m "feat: add duo invitation logic"
```
