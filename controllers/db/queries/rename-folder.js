import { dbQuery } from "../db-query.js";

export async function renameFolderOnDB(id, user) {
    const args = {
        where: {
            id,
        },
        data: { name: "A New Name" },
    };

    await dbQuery("folder", "update", args);
}
