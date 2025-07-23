import { dbQuery } from "../db-query.js";

export async function findFileOnDB(data) {
    const args = {
        where: data,
    };

    return await dbQuery("file", "find", args);
}
