// services/ReelService.ts
import { PrismaClient } from "@prisma/client";

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
}