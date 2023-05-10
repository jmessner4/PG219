require("dotenv").config
import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded ({extended: true}));

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Connected ERROR : ", err));

app.listen(8000, () => console.log("Server running on port 8000"));
