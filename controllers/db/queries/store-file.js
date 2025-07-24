import { dbQuery } from "../db-query.js";

export async function storeFileOnDB(userId, folderId, file) {
    if (!userId || !folderId || !file) {
        throw new Error("Missing required fields for file upload.");
    }

    const { originalname, mimetype, path, size, filename } = file;

    const sizeKB = Math.round(size / 1024);

    const args = {
        data: {
            user: {
                connect: { id: userId },
            },
            folder: {
                connect: { id: folderId },
            },
            originalName: originalname,
            storedName: filename,
            fileType: mimetype,
            fileSize: sizeKB,
            uploadPath: path,
        },
    };

    return await dbQuery("file", "create", args);
}
