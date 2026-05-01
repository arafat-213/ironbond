import { z } from 'zod';

export const createWorkoutSchema = z.object({
  body: z.object({
    userId: z.string().uuid(),
    type: z.string().min(1),
    weight: z.number().positive(),
    reps: z.number().int().positive()
  })
});

export const getWorkoutHistorySchema = z.object({
  params: z.object({
    userId: z.string().uuid()
  })
});
