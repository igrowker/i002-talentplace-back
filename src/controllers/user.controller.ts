import { Request, Response } from "express";
import userService from "../services/user.service";
import catchAsync from "../utils/catchAsync.util";

const getUserProfile = async (req: Request, res: Response) =>{
    const { id } = req.params;
    const userProfile = await userService.getUserProfileByIdService(id);
    res.status(200).json(userProfile)
}

const editUserData = async (req: Request, res: Response) => {
    const { id, ...updateData } = req.body;
    const updatedUser = await userService.editUserProfileService(id, updateData);
    res.status(200).json(updatedUser);
}

const getAllUsers = async (req: Request, res: Response) => {
    const users = await userService.getAllUsersService();
    res.status(200).json(users);
}

const getAllUserHabilities = async (req: Request, res: Response) => {
    const habilities = await userService.getAllUsersHabilitiesService();
    res.status(200).json(habilities);
}

export default {
    getUserProfile: catchAsync(getUserProfile),
    editUserData: catchAsync(editUserData),
    getAllUsers: catchAsync(getAllUsers),
    getAllUserHabilities: catchAsync(getAllUserHabilities),
}
