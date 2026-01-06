import { Request, Response } from "express";
import { authService } from "../services/authService";

// Helper to handle errors uniformly
const handleError = (res: Response, error: any) => {
    const status = error.status || 500;
    const message = error.message || "Internal Server Error";
    res.status(status).json({ message });
};

export class authController {

    static async register(req: Request, res: Response) {
        try {
            const result = await authService.register(req.body);
            res.status(201).json({
                message: "Register successful",
                data: result
            });
        } catch (e) { handleError(res, e); }
    }

    static async login(req: Request, res: Response) {
        try {
            const result = await authService.login(req.body);
            res.json({
                message: "Login successful",
                token: result.token,
                data: result.user // Android might look for 'data'
            });
        } catch (e) { handleError(res, e); }
    }

    static async getProfile(req: Request, res: Response) {
        try {
            // Assumes middleware attached user to req
            const user_id = (req as any).user.user_id;
            const result = await authService.getProfile(user_id);
            
            res.json({
                message: "Success",
                data: result
            });
        } catch (e) { handleError(res, e); }
    }

    static async updateProfile(req: Request, res: Response) {
        try {
            const user_id = (req as any).user.user_id;
            const updateData = { ...req.body };

            // PERBAIKAN DI SINI: Cast req ke 'any' untuk mengakses .file
            const file = (req as any).file;

            if (file) {
                // Gunakan variable 'file' yang sudah diambil
                // Tips tambahan: Regex replace(/\\/g, "/") memastikan path aman di Windows
                const cleanPath = file.path.replace("public/", "").replace(/\\/g, "/");
                updateData.profile_photo = cleanPath;
            }

            const result = await authService.updateProfile(user_id, updateData);
            
                res.json({
                    message: "Profile updated successfully",
                    data: result
                });
            } catch (e) { handleError(res, e); }
        }
}
