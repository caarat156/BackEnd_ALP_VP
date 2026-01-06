// controllers/ReelController.ts
import { Request, Response } from "express";
import { ReelService } from "../services/reelService";
import prisma from "../lib/prisma";



export class reelController {
    static async upload(req: Request, res: Response) {
        try {
        const user_id = (req as any).user.user_id;
        
        if (!req.file) {
            return res.status(400).json({ message: "No media file uploaded" });
        }

        // Clean the path for Android (remove public/ and fix slashes)
        const cleanPath = req.file.path.replace("public/", "").replace(/\\/g, "/");

        const result = await ReelService.createReel(user_id, {
            caption: req.body.caption,
            content_url: cleanPath
        });

        res.status(201).json({ message: "Reel posted!", data: result });
        } catch (e: any) {
        res.status(500).json({ message: e.message });
        }
    }

    static async fetchAll(req: Request, res: Response) {
        try {
        const reels = await ReelService.getAllReels();
        res.json({ data: reels });
        } catch (e: any) {
        res.status(500).json({ message: e.message });
        }
    }

    static async fetchMyReels(req: Request, res: Response) {
        try {
            const userId = (req as any).user.user_id; // Get ID from token
            const myReels = await prisma.reels_content.findMany({
                where: { user_id: userId },
                orderBy: { created_at: 'desc' }
            });
            res.json({ data: myReels });
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    }
}