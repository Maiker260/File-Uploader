import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3Conn } from "../middleware/s3-client.js";

export async function getBucketSize() {
    const bucketName = process.env.BUCKET_NAME;

    let totalSize = 0;
    let continuationToken;

    do {
        const listCommand = new ListObjectsV2Command({
            Bucket: bucketName,
            ContinuationToken: continuationToken,
        });
        const result = await s3Conn.send(listCommand);

        result.Contents?.forEach((obj) => {
            totalSize += obj.Size;
        });

        continuationToken = result.IsTruncated
            ? result.NextContinuationToken
            : null;
    } while (continuationToken);

    return totalSize;
}
