import express from "express";
import { createNewFolderOnDB } from "../controllers/db/db-query.js";

const newFolderRouter = express.Router();

newFolderRouter.post("/", async (req, res) => {
    const { folderName } = req.body;

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        createNewFolderOnDB(folderName, req.user);
        res.status(201).json({ message: "Folder created" });
    } catch (err) {
        res.status(500).json({
            message: "Error creating folder",
            error: err.message,
        });
    }
});

export default newFolderRouter;
