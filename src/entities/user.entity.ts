import { z } from "zod";

import UserSchema from "@/schemas/modelSchema/UserSchema";

export const UserEntity = z.object(UserSchema.shape).extend({
  name: z.string().min(5).max(30).nullish(),
  email: z.string().email().nullish(),
  alias: z.string().min(1).max(2).nullish(),
});
export type TUserEntity = z.infer<typeof UserEntity>;
