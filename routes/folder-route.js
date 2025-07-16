import express from "express";
import { handleFolderOperation } from "../controllers/shared/handle-folder-operation.js";

const foldersRouter = express.Router();

foldersRouter.post("/newFolder", async (req, res) => {
    const data = req.body.data;

    await handleFolderOperation(res, req.user, data, "create");
});

foldersRouter.post("/renameFolder", async (req, res) => {
    const data = req.body.data;

    await handleFolderOperation(res, req.user, data, "rename");
});

foldersRouter.post("/deleteFolder", async (req, res) => {
    const data = req.body.data;

    await handleFolderOperation(res, req.user, data, "delete");
});

export default foldersRouter;
