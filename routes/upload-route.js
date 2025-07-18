import express from "express";
import multer from "multer";
import { storageHandler } from "../controllers/middleware/storage-handler.js";
import { uploadErrorHandler } from "../controllers/middleware/upload-error-handler.js";
import { storeFileOnDB } from "../controllers/db/queries/store-file.js";

const uploadRouter = express.Router();
const uploadedFiles = multer({ storage: storageHandler });

uploadRouter.post(
    "/",
    uploadErrorHandler(uploadedFiles.array("uploaded_files")),
    async (req, res) => {
        const files = req.files;
        const { folderId } = req.body;
        const userId = req.user.id;

        try {
            for (const file of files) {
                await storeFileOnDB(userId, folderId, file);
            }

            res.redirect(`/myfiles/${folderId}`);
        } catch (err) {
            console.error("Upload error:", err);
            res.status(500).send("Error uploading file.");
        }
    }
);

export default uploadRouter;
