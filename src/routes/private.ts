import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { PensiController } from "../controllers/pensiController";
import { CalendarController } from "../controllers/calendarController";
import { paymentController } from "../controllers/paymentController";
import { locationController } from "../controllers/locationController";
import { placeCategoryController } from "../controllers/placeCategoryController";
import { reviewController } from "../controllers/reviewController";
import { authController } from "../controllers/authController"; 
import { upload } from "../middlewares/uploadMiddleware"; 
import { placeController } from "../controllers/placeController"; // Pastikan mengimpor placeController
import { reelController } from "../controllers/reelController";
import { uploadReel } from "../middlewares/reelUploadMiddleware";

export const privateRouter = Router();

privateRouter.use(authMiddleware);

/* ===================== LOCATION ===================== */
privateRouter.post("/locations", locationController.createLocation);
privateRouter.put("/locations/:locationId", locationController.updateLocation);
privateRouter.delete("/locations/:locationId", locationController.deleteLocation);

/* ===================== PLACE (Tambahkan ini) ===================== */
privateRouter.post("/places", placeController.createPlace);
privateRouter.put("/places/:placeId", placeController.updatePlace);

/* ===================== CATEGORY ===================== */
privateRouter.post("/categories", placeCategoryController.createCategory);
privateRouter.put("/categories/:categoryId", placeCategoryController.updateCategory);
privateRouter.delete("/categories/:categoryId", placeCategoryController.deleteCategory);

// ...
/* ===================== PAYMENT ===================== */
privateRouter.post("/payment/checkout", paymentController.checkout);
privateRouter.get("/payment/booking/:id", paymentController.getBooking);

// ...

/* ===================== PAYMENT ===================== */
privateRouter.post("/payment/checkout", paymentController.checkout);
privateRouter.get("/payment/booking/:id", paymentController.getBooking);

/* ===================== PENSI ===================== */
privateRouter.get("/pensi", PensiController.getAllPensi);

// --- PINDAHKAN INI KE ATAS (Sebelum :id) ---
privateRouter.get("/history", PensiController.getHistory);
privateRouter.post("/pensi", PensiController.createPensi); 
// -------------------------------------------

// Route dinamis (:id) ditaruh di bawah agar tidak 'memakan' route history
privateRouter.get("/pensi/:id", PensiController.getPensiDetail);
privateRouter.get("/pensi/:id/schedules", PensiController.getSchedulesByEvent);

/* ===================== CALENDAR ===================== */
privateRouter.get("/calendar", CalendarController.getCalendar);

/* ===================== AUTH ===================== */
privateRouter.get("/auth/profile", authController.getProfile);
privateRouter.put("/auth/profile", upload.single('profile_photo'), authController.updateProfile);

/* ===================== REEL ===================== */
privateRouter.post("/reels", uploadReel.single("file"), reelController.upload);
