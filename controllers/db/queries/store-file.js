import { dbQuery } from "../db-query.js";

export async function storeFileOnDB(userId, folderId, file) {
    if (!userId || !folderId || !file) {
        throw new Error("Missing required fields for file upload.");
    }
    console.log("Stored");
    const { originalname, mimetype, path, size, filename } = file;

    // Convert size to KB (rounded to 2 decimal places)
    const sizeKB = +(size / 1024).toFixed(2);

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
// NEED TO AVOID STORING THE FILE WITH THE DEFAULT NAME (STORE IT WITH ITS ID BUT SHOW THE ORIGINAL NAME)
// NEED TO AVOID UPLOADING THE FILE IS THERE IS AN ERROR
// NEED TO SHOW THE FILE DETAILS IN THE DASHBOARD
//
