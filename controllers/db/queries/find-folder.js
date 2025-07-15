import { dbQuery } from "../db-query.js";

export async function findFolderOnDB(data) {
    const args = {
        where: data,
    };

    return await dbQuery("folder", "find", args);
}
