import express from "express";

const signUpRouter = express.Router();

signUpRouter.get("/", (req, res) => {
    // Need to change to redirect it to "/auth?mode=sign-up"
    res.render("auth-form");
});

export default signUpRouter;
