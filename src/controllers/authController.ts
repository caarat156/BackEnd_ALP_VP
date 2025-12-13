import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prismaClient } from "../utils/databaseUtil";
import { RegisterSchema, LoginSchema } from "../validations/authValidation";

/* ===================== REGISTER ===================== */
export const register = async (req: Request, res: Response) => {
  try {
    // ✅ VALIDASI BODY
    const data = RegisterSchema.parse(req.body);
    const { name, username, email, password } = data;

    // Cek email
    const existing = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prismaClient.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    // Hilangkan password dari response
    const { password: _, ...safeUser } = user;

    return res.status(201).json({
      message: "Register successful",
      user: safeUser,
    });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

/* ===================== LOGIN ===================== */
export const login = async (req: Request, res: Response) => {
  try {
    // ✅ VALIDASI BODY
    const data = LoginSchema.parse(req.body);
    const { email, password } = data;

    // Cari user
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Cek password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
