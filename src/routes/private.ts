import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { PaymentController } from "../controllers/paymentController";

export const privateRouter = Router();

privateRouter.use(authMiddleware);

// PAYMENT
privateRouter.post("/payment/checkout", PaymentController.checkout);
privateRouter.get("/payment/booking/:id", PaymentController.getBooking);
