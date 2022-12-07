declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    AWS_S3_ACCESS_KEY_ID: string;
    AWS_S3_SECRET_KEY: string;
    AWS_S3_BUCKET_NAME: string;
  }
}
