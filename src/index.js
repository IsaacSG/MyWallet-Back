import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./Routes/authRouter.js";
import transRouter from "./Routes/transactionRouter.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(transRouter);

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
    console.log(`Listen from ${Port}`);
})