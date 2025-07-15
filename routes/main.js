import express from "express";
import { dialogs } from "../controllers/shared/navbar-tools.js";
import { checkUserDataOnDB } from "../controllers/db/queries/check-user-data.js";

const mainRouter = express.Router();

mainRouter.get("/", async (req, res) => {
    const user = req.user;

    // TEMPORARY FIXED TO USE THE MAIN PAGE WITH THE CURRENT TEMPLATE, NEED TO CHANGE LATER TO A DIFFERENT MAIN PAGE
    let folders = [];

    if (user) {
        ({ folders } = await checkUserDataOnDB(user.id));
        folders.sort((a, b) => a.name.localeCompare(b.name));
    }

    res.render("index", { user, dialogs, folders });
});

export default mainRouter;
