import express from "express";
import { loginValidator } from "../controllers/login-form-validator.js";
import { validationResult } from "express-validator";

const loginRouter = express.Router();

loginRouter.post("/", loginValidator, (req, res) => {
    const errors = validationResult(req);

    console.log("LOGIN");
    res.redirect("/");
    // res.redirect("/auth?mode=login");
});

export default loginRouter;
