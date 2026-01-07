import { Request, Response } from "express";
import { ReelService } from "../services/reelService";

export class reelController {
    
    // --- 1. UPLOAD REEL ---
    // Matches Router: privateRouter.post("/reels", ... reelController.upload)
    static async upload(req: Request, res: Response) {
        try {
            // FIX: Check BOTH 'id' and 'user_id' to be safe against Token differences
            const user = (req as any).user;
            const userId = user.id || user.user_id;

            if (!userId) {
                return res.status(401).json({ status: "error", message: "User ID not found in token" });
            }

            if (!req.file) {
                return res.status(400).json({ status: "error", message: "No media file uploaded" });
            }

            // Clean path logic
            const cleanPath = req.file.path.replace("public/", "").replace(/\\/g, "/");

            const result = await ReelService.createReel(Number(userId), {
                caption: req.body.caption,
                content_url: cleanPath
            });

            // Return success with the data
            res.status(201).json({ status: "success", message: "Reel posted!", data: result });
        
        } catch (e: any) {
            console.error("UPLOAD ERROR:", e); // Log error to console for debugging
            res.status(500).json({ status: "error", message: e.message });
        }
    }

    // --- 2. GET MY REELS (Profile Grid) ---
    // Matches Router: privateRouter.get('/reels/me', reelController.fetchMyReels)
    static async fetchMyReels(req: Request, res: Response) {
        try {
            // FIX: Same ID logic here
            const user = (req as any).user;
            const userId = user.id || user.user_id;
            
            if (!userId) {
                return res.status(401).json({ status: "error", message: "User ID not found" });
            }

            const reels = await ReelService.getReelsByUserId(Number(userId));
            
            res.status(200).json({ 
                status: "success", 
                data: reels 
            });
        } catch (error) {
            console.error("FETCH MY REELS ERROR:", error);
            res.status(500).json({ status: "error", message: (error as any).message });
        }
    }

    // --- 3. GET ALL REELS (Public Feed) ---
    static async fetchAll(req: Request, res: Response) {
        try {
            const reels = await ReelService.getAllReels();
            res.json({ status: "success", data: reels });
        } catch (e: any) {
            res.status(500).json({ status: "error", message: e.message });
        }
    }
}