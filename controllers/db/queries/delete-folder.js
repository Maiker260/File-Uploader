import { dbQuery } from "../db-query.js";
import { findFolderOnDB } from "./find-folder.js";

export async function deleteFolderOnDB({ folderId, folderName }, user) {
    const folder = await findFolderOnDB({ id: folderId });

    if (folder.name !== folderName) {
        throw new Error("Folder name does not match.");
    }

    const args = {
        where: {
            id: folderId,
        },
    };

    await dbQuery("folder", "delete", args);
}
