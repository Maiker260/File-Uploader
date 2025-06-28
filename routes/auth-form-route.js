import express from "express";
import { loginInputs, signUpInputs } from "../controllers/form-inputs.js";

const authFormRouter = express.Router();

authFormRouter.get("/", (req, res) => {
    const mode = req.query.mode || "login";
    const formErrors = req.session.formErrors || {};
    const oldLoginInput = req.session.oldLoginInput || "";
    const oldSignUpInput = req.session.oldSignUpInput || "";

    console.log(oldLoginInput);

    res.render("auth-form", {
        mode: mode,
        errors: formErrors,
        loginInputs: loginInputs,
        signUpInputs: signUpInputs,
        oldLoginInput: oldLoginInput,
        oldSignUpInput: oldSignUpInput,
    });

    // Clear previous errors
    if (req.session.shouldClear) {
        req.session.formErrors = null;
        req.session.oldLoginInput = null;
        req.session.oldSignUpInput = null;
        req.session.shouldClear = false;
    }
});

export default authFormRouter;
