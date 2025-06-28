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
        req.session.shouldClear = true;

        return res.redirect("/auth?mode=sign-up");
    }

    console.log("SIGN UP");
    res.redirect("/");
});

export default signUpRouter;
