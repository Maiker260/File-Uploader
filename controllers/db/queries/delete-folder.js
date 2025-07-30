import { dbQuery } from "../db-query.js";
import { findFolderOnDB } from "./find-folder.js";

export async function deleteFolderOnDB({ folderId, folderName }, user) {
    const folder = await findFolderOnDB({ id: folderId });

    if (folderName != "DELETE") {
        throw new Error("Type DELETE to continue.");
    }

    if (folder.isDefault) {
        throw new Error("Main Folder can't be deleted.");
    }

    if (folder.files.length > 0 || folder.children.length > 0) {
        throw new Error("Folder is not empty.");
    }

    const args = {
        where: {
            id: folderId,
        },
    };

    await dbQuery("folder", "delete", args);
}
