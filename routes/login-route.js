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
        req.session.shouldClear = true;

        return res.redirect("/auth?mode=login");
    }

    console.log("LOGIN");
    res.redirect("/");
});

export default loginRouter;
