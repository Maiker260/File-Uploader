import express from "express";
import { loginValidator } from "../controllers/login-form-validator.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { clearInputs } from "../controllers/clear-inputs.js";

const loginRouter = express.Router();

loginRouter.post("/", loginValidator, async (req, res) => {
    const errors = validationResult(req);
    const { passwordLogin, userEmailLogin } = req.body;
    const formatedUsername = userEmailLogin.toLowerCase();

    if (!errors.isEmpty()) {
        req.session.formErrors = errors.mapped();
        req.session.oldLoginInput = userEmailLogin;

        return req.session.save((err) => {
            if (err) console.error(err);
            res.redirect("/auth?mode=login");
        });
    }

    const securePassword = bcrypt.compare();
    console.log(formatedUsername);

    // Need to encrypt the password and add the DB query
    console.log("LOGIN COMPLETE");

    // Clear inputs if succeded
    clearInputs(req);

    res.redirect("/");
});

export default loginRouter;
