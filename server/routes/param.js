import express from "express";

const router = express.Router;

const {modifParam} = require("..controllers/param");

router.get("/", (req, res) => {
    return res.json({
        data: "Hello !",
    });
});

router.post("/modifParam", modifParam);

export default router;