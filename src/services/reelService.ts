// services/ReelService.ts
import { PrismaClient } from "@prisma/client";
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export class ReelService {


    static async getAllReels() {
        return await prisma.reels_content.findMany({
        include: {
            users: {
            select: {
                username: true,
                profile_photo: true,
                location: { // This pulls the city_name from the location table
                select: { city_name: true }
                }
            }
            }
        },
        orderBy: { created_at: 'desc' }
        });
    }

    static async getReelsByUserId(userId: number) {
        return await prisma.reels_content.findMany({
            where: {
                user_id: userId // Filters by the logged-in user
            },
            orderBy: {
                created_at: 'desc'
            }
        });
    }

    static async createReel(userId: number, data: { caption: string, content_url: string }) {
        return await prisma.reels_content.create({
            data: {
                user_id: userId,
                caption: data.caption,
                content_url: data.content_url,
                created_at: new Date()
            }
        });
    }

static async deleteReel(contentId: number, userId: number) {
        // 1. Find the reel using 'content_id'
        const reel = await prisma.reels_content.findUnique({
            where: { content_id: contentId } 
        });

        if (!reel) throw new Error("Reel not found");

        // 2. Check ownership using 'user_id'
        if (reel.user_id !== userId) {
            throw new Error("Unauthorized: You do not own this reel");
        }

        // 3. Delete the file from storage
        if (reel.content_url) {
            // Adjust path relative to where ReelService.ts is located
            // Assuming structure: src/services/ReelService.ts -> public/uploads/...
            const filePath = path.join(__dirname, '../../public', reel.content_url);
            
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        // 4. Delete the record using 'content_id'
        return await prisma.reels_content.delete({
            where: { content_id: contentId }
        });
    }
}