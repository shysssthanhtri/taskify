import { z } from "zod";

import { TeamMemberRoleSchema } from "../inputTypeSchemas/TeamMemberRoleSchema";
import type { TeamWithRelations } from "./TeamSchema";
import { TeamWithRelationsSchema } from "./TeamSchema";
import type { UserWithRelations } from "./UserSchema";
import { UserWithRelationsSchema } from "./UserSchema";

/////////////////////////////////////////
// TEAM MEMBER SCHEMA
/////////////////////////////////////////

export const TeamMemberSchema = z.object({
  role: TeamMemberRoleSchema,
  teamId: z.string(),
  userId: z.string(),
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;

/////////////////////////////////////////
// TEAM MEMBER RELATION SCHEMA
/////////////////////////////////////////

export type TeamMemberRelations = {
  team: TeamWithRelations;
  user: UserWithRelations;
};

export type TeamMemberWithRelations = z.infer<typeof TeamMemberSchema> &
  TeamMemberRelations;

export const TeamMemberWithRelationsSchema: z.ZodType<TeamMemberWithRelations> =
  TeamMemberSchema.merge(
    z.object({
      team: z.lazy(() => TeamWithRelationsSchema),
      user: z.lazy(() => UserWithRelationsSchema),
    }),
  );

export default TeamMemberSchema;
