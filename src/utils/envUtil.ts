import dotenv from "dotenv"
//dotenv unutk bacaf file .env
dotenv.config()
//aktifin file .env

export const PORT = process.env.PORT
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
// Mengambil nilai PORT dan JWT_SECRET_KEY dari .env.
// Lalu di-export supaya bisa digunakan di file lain.