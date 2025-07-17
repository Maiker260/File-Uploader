import { dbQuery } from "../db-query.js";
import { findFolderOnDB } from "./find-folder.js";

export async function createNewFolderOnDB(data, user) {
    const { folderName, isDefault, placeIn } = data;
    const parentId = placeIn;

    // If no explicit parentId, fallback to folderId
    const resolvedParentId = parentId || null;

    const existing = await findFolderOnDB({
        userId: user.id,
        name: folderName,
        parentId: resolvedParentId,
    });

    if (existing) {
        throw new Error(
            "A folder with this name already exists in this location."
        );
    }

    const args = {
        data: {
            name: folderName,
            isDefault: isDefault || false,
            user: {
                connect: { id: user.id },
            },
            ...(resolvedParentId && {
                parent: {
                    connect: { id: resolvedParentId },
                },
            }),
        },
    };

    return await dbQuery("folder", "create", args);
}
