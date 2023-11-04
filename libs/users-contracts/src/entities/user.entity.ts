import { z } from 'zod';

export const UserEntity = z.object({
  id: z.number(),
  email: z.string().email(),
});
