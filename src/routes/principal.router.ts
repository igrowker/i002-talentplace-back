import { Router } from "express";
import userRouter from './users.router'
import projectRouter from './projects.router'
import appsRouter from './apps.router'
import authRouter from "./auth.router";

const principalRouter: Router = Router();

principalRouter.use("/users", userRouter);
principalRouter.use("/projects", projectRouter);
principalRouter.use("/applications", appsRouter);
principalRouter.use("/auth", authRouter);

export default principalRouter;