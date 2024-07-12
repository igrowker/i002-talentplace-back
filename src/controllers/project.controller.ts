import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.util";
import projectService from "../services/project.service";

const getAllProjects = async (req: Request, res: Response) =>{
    const projects = await projectService.getAllProjectsService();
    res.status(200).json(projects);
}

const getProyectId = (req: Request, res: Response) =>{

}

const postNewProject = (req: Request, res: Response) =>{

}

const editProject = (req: Request, res: Response) =>{

}

const deleteProject = (req: Request, res: Response) =>{

}

export default {
    getAllProjects: catchAsync(getAllProjects),
    getProyectId,
    postNewProject,
    editProject,
    deleteProject
}