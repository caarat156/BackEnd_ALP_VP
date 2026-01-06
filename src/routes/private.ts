import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { PensiController } from "../controllers/pensiController";
import { CalendarController } from "../controllers/calendarController";
import { paymentController } from "../controllers/paymentController";
import { locationController } from "../controllers/locationController";
import { placeCategoryController } from "../controllers/placeCategoryController";
import { reviewController } from "../controllers/reviewController";
import { AuthController } from "../controllers/authController"; 
import { upload } from "../middlewares/uploadMiddleware"; 
import { placeController } from "../controllers/placeController"; // Pastikan mengimpor placeController

export const privateRouter = Router();

privateRouter.use(authMiddleware);

/* ===================== LOCATION ===================== */
privateRouter.post("/locations", locationController.createLocation);
privateRouter.put("/locations/:locationId", locationController.updateLocation);
privateRouter.delete("/locations/:locationId", locationController.deleteLocation);

/* ===================== PLACE (Tambahkan ini) ===================== */
privateRouter.post("/places", placeController.createPlace);

/* ===================== CATEGORY ===================== */
privateRouter.post("/categories", placeCategoryController.createCategory);
privateRouter.put("/categories/:categoryId", placeCategoryController.updateCategory);
privateRouter.delete("/categories/:categoryId", placeCategoryController.deleteCategory);

/* ===================== REVIEW ===================== */
privateRouter.post("/reviews", reviewController.addReview);
privateRouter.put("/reviews/:reviewId", reviewController.updateReview);
privateRouter.delete("/reviews/:reviewId", reviewController.deleteReview);

/* ===================== PAYMENT ===================== */
privateRouter.post("/payment/checkout", paymentController.checkout);
privateRouter.get("/payment/booking/:id", paymentController.getBooking);

/* ===================== PENSI ===================== */
privateRouter.get("/pensi", PensiController.getAllPensi);
privateRouter.get("/pensi/:id", PensiController.getPensiDetail);
privateRouter.get("/pensi/:id/schedules", PensiController.getSchedulesByEvent);
privateRouter.get("/pensi/history", PensiController.getHistory); // Wajib login
privateRouter.post("/pensi", PensiController.createPensi);

/* ===================== CALENDAR ===================== */
privateRouter.get("/calendar", CalendarController.getCalendar);

/* ===================== AUTH ===================== */
privateRouter.get("/auth/profile", AuthController.getProfile);
privateRouter.put("/auth/profile", upload.single('profile_photo'), AuthController.updateProfile);