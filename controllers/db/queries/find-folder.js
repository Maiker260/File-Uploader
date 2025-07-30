import { dbQuery } from "../db-query.js";

export async function findFolderOnDB(data) {
    const args = {
        where: data,
        include: {
            files: true,
            children: true,
        },
    };

    return await dbQuery("folder", "find", args);
}
