import { Request, Response } from "express";
import appService from "../services/apps.service";
import catchAsync from "../utils/catchAsync.util";

const getAllApplicationsUserValidate = async (req: Request, res: Response) =>{
    const userId = req.params.userId;
    const applications = await appService.getApplicationsUser(userId);

    res.status(200).json(applications);
}

const postApplyToProject = async (req: Request, res: Response) =>{
    const {userId, proyectoId} = req.body

    const sendApplication = await appService.postApplyUserToProject(userId, proyectoId)
    res.status(200).send(sendApplication);
}

export default {
    getAllApplicationsUserValidate: catchAsync(getAllApplicationsUserValidate),
    postApplyToProject: catchAsync(postApplyToProject)
}