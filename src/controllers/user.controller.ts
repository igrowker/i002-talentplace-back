import { Request, Response } from "express";

const getUserValidate = (req: Request, res: Response) =>{
    res.send("soy un get")
}

const editUserData = (req: Request, res: Response) =>{

}

export default {
    getUserValidate,
    editUserData
}