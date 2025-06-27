import express from "express";
import { signUpValidator } from "../controllers/sign-up-form-validator.js";
import { validationResult } from "express-validator";

const signUpRouter = express.Router();

signUpRouter.post("/", signUpValidator, (req, res) => {
    const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     req.session.formErrors = errors.mapped();
    //     req.session.oldInput = safeInput;

    //     // return res.redirect("/auth?mode=sign-up");
    //     return res.redirect("/sign-up");
    // }

    // Need to change to redirect it to "/auth?mode=sign-up"
    // res.redirect("/auth?mode=sign-up");
    console.log("SIGN UP");
    res.redirect("/");
});

export default signUpRouter;
