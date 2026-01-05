"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PensiModel = void 0;
const zod_1 = require("zod");
exports.PensiModel = {
    Create: zod_1.z.object({
        name: zod_1.z.string(),
        date: zod_1.z.string(),
        location: zod_1.z.string(),
        price: zod_1.z.number(),
    }),
    Payment: zod_1.z.object({
        pensiId: zod_1.z.number(),
        userId: zod_1.z.number(),
        amount: zod_1.z.number(),
    }),
};
