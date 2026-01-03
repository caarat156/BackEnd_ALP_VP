"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.RegisterSchema = void 0;
const zod_1 = require("zod");
exports.RegisterSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name too short"),
    username: zod_1.z.string().min(3, "Username too short"),
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(6, "Password min 6 chars"),
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(1, "Password required"),
});
