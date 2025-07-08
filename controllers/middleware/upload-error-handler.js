import multer from "multer";

export function uploadErrorHandler(uploadMiddleware) {
    return (req, res, next) => {
        uploadMiddleware(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                console.error("Multer Error:", err);
                return res.status(400).send("Upload failed: Multer error.");
            } else if (err) {
                console.error("Unknown Error:", err);
                return res.status(500).send("Upload failed: Server error.");
            }

            next();
        });
    };
}
