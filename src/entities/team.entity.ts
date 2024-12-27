import { z } from "zod";

import TeamSchema from "@/schemas/modelSchema/TeamSchema";

export const TeamEntity = z.object(TeamSchema.shape).extend({
  name: z.string().min(5).max(30),
});
export type TTeamEntity = z.infer<typeof TeamEntity>;
