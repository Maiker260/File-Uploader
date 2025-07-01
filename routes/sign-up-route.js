import express from "express";
import { signUpValidator } from "../controllers/sign-up-form-validator.js";
import { validationResult } from "express-validator";
import { signUpHandler } from "../controllers/sign-up-handler.js";
import { clearInputs } from "../controllers/clear-inputs.js";
import { setSessionErrors } from "../controllers/session-errors.js";

const signUpRouter = express.Router();

signUpRouter.post("/", signUpValidator, async (req, res) => {
    const errors = validationResult(req);
    const {
        passwordSignUp,
        passwordConfirmationSignUp,
        usernameSignUp,
        emailSignUp,
        ...otherInput
    } = req.body;

    const username = usernameSignUp?.toLowerCase() || "";
    const email = emailSignUp?.toLowerCase() || "";

    if (!errors.isEmpty()) {
        await setSessionErrors(req, {
            errors: errors.mapped(),
            input: {
                ...otherInput,
                usernameSignUp: username,
                emailSignUp: email,
            },
        });
        res.redirect("/auth?mode=sign-up");
    }

    try {
        await signUpHandler(username, email, passwordSignUp);
    } catch (err) {
        console.error("Signup failed:", err);
        await setSessionErrors(req, {
            errors: { general: { msg: "Something went wrong. Try again." } },
            input: {
                ...otherInput,
                usernameSignUp: username,
                emailSignUp: email,
            },
        });
        return res.redirect("/auth?mode=sign-up");
    }

    // Clear inputs if succeded
    clearInputs(req);

    res.redirect("/");
});

export default signUpRouter;
