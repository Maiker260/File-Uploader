import express from "express";
import { handleItemOperation } from "../controllers/shared/handle-item-operation.js";

const foldersRouter = express.Router();

foldersRouter.post("/newFolder", async (req, res) => {
    const data = req.body.data;

    await handleItemOperation(res, req.user, data, "create");
});

foldersRouter.post("/renameFolder", async (req, res) => {
    const data = req.body.data;

    await handleItemOperation(res, req.user, data, "rename");
});

foldersRouter.post("/deleteFolder", async (req, res) => {
    const data = req.body.data;

    await handleItemOperation(res, req.user, data, "delete");
});

export default foldersRouter;
