import { dbQuery } from "../db-query.js";

export async function checkUserDataOnDB(id) {
    const args = {
        where: { id },
        include: {
            folders: {
                include: {
                    files: true,
                    children: {
                        include: {
                            files: true,
                            children: true,
                        },
                    },
                },
            },
        },
    };

    return await dbQuery("user", "find", args);
}
