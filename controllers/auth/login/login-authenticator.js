import bcrypt from "bcryptjs";
import { findUser } from "../../db/db-query.js";

export async function loginAuthenticator(userLogin, passwordLogin, done) {
    // Check for email format
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userLogin);
    console.log("login");
    const user = isEmail
        ? findUser({ email: userLogin })
        : findUser({ username: userLogin.toLowerCase() });

    if (!user || !(await bcrypt.compare(passwordLogin, user.password))) {
        return done(null, false, {
            message: "Incorrect Username or Password",
        });
    }

    return done(null, user);
}
