import express from "express";
import multer from "multer";
import { storageHandler } from "../controllers/middleware/storage-handler.js";
import { uploadErrorHandler } from "../controllers/middleware/upload-error-handler.js";

const uploadRouter = express.Router();
const uploadedFiles = multer({ storage: storageHandler });

uploadRouter.post(
    "/",
    uploadErrorHandler(uploadedFiles.array("uploaded_files")),
    (req, res) => {
        const files = req.files;

        console.log(files);

        console.log("File Uploaded successfully");
        res.redirect("/");
    }
);

export default uploadRouter;
