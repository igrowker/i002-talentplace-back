import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.util";
import projectService from "../services/project.service";
import ProjectDto from "../dto/project.dto";
import ProjectUpdateDto from "../dto/projectUpdate.dto";

const getAllProjects = async (req: Request, res: Response) =>{
    const projects = await projectService.getAllProjectsService();
    res.status(200).json(projects);
}

const getProyectById = async (req: Request, res: Response) =>{  
    const { projectId } = req.query;
    const project = await projectService.getProjectByIdService(projectId as string)
    res.status(200).json(project);
}

const postNewProject = async (req: Request, res: Response) =>{
    const { id } = req.params;
    const projectData: ProjectDto = req.body;
    const projectOk = await  projectService.postNewProjectService(id, projectData);
    res.status(201).json(projectOk);
}

const editProjectById = async (req: Request, res: Response) =>{
    const { id } = req.params;
    const projectData: ProjectUpdateDto = req.body;
    const projectUpdated = await projectService.editProjectByIdService(id, projectData);    
    res.status(200).json(projectUpdated);
}

const deleteProjectById = async (req: Request, res: Response) =>{
    const { projectId } = req.query;    
    const projectDeleted = await projectService.deleteProjectByIdService(projectId as string);
    res.status(200).json(projectDeleted);
}

const getAllProjectsByUserId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const projects = await projectService.getAllProjectsByUserIdService(id);
    res.status(200).json(projects);
}

const getAllCategories = async (req: Request, res: Response) => {
    const categories = await projectService.getAllCategoriesService();
    res.status(200).json(categories);
}

export default {
    getAllProjects: catchAsync(getAllProjects),
    getProyectById: catchAsync(getProyectById),
    postNewProject: catchAsync(postNewProject),
    editProjectById: catchAsync(editProjectById),
    deleteProjectById: catchAsync(deleteProjectById),
    getAllProjectsByUserId: catchAsync(getAllProjectsByUserId),
    getAllCategories: catchAsync(getAllCategories),
}