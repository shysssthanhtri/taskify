import { z } from "zod";

import ProjectSchema from "@/schemas/modelSchema/ProjectSchema";

export const ProjectEntity = z.object(ProjectSchema.shape).extend({
  name: z.string().min(5).max(30),
});
export type TProjectEntity = z.infer<typeof ProjectEntity>;
