import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: {
        userId: number; // or string, depending on your Prisma schema
    };
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    // 1. Check if token exists
    if (!authHeader) {
        return res.status(401).json({ message: 'Missing token' });
    }

    // 2. Remove "Bearer " prefix
    const token = authHeader.split(' ')[1];

    try {
        // 3. Verify the token using your Secret Key
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as AuthRequest).user = decoded as any; 
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or Expired Token' });
    }
};