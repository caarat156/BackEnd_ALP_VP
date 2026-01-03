"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const responseError_1 = require("../error/responseError");
const errorMiddleware = async (error, req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        res.status(400).json({
            errors: `Validation error: ${JSON.stringify(error.message)}`,
        });
    }
    else if (error instanceof responseError_1.ResponseError) {
        res.status(error.status).json({
            errors: error.message,
        });
    }
    else {
        res.status(500).json({
            errors: error.message,
        });
    }
};
exports.errorMiddleware = errorMiddleware;
