import { dbQuery } from "../db-query.js";

export async function createNewFolderOnDB(name, user) {
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
