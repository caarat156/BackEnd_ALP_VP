import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prismaClient } from "../utils/databaseUtil";
import { RegisterSchema, LoginSchema, UpdateProfileSchema } from "../validations/authValidation";
import { ResponseError } from "../error/responseError";

export class authService {

    static async register(request: any) {
        const data = RegisterSchema.parse(request);

        const existing = await prismaClient.users.findUnique({
            where: { email: data.email }
        });

        if (existing) {
            throw new ResponseError(400, "Email already exists");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prismaClient.users.create({
            data: {
                name: data.name,
                username: data.username,
                email: data.email,
                password: hashedPassword,
                phone_number: data.phone_number // Maps camelCase input to snake_case DB
            }
        });

        const { password: _, ...safeUser } = user;
        return safeUser;
    }

    static async login(request: any) {
        const data = LoginSchema.parse(request);

        const user = await prismaClient.users.findUnique({
            where: { email: data.email }
        });

        if (!user) throw new ResponseError(404, "User not found");

        // SAFETY CHECK: Handle null passwords (new DB schema)
        if (!user.password) {
            throw new ResponseError(401, "Invalid password (no password set)");
        }

        const valid = await bcrypt.compare(data.password, user.password);
        if (!valid) throw new ResponseError(401, "Invalid password");

        const token = jwt.sign(
            { user_id: user.user_id }, // <--- NOW USING user_id (Snake Case)
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        const { password: _, ...safeUser } = user;

        return { token, user: safeUser };
    }

    static async getProfile(user_id: number) {
        const user = await prismaClient.users.findUnique({
            where: { user_id: user_id }
        });

        if (!user) throw new ResponseError(404, "User not found");

        const { password: _, ...safeUser } = user;
        return safeUser;
    }

    static async updateProfile(user_id: number, request: any) {
        const data = UpdateProfileSchema.parse(request); 
        
        const updateData: any = {};
        if (data.name) updateData.name = data.name;
        if (data.username) updateData.username = data.username;
        if (data.email) updateData.email = data.email;
        if (data.phone_number) updateData.phone_number = data.phone_number;
        if (data.profile_photo) {
            updateData.profile_photo = data.profile_photo;
        }
        if (data.password) {
            updateData.password = await bcrypt.hash(data.password, 10);
        }

        const user = await prismaClient.users.update({
            where: { user_id: user_id },
            data: updateData
        });

        const { password: _, ...safeUser } = user;
        return safeUser;
    }
}