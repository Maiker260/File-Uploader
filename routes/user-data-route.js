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

export default userDataRouter;
