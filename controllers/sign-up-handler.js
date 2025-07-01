import bcrypt from "bcryptjs";
import { createRegularUser } from "./db-query.js";

export async function signUpHandler(username, email, password) {
    const securePassword = await bcrypt.hash(password, 10);

    return await createRegularUser({
        username,
        email,
        password: securePassword,
    });
}
