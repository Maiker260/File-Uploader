import { dbQuery } from "../db-query.js";

export async function findUserOnDB({ username, email, id }) {
    const whereClause = {};

    if (username) whereClause.username = username;
    if (email) whereClause.email = email;
    if (id) whereClause.id = id;

    return await dbQuery("user", "find", { where: whereClause });
}
