import express from "express";
import passport from "passport";
import { loginValidator } from "../controllers/auth/login/login-form-validator.js";
import { validationResult } from "express-validator";
import { clearInputs } from "../controllers/auth/session/clear-inputs.js";
import { handleFormErrors } from "../controllers/shared/handle-form-errors.js";

const loginRouter = express.Router();

loginRouter.post(
    "/",
    loginValidator,
    async (req, res, next) => {
        const errors = validationResult(req);
        const { userEmailLogin } = req.body;

        if (!errors.isEmpty()) {
            return handleFormErrors(
                "login",
                req,
                res,
                errors.mapped(),
                userEmailLogin
            );
        }

        clearInputs(req);
        next();
    },
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/auth?mode=login",
        failureMessage: true,
    })
);

export default loginRouter;
