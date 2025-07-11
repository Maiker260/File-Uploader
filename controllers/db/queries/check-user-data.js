import { dbQuery } from "../db-query.js";

export async function checkUserDataOnDB(id) {
    const args = {
        where: { id },
        include: {
            folders: {
                include: {
                    children: true,
                    files: true,
                },
            },
        },
    };

    await dbQuery("user", "find", args);
}
