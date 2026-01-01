import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request {
    user?: {
        user_id: number
    }
    }

    export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
    ) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
        ) as { user_id: number }

        req.user = { user_id: decoded.user_id }
        next()
    } catch {
        return res.status(401).json({ message: "Invalid token" })
    }
}
