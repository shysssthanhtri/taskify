import { z } from "zod";

import type { ProjectWithRelations } from "./ProjectSchema";
import { ProjectWithRelationsSchema } from "./ProjectSchema";
import type { TeamMemberWithRelations } from "./TeamMemberSchema";
import { TeamMemberWithRelationsSchema } from "./TeamMemberSchema";

/////////////////////////////////////////
// TEAM SCHEMA
/////////////////////////////////////////

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Team = z.infer<typeof TeamSchema>;

/////////////////////////////////////////
// TEAM RELATION SCHEMA
/////////////////////////////////////////

export type TeamRelations = {
  projects: ProjectWithRelations[];
  members: TeamMemberWithRelations[];
};

export type TeamWithRelations = z.infer<typeof TeamSchema> & TeamRelations;

export const TeamWithRelationsSchema: z.ZodType<TeamWithRelations> =
  TeamSchema.merge(
    z.object({
      projects: z.lazy(() => ProjectWithRelationsSchema).array(),
      members: z.lazy(() => TeamMemberWithRelationsSchema).array(),
    }),
  );

export default TeamSchema;
