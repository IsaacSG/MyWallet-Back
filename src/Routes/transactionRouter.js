import { Router } from "express";
import { getTransactions, postTransactions } from "../Controllers/transactionController.js";
import { tokenMiddleware } from "../Middleware/tokemMiddleware.js";

const transRouter = Router();

transRouter.get("/transaction", tokenMiddleware, getTransactions);
transRouter.post("/transaction", tokenMiddleware,postTransactions);

export default transRouter;