import { z } from "zod";

import { ProjectEntity } from "@/entities/project.entity";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const permissionRouter = createTRPCRouter({
  checkUserCanAccessProject: protectedProcedure
    .input(z.object(ProjectEntity.shape).pick({ id: true, teamId: true }))
    .query(({ ctx, input }) => {
      return ctx.db.$transaction(async (tx) => {
        const project = await tx.project.findFirst({
          include: { members: { where: { userId: ctx.session.user.id } } },
          where: { id: input.id, teamId: input.teamId },
        });
        if (!project) return false;

        const teamMember = await tx.teamMember.findFirst({
          where: {
            userId: ctx.session.user.id,
            teamId: project.teamId,
          },
        });
        if (!teamMember) return false;

        if (teamMember.role !== "USER") return true;
        return !!project.members.length;
      });
    }),
});
