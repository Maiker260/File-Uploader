import express from "express";
import { requireUser } from "../controllers/middleware/auth.js";
import { renderIndexWithFolders } from "../controllers/handlers/renderIndexWithFolders.js";

const userDataRouter = express.Router();

userDataRouter.get("/", requireUser, renderIndexWithFolders());

userDataRouter.get(
    "/:id",
    requireUser,
    renderIndexWithFolders((req) => req.params.id)
);
// NEED TO CREATE THE SUB FOLDERS STYLE AND REMOVE THE LINK ID FOR THE MAIN FOLDER
export default userDataRouter;
