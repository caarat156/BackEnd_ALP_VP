import { NextFunction, Request, Response } from "express"
import { AuthService } from "../services/authService"

export class AuthController {

    static async register(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await AuthService.register(req.body)

            res.status(201).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await AuthService.login(req.body)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}
