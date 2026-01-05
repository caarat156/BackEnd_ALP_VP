import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name too short"),
  username: z.string().min(3, "Username too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password min 6 chars"),
  phoneNumber: z.string().optional()
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
});

export const UpdateProfileSchema = z.object({
    name: z.string().optional(),
    username: z.string().optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    password: z.string().min(6).optional(),
    profilePhoto: z.string().optional(),
});