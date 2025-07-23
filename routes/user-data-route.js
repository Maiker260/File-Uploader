import express from "express";
import { requireUser } from "../controllers/middleware/auth.js";
import { renderIndexWithFolders } from "../controllers/handlers/renderIndexWithFolders.js";
import { findFileOnDB } from "../controllers/db/queries/find-file.js";

const userDataRouter = express.Router();

userDataRouter.get("/", requireUser, renderIndexWithFolders());

userDataRouter.get(
    "/:id",
    requireUser,
    renderIndexWithFolders((req) => req.params.id)
);

userDataRouter.get("/file/:id", async (req, res) => {
    const currentFile = await findFileOnDB({ id: req.params.id });

    if (!currentFile) {
        return res.redirect("/");
    }

    const allowedImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
    ];
    const isImage = allowedImageTypes.includes(currentFile.fileType);
    const isOwner = currentFile.userId === req.user?.id;

    if (!currentFile.isPublic && !isOwner) {
        return res.render("unauthorized");
    }

    res.render("file-view", { currentFile, isImage, isOwner });
});

export default userDataRouter;
