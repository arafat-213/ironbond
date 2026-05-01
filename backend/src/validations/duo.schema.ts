import { z } from 'zod';

export const acceptInviteSchema = z.object({
  body: z.object({
    userId: z.string().uuid(),
    inviteCode: z.string().min(1)
  })
});
