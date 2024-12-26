import { z } from "zod";

export const TeamMemberRoleSchema = z.enum(["OWNER", "SUPPER_USER", "USER"]);

export type TeamMemberRoleType = `${z.infer<typeof TeamMemberRoleSchema>}`;

export default TeamMemberRoleSchema;
