import bcrypt from "bcryptjs";
import { findUserOnDB } from "../../db/queries/find-user.js";

export async function loginAuthenticator(
    emailOrUsername,
    plainTextPassword,
    done
) {
    // Check for email format
    emailOrUsername = emailOrUsername.trim().toLowerCase();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUsername);

    const user = isEmail
        ? await findUserOnDB({ email: emailOrUsername })
        : await findUserOnDB({ username: emailOrUsername });

    if (!user || !(await bcrypt.compare(plainTextPassword, user.password))) {
        return done(null, false, {
            message: "Incorrect Username or Password",
        });
    }

    return done(null, user);
}
