import express from "express";
import { handleItemOperation } from "../controllers/shared/handle-item-operation.js";

const fileRouter = express.Router();

fileRouter.post("/", (req, res) => {
    res.redirect("/");
});

fileRouter.post("/delete", async (req, res) => {
    const data = req.body.data;

    await handleItemOperation(res, req.user, data, "delete", true);
});

export default fileRouter;
