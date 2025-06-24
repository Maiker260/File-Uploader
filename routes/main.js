import express from "express";

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
    res.render("index");
});

export default mainRouter;
