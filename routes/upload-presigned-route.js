import express from "express";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { s3Conn } from "../controllers/middleware/s3-client.js";
import { getBucketSize } from "../controllers/handlers/get-bucket-size.js";

const generateUploadUrlRouter = express.Router();

const BUCKET_SIZE_LIMIT = Math.floor(4.9 * 1024 * 1024 * 1024); // 4.90GB in bytes

// HAD TO MODIFY THE CODE TO AVOID CHARGES IN AWS WITH S3
generateUploadUrlRouter.post("/", async (req, res) => {
    const { filename, filetype, folderId, filesize } = req.body;
    const userId = req.user.id;
    const bucketName = process.env.BUCKET_NAME;

    try {
        // 1. Get total bucket size
        const totalSize = await getBucketSize();

        // 2. Check if bucket can fit this new file
        if (totalSize + Number(filesize) > BUCKET_SIZE_LIMIT) {
            return res
                .status(400)
                .json({ error: "Bucket is full (4.90GB limit exceeded)." });
        }

        // 3. Generate unique S3 key
        const ext = path.extname(filename);
        const uniqueName = uuidv4() + ext;
        const s3Key = `uploads/${userId}/${uniqueName}`;

        // 4. Generate pre-signed URL
        const putCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: s3Key,
            ContentType: filetype,
        });

        const url = await getSignedUrl(s3Conn, putCommand, { expiresIn: 300 }); // 5 minutes

        res.json({ url, key: s3Key, name: filename, folderId });
    } catch (err) {
        console.error("Error generating upload URL:", err);
        res.status(500).json({ error: "Failed to generate upload URL." });
    }
});

export default generateUploadUrlRouter;
