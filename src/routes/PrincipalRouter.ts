import { Router } from "express";
import userRouter from './UsersRouter'
import projectRouter from './ProjectsRouter'
import appsRouter from './AppsRouter'
import authRouter from "./AuthRouter";

const principalRouter: Router = Router();

principalRouter.use("/users", userRouter);
principalRouter.use("/projects", projectRouter);
principalRouter.use("/applications", appsRouter);
principalRouter.use("/auth", authRouter);

export default principalRouter;