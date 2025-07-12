import { dbQuery } from "../db-query.js";

export async function createRegularUserOnDB(userdata) {
    const args = {
        data: userdata,
    };

    return await dbQuery("user", "create", args);
}
