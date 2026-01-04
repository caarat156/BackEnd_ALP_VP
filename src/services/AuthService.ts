import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prismaClient } from "../utils/databaseUtil";
import { RegisterSchema, LoginSchema, UpdateProfileSchema } from "../validations/authValidation";
import { ResponseError } from "../error/responseError";

export class AuthService {

    static async register(request: any) {
        const data = RegisterSchema.parse(request);

        const existing = await prismaClient.user.findUnique({
            where: { email: data.email }
        });

        if (existing) {
            throw new ResponseError(400, "Email already exists");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prismaClient.user.create({
            data: {
                name: data.name,
                username: data.username,
                email: data.email,
                password: hashedPassword,
                phoneNumber: data.phoneNumber // Now this will actually save!
            }
        });

        const { password: _, ...safeUser } = user;
        return safeUser;
    }

    static async login(request: any) {
        const data = LoginSchema.parse(request);

        const user = await prismaClient.user.findUnique({
            where: { email: data.email }
        });

        if (!user) throw new ResponseError(404, "User not found");

        const valid = await bcrypt.compare(data.password, user.password);
        if (!valid) throw new ResponseError(401, "Invalid password");

        const token = jwt.sign(
            { userId: user.userId },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        const { password: _, ...safeUser } = user;

        return { token, user: safeUser };
    }

    static async getProfile(userId: number) {
        const user = await prismaClient.user.findUnique({
            where: { userId: userId }
        });

        if (!user) throw new ResponseError(404, "User not found");

        const { password: _, ...safeUser } = user;
        return safeUser;
    }

    static async updateProfile(userId: number, request: any) {
        // Validate partial update
        const data = UpdateProfileSchema.parse(request); 
        const updateData: any = { ...data };

        if (data.password) {
            updateData.password = await bcrypt.hash(data.password, 10);
        }

        const user = await prismaClient.user.update({
            where: { userId: userId },
            data: updateData
        });

        const { password: _, ...safeUser } = user;
        return safeUser;
    }
}