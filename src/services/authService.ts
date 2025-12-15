import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prismaClient } from "../utils/databaseUtil"
import { RegisterSchema, LoginSchema } from "../validations/authValidation"
import { ResponseError } from "../error/responseError"

export class AuthService {

    static async register(request: unknown) {
        const data = RegisterSchema.parse(request)
        const { name, username, email, password } = data

        const existing = await prismaClient.user.findUnique({
            where: { email }
        })

        if (existing) {
            throw new ResponseError(400, "Email already exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prismaClient.user.create({
            data: {
                name,
                username,
                email,
                password: hashedPassword
            }
        })

        const { password: _, ...safeUser } = user
        return safeUser
    }

    static async login(request: unknown) {
        const data = LoginSchema.parse(request)
        const { email, password } = data

        const user = await prismaClient.user.findUnique({
            where: { email }
        })

        if (!user) {
            throw new ResponseError(404, "User not found")
        }

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            throw new ResponseError(401, "Invalid password")
        }

        const token = jwt.sign(
            { userId: user.userId },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        )

        return {
            token
        }
    }
}
