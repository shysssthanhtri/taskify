import { z } from "zod";

import type { ProjectMemberWithRelations } from "./ProjectMemberSchema";
import { ProjectMemberWithRelationsSchema } from "./ProjectMemberSchema";
import type { TeamWithRelations } from "./TeamSchema";
import { TeamWithRelationsSchema } from "./TeamSchema";

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().nullish(),
  teamId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Project = z.infer<typeof ProjectSchema>;

/////////////////////////////////////////
// PROJECT RELATION SCHEMA
/////////////////////////////////////////

export type ProjectRelations = {
  team: TeamWithRelations;
  members: ProjectMemberWithRelations[];
};

export type ProjectWithRelations = z.infer<typeof ProjectSchema> &
  ProjectRelations;

export const ProjectWithRelationsSchema: z.ZodType<ProjectWithRelations> =
  ProjectSchema.merge(
    z.object({
      team: z.lazy(() => TeamWithRelationsSchema),
      members: z.lazy(() => ProjectMemberWithRelationsSchema).array(),
    }),
  );

export default ProjectSchema;
