import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prismaClient } from "../utils/databaseUtil";

// REGISTER
export const register = async (req: Request, res: Response) => {
    try {
        const { name, username, email, password } = req.body;

        // Cek apakah email sudah ada
        const existing = await prismaClient.user.findUnique({
        where: { email },
        });

        if (existing) {
        return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        // Buat user
        const user = await prismaClient.user.create({
        data: {
            name,
            username,
            email,
            password: hashed,
        },
        });

        // Jangan tampilkan password
        const { password: _, ...userWithoutPassword } = user;

        return res.json({
        message: "Register successful",
        user: userWithoutPassword,
        });

    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
    };


    // LOGIN
    export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Cari user berdasarkan email
        const user = await prismaClient.user.findUnique({
        where: { email },
        });

        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        // Cek password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
        return res.status(401).json({ message: "Invalid password" });
        }

        // Generate token
        const token = jwt.sign(
        { userId: user.userId },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
        );

        return res.json({ message: "Login successful", token });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
