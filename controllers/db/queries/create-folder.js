import { dbQuery } from "../db-query.js";
import { findFolderOnDB } from "./find-folder.js";

export async function createNewFolderOnDB(name, user) {
    const existing = await findFolderOnDB({ name });

    if (existing) {
        throw new Error(
            "A folder with this name already exists in this location."
        );
    }

    const args = {
        data: {
            name,
            user: {
                connect: {
                    id: user.id,
                },
            },
        },
    };

    return await dbQuery("folder", "create", args);
}
