
import { generateToken } from "../utils/jwtUtil"
// import { generateToken } from "../utils/jwt-util"

export interface UserJWTPayload {
    id: number
    username: string
    email: string
}
// Ini bentuk data yang akan disimpan di dalam JWT token.
// Payload token berisi identitas user.
// Nanti akan dibaca oleh authMiddleware ketika verifikasi token

export interface RegisterUserRequest {
    username: string
    email: string
    password: string
}
// Ini bentuk data yang dikirim client saat registrasi user baru.

export interface LoginUserRequest {
    email: string
    password: string
}
// Ini bentuk data yang dikirim client saat login.

export interface UserResponse {
    token?: string
}
// Ini bentuk data yang dikirim balik ke client setelah registrasi atau login.

export function toUserResponse(
    id: number,
    username: string,
    email: string
): UserResponse {
    return {
        token: generateToken( //dgn adanya token user ga perlu login lagi, jadi di backend bakal cek tokennya sama atau ga 
            {
                id: id,
                username: username,
                email: email,
            },
            "1h"
        ),
    }
}
// 1. Membuat payload token
// Berisi:
// id
// username
// email
// 2. Generate token JWT
// Dengan waktu kadaluarsa "1h" (1 jam).
// 3. Return sebagai UserResponse
// Supaya controller tinggal kirim ke client.

// 🧠 Kenapa user dikasih token?
// Karena:
// Token dipakai client untuk akses route yang butuh autentikasi
// User tidak perlu login ulang ketika reload page
// Backend bisa memverifikasi user hanya dari token tanpa simpan session

// 🎯 Rangkuman Super Singkat (buat hafalan kuis)
// UserJWTPayload → isi token (id, username, email)
// RegisterUserRequest → data daftar
// LoginUserRequest → data login
// UserResponse → hasil login/register (token)
// toUserResponse → membuat token dari data user