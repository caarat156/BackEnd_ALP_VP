import { Request, Response } from "express"
import { AuthService } from "../services/authService"

export class AuthController {

  static async register(req: Request, res: Response) {
    try {
      const result = await AuthService.register(req.body)
      res.status(201).json({
        status: true,
        data: result
      })
    } catch (e: any) {
      res.status(e.status ?? 500).json({
        status: false,
        message: e.message
      })
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const result = await AuthService.login(req.body)
      res.json({
        status: true,
        data: result
      })
    } catch (e: any) {
      res.status(e.status ?? 500).json({
        status: false,
        message: e.message
      })
    }
  }
}
