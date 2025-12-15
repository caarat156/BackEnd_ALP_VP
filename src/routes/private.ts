import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { PensiController } from "../controllers/pensiController";
import { CalendarController } from "../controllers/calendarController";
import { PaymentController } from "../controllers/paymentController";
import { locationController } from "../controllers/locationController";
import { placeCategoryController } from "../controllers/placeCategoryController";
import { reviewController } from "../controllers/reviewController";

export const privateRouter = Router();

privateRouter.use(authMiddleware);

// LOCATION - Create, Update, Delete
privateRouter.post("/locations", locationController.createLocation);
privateRouter.put("/locations/:locationId", locationController.updateLocation);
privateRouter.delete("/locations/:locationId", locationController.deleteLocation);

// CATEGORY - Create, Update, Delete
privateRouter.post("/categories", placeCategoryController.createCategory);
privateRouter.put("/categories/:categoryId", placeCategoryController.updateCategory);
privateRouter.delete("/categories/:categoryId", placeCategoryController.deleteCategory);

// REVIEW - Create, Update, Delete
privateRouter.post("/reviews", reviewController.addReview);
privateRouter.put("/reviews/:reviewId", reviewController.updateReview);
privateRouter.delete("/reviews/:reviewId", reviewController.deleteReview);

// PAYMENT - Create, Get
privateRouter.post("/payment/checkout", PaymentController.checkout);
privateRouter.get("/payment/booking/:id", PaymentController.getBooking);

// PENSI - Read
privateRouter.get("/pensi", PensiController.getAllPensi);
privateRouter.get("/pensi/:id", PensiController.getPensiDetail);
privateRouter.get("/pensi/:id/schedules", PensiController.getSchedulesByEvent);

// CALENDAR - Read
privateRouter.get("/calendar/holidays", CalendarController.getHolidays);
