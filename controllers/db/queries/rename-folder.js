import { dbQuery } from "../db-query.js";
import { findFolderOnDB } from "./find-folder.js";

export async function renameFolderOnDB(
    { folderId, folderName, parentId },
    user
) {
    const folder = await findFolderOnDB({ id: folderId });
    const newName = folderName;

    if (!folder) {
        throw new Error("Folder not found");
    }

    if (folder.isDefault) {
        throw new Error("Main Folder can't be renamed.");
    }

    const existing = await findFolderOnDB({
        name: newName,
        userId: user.id,
        parentId: parentId || null,
    });

    if (existing && existing.id !== folderId) {
        throw new Error(
            "A folder with this name already exists in this location."
        );
    }

    const args = {
        where: { id: folderId },
        data: { name: newName },
    };

    await dbQuery("folder", "update", args);
}
