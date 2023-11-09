import { z } from 'zod';

export const ConfigSchema = z.object({
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_DATABASE: z.string(),
});
export type TConfigSchema = z.infer<typeof ConfigSchema>;
