import { dbQuery } from "../db-query.js";

export async function checkUserDataOnDB(id) {
    const args = {
        where: { id },
        include: {
            folders: {
                include: {
                    isDefault: true,
                    files: true,
                },
            },
        },
    };

    return await dbQuery("user", "find", args);
}
