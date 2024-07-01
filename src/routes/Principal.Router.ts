import { Router } from "express";
import userRouter from './Users.Router'
import projectRouter from './Projects.Router'
import appsRouter from './Apps.Router'
import authRouter from "./Auth.Router";

const principalRouter: Router = Router();

principalRouter.use("/users", userRouter);
principalRouter.use("/projects", projectRouter);
principalRouter.use("/applications", appsRouter);
principalRouter.use("/auth", authRouter);

export default principalRouter;