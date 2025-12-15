import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { PensiController } from "../controllers/pensiController";
import { CalendarController } from "../controllers/calendarController";

export const publicRouter = Router();

// AUTH
publicRouter.post("/auth/register", AuthController.register);
publicRouter.post("/auth/login", AuthController.login);

// PENSI
publicRouter.get("/pensi", PensiController.getAllPensi);
publicRouter.get("/pensi/:id", PensiController.getPensiDetail);
publicRouter.get("/pensi/:id/schedules", PensiController.getSchedulesByEvent);

// CALENDAR
publicRouter.get("/calendar/holidays", CalendarController.getHolidays);
