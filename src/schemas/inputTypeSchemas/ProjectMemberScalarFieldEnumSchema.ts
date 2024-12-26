import { z } from "zod";

export const ProjectMemberScalarFieldEnumSchema = z.enum([
  "projectId",
  "userId",
  "role",
]);

export default ProjectMemberScalarFieldEnumSchema;
