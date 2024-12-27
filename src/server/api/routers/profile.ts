import { z } from "zod";

import { UserEntity } from "@/entities/user.entity";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const profileRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findFirstOrThrow({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),

  update: protectedProcedure
    .input(
      z.object(UserEntity.shape).pick({
        name: true,
        alias: true,
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: input,
      });
    }),
});
