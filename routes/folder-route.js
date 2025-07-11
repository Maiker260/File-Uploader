import express from "express";
import { handleFolderOperation } from "../controllers/shared/handle-folder-operation.js";

const foldersRouter = express.Router();

foldersRouter.post("/newFolder", (req, res) => {
    const { folderName } = req.body.data;

    handleFolderOperation(res, req.user, folderName, "create");
});

foldersRouter.post("/renameFolder", (req, res) => {
    const { folderId } = req.body.data;

    handleFolderOperation(res, req.user, folderId, "rename");
});

foldersRouter.post("/deleteFolder", (req, res) => {
    const { folderId } = req.body.data;

    handleFolderOperation(res, req.user, folderId, "delete");
});

export default foldersRouter;
