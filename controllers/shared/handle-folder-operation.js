import { createNewFolderOnDB } from "../db/queries/create-folder.js";
import { renameFolderOnDB } from "../db/queries/rename-folder.js";
import { deleteFolderOnDB } from "../db/queries/delete-folder.js";

export async function handleFolderOperation(res, user, data, request) {
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const actions = {
        create: createNewFolderOnDB,
        rename: renameFolderOnDB,
        delete: deleteFolderOnDB,
    };

    try {
        if (request == "rename") {
            await actions[request]?.(data, user);
        } else {
            await actions[request]?.(data, user);
        }
        res.status(201).json({ message: `Folder ${request}d` });
    } catch (err) {
        const formatedName = request.slice(0, -1) + "ing";

        res.status(500).json({
            message: `Error ${formatedName} folder`,
            error: err.message,
        });
    }
}
