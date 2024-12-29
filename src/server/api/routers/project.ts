import { type Prisma, ProjectMemberRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { ProjectEntity } from "@/entities/project.entity";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const projectRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object(ProjectEntity.shape).pick({ teamId: true }))
    .query(({ ctx, input }) => {
      return ctx.db.$transaction(async (tx) => {
        const teamRole = await tx.teamMember.findFirst({
          where: {
            userId: ctx.session.user.id,
            teamId: input.teamId,
          },
        });
        if (!teamRole) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }

        const where: Prisma.ProjectWhereInput = {
          teamId: input.teamId,
        };
        if (teamRole.role === "USER") {
          where.members = {
            some: {
              userId: ctx.session.user.id,
            },
          };
        }

        return tx.project.findMany({
          where,
        });
      });
    }),

  create: protectedProcedure
    .input(
      z.object(ProjectEntity.shape).pick({
        name: true,
        icon: true,
        teamId: true,
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.$transaction(async (tx) => {
        const project = await tx.project.create({
          data: input,
        });
        await tx.projectMember.create({
          data: {
            projectId: project.id,
            userId: ctx.session.user.id,
            role: ProjectMemberRole.OWNER,
          },
        });
        return project;
      });
    }),
});
