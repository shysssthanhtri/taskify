import { S3Client } from "@aws-sdk/client-s3";
import { type User } from "@prisma/client";

import { env } from "@/env";

// Initialize the S3 client
export const s3Client = new S3Client({
  region: env.AWS_REGION, // Replace with your region
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY, // Optional if you have environment credentials
    secretAccessKey: env.AWS_SECRET_KEY, // Optional if you have environment credentials
  },
});

export const getUrl = (key: string) => {
  return `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${key}`;
};

export const profileKey = (useId: User["id"]) => {
  return `${useId}/profiles`;
};

export const isS3Url = (url?: string | null) => {
  return url?.startsWith(
    `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/`,
  );
};

export const getKeyFromUrl = (url?: string | null): string => {
  return (
    url?.split(
      `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/`,
    )[1] ?? ""
  );
};
