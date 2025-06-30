import express from "express";
import { signUpValidator } from "../controllers/sign-up-form-validator.js";
import { validationResult } from "express-validator";

const signUpRouter = express.Router();

signUpRouter.post("/", signUpValidator, (req, res) => {
    const errors = validationResult(req);
    const { passwordSignUp, passwordConfirmationSignUp, ...oldSignUpInput } =
        req.body;

    if (!errors.isEmpty()) {
        req.session.formErrors = errors.mapped();
        req.session.oldSignUpInput = oldSignUpInput;

        return req.session.save((err) => {
            if (err) console.error(err);
            res.redirect("/auth?mode=sign-up");
        });
    }

    // Need to encrypt the password and add the DB query
    console.log("SIGN-UP COMPLETE");

    // Clear inputs if succeded
    req.session.formErrors = {};
    req.session.oldLoginInput = "";
    req.session.oldSignUpInput = {};

    res.redirect("/");
});

export default signUpRouter;
