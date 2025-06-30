import express from "express";
import { loginValidator } from "../controllers/login-form-validator.js";
import { validationResult } from "express-validator";

const loginRouter = express.Router();

loginRouter.post("/", loginValidator, (req, res) => {
    const errors = validationResult(req);
    const { passwordLogin, userEmailLogin } = req.body;

    if (!errors.isEmpty()) {
        req.session.formErrors = errors.mapped();
        req.session.oldLoginInput = userEmailLogin;

        return req.session.save((err) => {
            if (err) console.error(err);
            res.redirect("/auth?mode=login");
        });
    }

    // Need to encrypt the password and add the DB query
    console.log("LOGIN COMPLETE");

    // Clear inputs if succeded
    req.session.formErrors = {};
    req.session.oldLoginInput = "";
    req.session.oldSignUpInput = {};

    res.redirect("/");
});

export default loginRouter;
