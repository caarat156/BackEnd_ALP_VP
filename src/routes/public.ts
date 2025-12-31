import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { PensiController } from "../controllers/pensiController";
import { CalendarController } from "../controllers/calendarController";
import { locationController } from "../controllers/locationController";
import { placeCategoryController } from "../controllers/placeCategoryController";
import { placeController } from "../controllers/placeController";
import { reviewController } from "../controllers/reviewController";

export const publicRouter = Router();

// AUTH - Public
publicRouter.post("/auth/register", AuthController.register);
publicRouter.post("/auth/login", AuthController.login);

// LOCATION - Read-only
publicRouter.get("/locations", locationController.getAllLocations);
publicRouter.get("/locations/:locationId", locationController.getLocationById);

// CATEGORY - Read-only
publicRouter.get("/categories", placeCategoryController.getAllCategories);
publicRouter.get("/categories/:categoryId", placeCategoryController.getCategoryById);

// PLACE - Read-only
publicRouter.get("/places", placeController.getAllPlaces);
publicRouter.get("/places/:placeId", placeController.getPlaceById);
publicRouter.get("/places/recommended", placeController.getRecommendedPlaces);
publicRouter.get("/places/popular", placeController.getPopularPlaces);

// REVIEW - Read-only
publicRouter.get("/reviews/:reviewId", reviewController.getReviewById);
publicRouter.get("/reviews/place/:placeId", reviewController.getReviewsByPlaceId);

// PENSI - Read-only
publicRouter.get("/pensi", PensiController.getAllPensi);
publicRouter.get("/pensi/:id", PensiController.getPensiDetail);
publicRouter.get("/pensi/:id/schedules", PensiController.getSchedulesByEvent);

// CALENDAR - Read-only
publicRouter.get("/calendar", CalendarController.getCalendar);
