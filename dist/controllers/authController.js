"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const databaseUtil_1 = require("../utils/databaseUtil");
const authValidation_1 = require("../validations/authValidation");
/* ===================== REGISTER ===================== */
const register = async (req, res) => {
    try {
        // ✅ VALIDASI BODY
        const data = authValidation_1.RegisterSchema.parse(req.body);
        const { name, username, email, password } = data;
        // Cek email
        const existing = await databaseUtil_1.prismaClient.user.findUnique({
            where: { email },
        });
        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // Hash password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Create user
        const user = await databaseUtil_1.prismaClient.user.create({
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
    }
    catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
exports.register = register;
/* ===================== LOGIN ===================== */
const login = async (req, res) => {
    try {
        // ✅ VALIDASI BODY
        const data = authValidation_1.LoginSchema.parse(req.body);
        const { email, password } = data;
        // Cari user
        const user = await databaseUtil_1.prismaClient.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Cek password
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.json({
            message: "Login successful",
            token,
        });
    }
    catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
exports.login = login;

