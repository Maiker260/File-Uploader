import bcrypt from "bcryptjs";
import { findUser } from "../../db/db-query.js";

export async function loginAuthenticator(
    emailOrUsername,
    plainTextPassword,
    done
) {
    // Check for email format
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUsername);

    const user = isEmail
        ? await findUser({ email: emailOrUsername })
        : await findUser({ username: emailOrUsername.toLowerCase() });

    if (!user || !(await bcrypt.compare(plainTextPassword, user.password))) {
        return done(null, false, {
            message: "Incorrect Username or Password",
        });
    }

    return done(null, user);
}
