import express from "express";
import { handleItemOperation } from "../controllers/shared/handle-item-operation.js";
import { changeFileVisibility } from "../controllers/db/queries/change-file-visibility.js";

const fileRouter = express.Router();

fileRouter.post("/", (req, res) => {
    res.redirect("/");
});

fileRouter.post("/visibility", async (req, res) => {
    const isFilePublic = req.body.changeFileVisibility === "true";
    const fileId = req.body.shareFileDataId;

    try {
        await changeFileVisibility(fileId, isFilePublic);

        const referer = req.get("Referer") || "/";
        res.redirect(referer);
    } catch (err) {
        console.error("Error updating visibility:", err);
        res.status(500).send("Failed to update file visibility.");
    }
});

fileRouter.post("/delete", async (req, res) => {
    const data = req.body.data;

    await handleItemOperation(res, req.user, data, "delete", true);
});

export default fileRouter;
