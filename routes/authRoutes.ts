import {Router} from "express"
import { login, register } from "../controllers/authController";



export const authRouter = Router()



authRouter.post("/register", register);
authRouter.post("/login", login);



