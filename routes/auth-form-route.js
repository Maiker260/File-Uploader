import express from "express";
import {
    loginInputs,
    signUpInputs,
} from "../controllers/shared/form-inputs.js";
import { noCache } from "../controllers/middleware/no-cache.js";

const authFormRouter = express.Router();

authFormRouter.get("/", noCache, (req, res) => {
    if (req.user) {
        return res.redirect("/");
    }

    const allowedModes = ["login", "sign-up"];
    const mode = allowedModes.includes(req.query.mode)
        ? req.query.mode
        : "login";
    const isUserCreationSuccessful = req.query.successful === "true";

    const {
        formErrors = {},
        oldLoginInput = "",
        oldSignUpInput = {},
    } = req.session;

    // Clear old Data
    delete req.session.formErrors;
    delete req.session.oldLoginInput;
    delete req.session.oldSignUpInput;

    res.render("auth-form", {
        mode,
        errors: formErrors,
        loginInputs,
        signUpInputs,
        oldLoginInput,
        oldSignUpInput,
        isUserCreationSuccessful,
    });
});

export default authFormRouter;
