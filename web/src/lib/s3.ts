import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3 = new S3Client({
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

export async function presignPut(key: string, contentType: string, expiresInSec = 600) {
  const cmd = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: key,
    ContentType: contentType,

  });
  return getSignedUrl(s3, cmd, { expiresIn: expiresInSec });
}

export function publicUrlFor(key: string) {
  const base = process.env.S3_PUBLIC_BASE!;
  return `${base}/${key}`;
}
