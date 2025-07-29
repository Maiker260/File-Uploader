import express from "express";
import multer from "multer";
import { uploadErrorHandler } from "../controllers/middleware/upload-error-handler.js";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { s3Conn } from "../controllers/middleware/s3-client.js";
import { storeFileOnDB } from "../controllers/db/queries/store-file.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const uploadRouter = express.Router();
const storageHandler = multer.memoryStorage();
const uploadedFiles = multer({ storage: storageHandler });

uploadRouter.post(
    "/",
    uploadErrorHandler(uploadedFiles.array("uploaded_files")),
    async (req, res) => {
        const files = req.files;
        const { folderId } = req.body;
        const userId = req.user.id;
        const bucketName = process.env.BUCKET_NAME;

        try {
            for (const file of files) {
                const ext = path.extname(file.originalname);
                const uniqueName = uuidv4() + ext;
                file.filename = uniqueName;

                const s3Key = `uploads/${userId}/${uniqueName}`;

                const params = {
                    Bucket: bucketName,
                    Key: s3Key,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                };

                const s3Command = new PutObjectCommand(params);

                await s3Conn.send(s3Command);
                await storeFileOnDB(userId, folderId, file, s3Key);
            }

            res.redirect(`/myfiles/${folderId}`);
        } catch (err) {
            console.error("Upload error:", err);

            if (!res.headersSent) {
                res.status(500).send("Error uploading file.");
            }
        }
    }
);

export default uploadRouter;
