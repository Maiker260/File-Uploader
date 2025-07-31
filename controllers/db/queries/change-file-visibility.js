import { dbQuery } from "../db-query.js";

export async function changeFileVisibility(id, isPublic) {
    const args = {
        where: { id },
        data: { isPublic },
    };

    await dbQuery("file", "update", args);
}
