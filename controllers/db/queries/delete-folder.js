import { dbQuery } from "../db-query.js";

export async function deleteFolderOnDB(id, user) {
    const args = {
        where: {
            id,
        },
    };

    await dbQuery("folder", "delete", args);
}
