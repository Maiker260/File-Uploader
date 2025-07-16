import express from "express";

const mainRouter = express.Router();

mainRouter.get("/", async (req, res) => {
    const user = req.user;

    if (user) {
        return res.redirect("/myfiles");
    }

    res.render("main-page");
});

export default mainRouter;
