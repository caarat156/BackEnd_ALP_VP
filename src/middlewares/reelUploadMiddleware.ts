// middleware/ReelUploadMiddleware.ts
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: "public/reelUpload/reels",
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `reel-${unique}${path.extname(file.originalname)}`);
    }
});

export const uploadReel = multer({ 
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // Increase to 50MB for video
    fileFilter: (req, file, cb) => {
        const allowed = ["image/jpeg", "image/png", "video/mp4", "video/quicktime"];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only JPG, PNG, and MP4 are allowed."));
        }
    }
});