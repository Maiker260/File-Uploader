import express from "express";
import { dialogs } from "../controllers/shared/navbar-tools.js";

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
    res.render("index", { user: req.user, dialogs });
});

export default mainRouter;
