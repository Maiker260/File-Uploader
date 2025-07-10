import express from "express";
import { dialogs } from "../controllers/shared/navbar-tools.js";
import { checkUserData } from "../controllers/db/db-query.js";

const mainRouter = express.Router();

mainRouter.get("/", async (req, res) => {
    const user = req.user;

    // TEMPORARY FIXED TO USE THE MAIN PAGE WITH THE CURRENT TEMPLATE, NEED TO CHANGE LATER TO A DIFFERENT MAIN PAGE
    let folders = [];

    if (user) {
        ({ folders } = await checkUserData(user.id));
    }

    res.render("index", { user, dialogs, folders });
});

export default mainRouter;
