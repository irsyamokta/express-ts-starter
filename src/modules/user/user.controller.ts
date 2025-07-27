import { Request, Response, NextFunction } from "express";
import userService from "@modules/user/user.service";

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = (req as any).user; 
        const result = await userService.updateUser(
            { id, role },
            req.params.userId,
            req.body
        );
        res.json(result);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = (req as any).user;
        const result = await userService.deleteUser(
            { id, role },
            req.params.userId
        );
        res.json(result);
    } catch (err) {
        next(err);
    }
};
