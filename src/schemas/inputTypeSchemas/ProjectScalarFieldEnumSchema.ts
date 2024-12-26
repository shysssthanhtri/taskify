import { z } from "zod";

export const ProjectScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "icon",
  "teamId",
  "createdAt",
  "updatedAt",
]);

export default ProjectScalarFieldEnumSchema;
