import express from "express";
import { storeFileOnDB } from "../controllers/db/queries/store-file.js";

const uploadRouter = express.Router();

uploadRouter.post("/store-file-metadata", async (req, res) => {
    const { key, name, folderId, mimetype, size } = req.body;
    const userId = req.user.id;

    try {
        const file = {
            originalname: name,
            mimetype: mimetype || "application/octet-stream", // fallback
            size: size || 0,
            filename: key.split("/").pop(),
        };

        await storeFileOnDB(userId, folderId, file, key);
        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Metadata store error:", err);
        res.status(500).json({ error: "Failed to store file metadata." });
    }
});

export default uploadRouter;
