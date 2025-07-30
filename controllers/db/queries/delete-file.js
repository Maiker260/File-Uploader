import { dbQuery } from "../db-query.js";
import { findFileOnDB } from "./find-file.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Conn } from "../../middleware/s3-client.js";

export async function deleteFileOnDB({ itemId, inputValue }, user) {
    const file = await findFileOnDB({ id: itemId });
    const bucketName = process.env.BUCKET_NAME;

    if (inputValue != "DELETE") {
        throw new Error("Type DELETE to continue.");
    }

    if (!file) {
        throw new Error("File can't be found.");
    }

    if (file.userId !== user.id) {
        throw new Error("Unauthorized");
    }

    const args = {
        where: {
            id: file.id,
        },
    };

    const params = {
        Bucket: bucketName,
        Key: file.uploadPath,
    };

    const s3Command = new DeleteObjectCommand(params);

    await s3Conn.send(s3Command);
    await dbQuery("file", "delete", args);
}
