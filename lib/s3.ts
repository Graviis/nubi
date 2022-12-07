import { S3 } from "aws-sdk";

const s3bucket = new S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
});

export async function uploadFile(file: string, fileType: string) {
  const post = await s3bucket.createPresignedPost({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Fields: {
      key: file,
      "Content-Type": fileType,
    },
  });

  return post;
}
