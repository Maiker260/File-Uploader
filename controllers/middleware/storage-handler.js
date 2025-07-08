import multer from "multer";

export const storageHandler = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "temp_files/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
