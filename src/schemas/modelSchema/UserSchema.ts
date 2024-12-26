import { z } from "zod";

import type { AccountWithRelations } from "./AccountSchema";
import { AccountWithRelationsSchema } from "./AccountSchema";
import type { PostWithRelations } from "./PostSchema";
import { PostWithRelationsSchema } from "./PostSchema";
import type { ProjectMemberWithRelations } from "./ProjectMemberSchema";
import { ProjectMemberWithRelationsSchema } from "./ProjectMemberSchema";
import type { SessionWithRelations } from "./SessionSchema";
import { SessionWithRelationsSchema } from "./SessionSchema";
import type { TeamMemberWithRelations } from "./TeamMemberSchema";
import { TeamMemberWithRelationsSchema } from "./TeamMemberSchema";

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// USER RELATION SCHEMA
/////////////////////////////////////////

export type UserRelations = {
  accounts: AccountWithRelations[];
  sessions: SessionWithRelations[];
  posts: PostWithRelations[];
  teams: TeamMemberWithRelations[];
  projects: ProjectMemberWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations;

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> =
  UserSchema.merge(
    z.object({
      accounts: z.lazy(() => AccountWithRelationsSchema).array(),
      sessions: z.lazy(() => SessionWithRelationsSchema).array(),
      posts: z.lazy(() => PostWithRelationsSchema).array(),
      teams: z.lazy(() => TeamMemberWithRelationsSchema).array(),
      projects: z.lazy(() => ProjectMemberWithRelationsSchema).array(),
    }),
  );

export default UserSchema;
