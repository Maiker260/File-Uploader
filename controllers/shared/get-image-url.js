import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Conn } from "../middleware/s3-client.js";

export async function getImageUrl(file) {
    const bucketName = process.env.BUCKET_NAME;

    const getObjectParams = {
        Bucket: bucketName,
        Key: file.uploadPath,
        ResponseContentDisposition: `attachment; filename="${file.originalName}"`,
    };

    const command = new GetObjectCommand(getObjectParams);
    return await getSignedUrl(s3Conn, command, { expiresIn: 3600 });
}
