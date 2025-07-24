import express from "express";

const fileRouter = express.Router();

fileRouter.post("/", (req, res) => {
    res.redirect("/");
});

fileRouter.post("/delete", async (req, res) => {
    const data = req.body;
    console.log(data);

    // console.log("Deleted");
    res.redirect("/");

    // await handleFolderOperation(res, req.user, data, "delete");
});

export default fileRouter;
