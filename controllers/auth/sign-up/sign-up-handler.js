import bcrypt from "bcryptjs";
import { createRegularUserOnDB } from "../../db/db-query.js";

export async function signUpHandler(username, email, password) {
    const securePassword = await bcrypt.hash(password, 10);

    return await createRegularUserOnDB({
        username,
        email,
        password: securePassword,
    });
}
