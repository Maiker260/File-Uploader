import express from "express";
import expressSession from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import prisma from "./controllers/db/prisma.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import dotenv from "dotenv";
import passport from "passport";
import mainRouter from "./routes/main.js";
import authFormRouter from "./routes/auth-form-route.js";
import signUpRouter from "./routes/sign-up-route.js";
import loginRouter from "./routes/login-route.js";
import logoutRouter from "./routes/log-out-route.js";
import uploadRouter from "./routes/upload-route.js";
import foldersRouter from "./routes/folder-route.js";
import { loginAuthenticator } from "./controllers/auth/login/login-authenticator.js";
import {
    serialize,
    deserialize,
} from "./controllers/auth/login/passport-session.js";

await prisma.$connect();
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// Prisma Session Store
app.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        },
        store: new PrismaSessionStore(prisma, {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
            sessionModelName: "session",
        }),
    })
);

app.use(passport.session());
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);
passport.use(
    new LocalStrategy(
        {
            usernameField: "userEmailLogin",
            passwordField: "passwordLogin",
        },
        loginAuthenticator
    )
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", mainRouter);
app.use("/auth", authFormRouter);
app.use("/sign-up", signUpRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/upload", uploadRouter);
app.use("/folders", foldersRouter);

app.listen("3000", () => {
    console.log("App running on Port 3000");
});
