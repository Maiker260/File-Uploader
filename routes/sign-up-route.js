import express from "express";
import { signUpValidator } from "../controllers/auth/sign-up/sign-up-form-validator.js";
import { validationResult } from "express-validator";
import { signUpHandler } from "../controllers/auth/sign-up/sign-up-handler.js";
import { clearInputs } from "../controllers/auth/session/clear-inputs.js";
import { parseSignUpFormData } from "../controllers/auth/sign-up/parse-sign-up-form-data.js";
import { handleFormErrors } from "../controllers/shared/handle-form-errors.js";
import { handleFolderOperation } from "../controllers/shared/handle-folder-operation.js";

const signUpRouter = express.Router();

signUpRouter.post("/", signUpValidator, async (req, res) => {
    const errors = validationResult(req);
    const { username, email, password, otherInput } = parseSignUpFormData(
        req.body
    );

    if (!errors.isEmpty()) {
        return handleFormErrors("sign-up", req, res, errors.mapped(), {
            ...otherInput,
            usernameSignUp: username,
            emailSignUp: email,
        });
    }

    try {
        const user = await signUpHandler(username, email, password);

        await handleFolderOperation(
            res,
            user,
            { name: "MyFiles", isDefault: true },
            "create"
        );
    } catch (err) {
        console.error("Signup failed:", err);
        return handleFormErrors(
            "sign-up",
            req,
            res,
            {
                general: { msg: "Something went wrong. Try again." },
            },
            {
                ...otherInput,
                usernameSignUp: username,
                emailSignUp: email,
            }
        );
    }

    clearInputs(req);
    res.redirect("/auth?mode=login&successful=true");
});

export default signUpRouter;
