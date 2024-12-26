import { z } from "zod";

export const TeamScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "icon",
  "createdAt",
  "updatedAt",
]);

export default TeamScalarFieldEnumSchema;
