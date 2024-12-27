import { TeamMemberRole } from "@prisma/client";
import { z } from "zod";

import { TeamEntity } from "@/entities/team.entity";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const teamRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => {
    return ctx.db.team.findMany({
      where: {
        members: {
          some: {
            userId: ctx.session.user.id,
          },
        },
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object(TeamEntity.shape).pick({
        name: true,
        icon: true,
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.$transaction(async (tx) => {
        const team = await tx.team.create({
          data: input,
        });
        await tx.teamMember.create({
          data: {
            teamId: team.id,
            userId: ctx.session.user.id,
            role: TeamMemberRole.OWNER,
          },
        });
        return team;
      });
    }),
});
