import express from "express";
import { loginInputs, signUpInputs } from "../controllers/form-inputs.js";
import { noCache } from "../controllers/no-cache.js";

const authFormRouter = express.Router();

authFormRouter.get("/", noCache, (req, res) => {
    const mode = req.query.mode || "login";
    const formErrors = req.session.formErrors || {};
    const oldLoginInput = req.session.oldLoginInput || "";
    const oldSignUpInput = req.session.oldSignUpInput || "";

    // Clear old Data
    req.session.formErrors = {};
    req.session.oldLoginInput = "";
    req.session.oldSignUpInput = {};

    res.render("auth-form", {
        mode: mode,
        errors: formErrors,
        loginInputs: loginInputs,
        signUpInputs: signUpInputs,
        oldLoginInput: oldLoginInput,
        oldSignUpInput: oldSignUpInput,
    });
});

export default authFormRouter;
