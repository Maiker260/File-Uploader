import { createNewFolderOnDB } from "../db/queries/create-new-folder.js";
import { renameFolderOnDB } from "../db/queries/rename-folder.js";
import { deleteFolderOnDB } from "../db/queries/delete-folder.js";
import { deleteFileOnDB } from "../db/queries/delete-file.js";

export async function handleItemOperation(
    res,
    user,
    data,
    request,
    isFile = null
) {
    const fileType = isFile ? "ile" : "older";

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const actions = {
        create: createNewFolderOnDB,
        rename: renameFolderOnDB,
        delete: deleteFolderOnDB,
    };

    try {
        if (isFile) {
            await deleteFileOnDB(data, user);
        } else {
            await actions[request]?.(data, user);
        }

        if (!data.isDefault) {
            res.status(201).json({ message: `F${fileType} ${request}d` });
        }
    } catch (err) {
        let formatedName;

        if (request == "find") {
            formatedName = "finding";
        } else {
            formatedName = request.slice(0, -1) + "ing";
        }

        res.status(400).json({
            message: err.message || `Error ${formatedName} f${fileType}`,
        });
    }
}
