import { S3Client } from "@aws-sdk/client-s3";

const bucketRegion = process.env.BUCKET_REGION;
const bucketAccessKeyId = process.env.ACCESS_KEY;
const bucketSecretAccessKey = process.env.SECRET_ACCESS_KEY;

export const s3Conn = new S3Client({
    credentials: {
        accessKeyId: bucketAccessKeyId,
        secretAccessKey: bucketSecretAccessKey,
    },
    region: bucketRegion,
});
