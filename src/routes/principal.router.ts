import { Router } from "express";
import usersRouter from "./users.router";
import projectRouter from './projects.router'
import appsRouter from './apps.router'
import authRouter from "./auth.router";

const principalRouter: Router = Router();

principalRouter.use("/users", usersRouter);
principalRouter.use("/projects", projectRouter);
principalRouter.use("/applications", appsRouter);
principalRouter.use("/auth", authRouter);

export default principalRouter;