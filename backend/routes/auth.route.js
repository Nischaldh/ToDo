import { Router } from "express";
import { login, signup, logout } from "../controller/auth.controller.js";

const authRouter = Router()


authRouter.post("/signup",signup);
authRouter.post("/login",login)
authRouter.post("/logout", logout);



export default authRouter;