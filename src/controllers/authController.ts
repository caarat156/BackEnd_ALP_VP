import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

// Helper to handle errors uniformly
const handleError = (res: Response, error: any) => {
    const status = error.status || 500;
    const message = error.message || "Internal Server Error";
    res.status(status).json({ message });
};

export class AuthController {

    static async register(req: Request, res: Response) {
        try {
            const result = await AuthService.register(req.body);
            res.status(201).json({
                message: "Register successful",
                data: result
            });
        } catch (e) { handleError(res, e); }
    }

    static async login(req: Request, res: Response) {
        try {
            const result = await AuthService.login(req.body);
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
            const userId = (req as any).user.userId;
            const result = await AuthService.getProfile(userId);
            
            res.json({
                message: "Success",
                data: result
            });
        } catch (e) { handleError(res, e); }
    }

static async updateProfile(req: Request, res: Response) {
        try {
            const userId = (req as any).user.userId;
            const updateData = { ...req.body };

            if (req.file) {
                // FIXED: Use process.env.BASE_URL or hardcode machine IP for testing
                // If you are using Android Emulator, '10.0.2.2' points to your computer.
                // It is safer to hardcode this for local development.
                
                const port = process.env.PORT || 3000;
                
                // OPTION A: If testing on Emulator
                const baseUrl = `http://10.0.2.2:${port}`; 
                
                // OPTION B: If testing on Real Device (Use your Laptop's WiFi IP)
                // const baseUrl = `http://192.168.1.5:${port}`;

                const imageUrl = `${baseUrl}/public/uploads/${req.file.filename}`;
                updateData.profilePhoto = imageUrl;
            }

            const result = await AuthService.updateProfile(userId, updateData);
            
            res.json({
                message: "Profile updated successfully",
                data: result
            });
        } catch (e) { handleError(res, e); }
    }
}