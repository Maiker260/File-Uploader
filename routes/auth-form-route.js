import express from "express";

const authFormRouter = express.Router();

authFormRouter.get("/", (req, res) => {
    const mode = req.query.mode || "login";

    res.render("auth-form", { mode: mode });
});

export default authFormRouter;
