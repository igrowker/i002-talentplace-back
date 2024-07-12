import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.util";
import projectService from "../services/project.service";
import ProjectDto from "../dto/project.dto";

const getAllProjects = async (req: Request, res: Response) =>{
    const projects = await projectService.getAllProjectsService();
    res.status(200).json(projects);
}

const getProyectById = async (req: Request, res: Response) =>{  
    const { projectId } = req.body;
    const project = await projectService.getProjectByIdService(projectId)
    res.status(200).json(project);
}

const postNewProject = async (req: Request, res: Response) =>{
    const { id } = req.params;
    const projectData: ProjectDto = req.body;
    const projectOk = await  projectService.postNewProjectService(id, projectData);
    res.status(201).json(projectOk);
}

const editProject = (req: Request, res: Response) =>{

}

const deleteProject = (req: Request, res: Response) =>{

}

export default {
    getAllProjects: catchAsync(getAllProjects),
    getProyectById: catchAsync(getProyectById),
    postNewProject: catchAsync(postNewProject),
    editProject,
    deleteProject
}