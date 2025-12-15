import jwt from "jsonwebtoken"
import { UserJWTPayload } from "../models/userModel"
import { StringValue } from "ms"
import { JWT_SECRET_KEY } from "./envUtil"
// jsonwebtoken → library untuk membuat & memverifikasi JWT token.
// UserJWTPayload → tipe data payload token (id, username, email).
// StringValue → tipe waktu seperti "1h", "30m", "7d".
// JWT_SECRET_KEY → secret key dari .env.


export const generateToken = (
    payload: UserJWTPayload,
    expiryTime: StringValue = "1h"
): string => {
    return jwt.sign(payload, JWT_SECRET_KEY || "secret_key", {
        expiresIn: expiryTime,
    })
}

export const verifyToken = (token: string): UserJWTPayload => {
    return jwt.verify(token, JWT_SECRET_KEY || "secret_key") as UserJWTPayload
}

// Alur JWT di aplikasi kamu
// User login → backend ambil data user.
// Backend memanggil generateToken() → buat JWT.
// Frontend simpan token.
// Setiap request ke route private → frontend kirim token di header.
// authMiddleware memanggil verifyToken() → cek token.
// Jika valid → request lanjut ke controller.
