"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSchema = void 0;
const zod_1 = require("zod");
exports.PaymentSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    performanceEventId: zod_1.z.number(),
    eventScheduleId: zod_1.z.number(),
    quantity: zod_1.z.number().min(1),
});
