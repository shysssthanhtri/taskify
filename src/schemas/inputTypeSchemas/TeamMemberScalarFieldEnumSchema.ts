import { z } from "zod";

export const TeamMemberScalarFieldEnumSchema = z.enum([
  "teamId",
  "userId",
  "role",
]);

export default TeamMemberScalarFieldEnumSchema;
