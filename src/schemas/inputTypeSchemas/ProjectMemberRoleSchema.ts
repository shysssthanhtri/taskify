import { z } from "zod";

export const ProjectMemberRoleSchema = z.enum(["OWNER", "SUPPER_USER", "USER"]);

export type ProjectMemberRoleType =
  `${z.infer<typeof ProjectMemberRoleSchema>}`;

export default ProjectMemberRoleSchema;
