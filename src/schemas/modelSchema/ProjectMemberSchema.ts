import { z } from "zod";

import { ProjectMemberRoleSchema } from "../inputTypeSchemas/ProjectMemberRoleSchema";
import type { ProjectWithRelations } from "./ProjectSchema";
import { ProjectWithRelationsSchema } from "./ProjectSchema";
import type { UserWithRelations } from "./UserSchema";
import { UserWithRelationsSchema } from "./UserSchema";

/////////////////////////////////////////
// PROJECT MEMBER SCHEMA
/////////////////////////////////////////

export const ProjectMemberSchema = z.object({
  role: ProjectMemberRoleSchema,
  projectId: z.string(),
  userId: z.string(),
});

export type ProjectMember = z.infer<typeof ProjectMemberSchema>;

/////////////////////////////////////////
// PROJECT MEMBER RELATION SCHEMA
/////////////////////////////////////////

export type ProjectMemberRelations = {
  project: ProjectWithRelations;
  user: UserWithRelations;
};

export type ProjectMemberWithRelations = z.infer<typeof ProjectMemberSchema> &
  ProjectMemberRelations;

export const ProjectMemberWithRelationsSchema: z.ZodType<ProjectMemberWithRelations> =
  ProjectMemberSchema.merge(
    z.object({
      project: z.lazy(() => ProjectWithRelationsSchema),
      user: z.lazy(() => UserWithRelationsSchema),
    }),
  );

export default ProjectMemberSchema;
