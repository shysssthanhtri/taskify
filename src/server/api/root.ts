import { permissionRouter } from "@/server/api/routers/permission";
import { profileRouter } from "@/server/api/routers/profile";
import { projectRouter } from "@/server/api/routers/project";
import { teamRouter } from "@/server/api/routers/team";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  profile: profileRouter,
  team: teamRouter,
  project: projectRouter,
  permission: permissionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
