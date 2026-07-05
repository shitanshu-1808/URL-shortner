import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import urlRoutes from "./routes/url.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET","POST","PUT","DELETE"],
}))

app.use("/",urlRoutes);

mongoose.connect(process.env.MONGO_URL).then(()=>
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
}))