import { Router } from "express";
import { signIn, signUp } from "../Controllers/authController.js";

const authRouter = Router();

authRouter.post("/signIn", signIn);
authRouter.post("/signUp", signUp);

export default authRouter;