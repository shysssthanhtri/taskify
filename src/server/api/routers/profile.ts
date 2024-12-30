import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";

import { UserEntity } from "@/entities/user.entity";
import { env } from "@/env";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  getKeyFromUrl,
  getUrl,
  isS3Url,
  profileKey,
  s3Client,
} from "@/server/services/s3.service";

export const profileRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findFirstOrThrow({
      where: {
        id: ctx.session.user.id,
      },
    });

    user.image = isS3Url(user.image)
      ? await (async () => {
          const command = new GetObjectCommand({
            Bucket: env.AWS_S3_BUCKET,
            Key: getKeyFromUrl(user.image),
          });
          return getSignedUrl(s3Client, command, {
            expiresIn: 60,
          });
        })()
      : user.image;

    return user;
  }),

  update: protectedProcedure
    .input(
      z.object(UserEntity.shape).pick({
        name: true,
        alias: true,
        image: true,
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

  getUploadImageUrl: protectedProcedure
    .input(z.object({ contentType: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const key = profileKey(ctx.session.user.id);

      const command = new PutObjectCommand({
        Bucket: env.AWS_S3_BUCKET,
        Key: key,
        ContentType: input.contentType,
      });

      const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 60,
      });

      return {
        uploadUrl: signedUrl,
        actualUrl: getUrl(key),
      };
    }),
});
