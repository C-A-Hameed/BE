import express from "express";
import cors from "cors";
import { DbConnection } from "./Database/DbConnection.js";
import employeeRouter from "./Router/employeeRouter.js"
import mongoose from "mongoose";
import {config} from "dotenv"
// import crypto from "crypto"

const app = express();
config({path: "./Config/config.env"})



app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}));
     
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(employeeRouter);
DbConnection();

app.listen(4000, () => {
    console.log("server listening on port 4000");
});
