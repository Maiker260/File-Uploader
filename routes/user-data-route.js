import express from "express";
import { requireUser } from "../controllers/middleware/auth.js";
import { renderIndexWithFolders } from "../controllers/handlers/renderIndexWithFolders.js";
import { findFileOnDB } from "../controllers/db/queries/find-file.js";
import { getImageUrl } from "../controllers/shared/get-image-url.js";

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

    const imageUrl = await getImageUrl(currentFile); // for viewing
    const downloadUrl = await getImageUrl(currentFile, { forDownload: true }); // for download

    res.render("file-view", {
        currentFile,
        isImage,
        isOwner,
        imageUrl,
        downloadUrl,
    });
});

userDataRouter.get("/file/:id/download", async (req, res) => {
    const currentFile = await findFileOnDB({ id: req.params.id });

    if (!currentFile) return res.redirect("/");

    const isOwner = currentFile.userId === req.user?.id;
    if (!currentFile.isPublic && !isOwner) {
        return res.render("unauthorized");
    }

    const s3Command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: currentFile.uploadPath,
    });

    const s3Response = await s3Conn.send(s3Command);

    res.setHeader(
        "Content-Disposition",
        `attachment; filename="${currentFile.originalName}"`
    );
    res.setHeader("Content-Type", currentFile.fileType);

    s3Response.Body.pipe(res);
});

export default userDataRouter;
