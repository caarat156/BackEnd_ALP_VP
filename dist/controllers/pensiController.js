"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchedulesByEvent = exports.getPensiDetail = exports.getAllPensi = void 0;
const databaseUtil_1 = require("../utils/databaseUtil");
const getAllPensi = async (req, res) => {
    try {
        const events = await databaseUtil_1.prismaClient.performanceEvent.findMany({
            include: {
                Place: true, // Include tempat / lokasi
            },
        });
        return res.json({
            status: true,
            data: events
        });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: "Failed to fetch pensi",
            error: String(error),
        });
    }
};
exports.getAllPensi = getAllPensi;
const getPensiDetail = async (req, res) => {
    try {
        const eventId = Number(req.params.id);
        if (isNaN(eventId)) {
            return res.status(400).json({ status: false, message: "Invalid ID" });
        }
        const event = await databaseUtil_1.prismaClient.performanceEvent.findUnique({
            where: { performanceEventId: eventId },
            include: {
                schedules: true,
                Place: true,
            },
        });
        if (!event) {
            return res.status(404).json({
                status: false,
                message: "Event not found",
            });
        }
        return res.json({
            status: true,
            data: event
        });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: "Failed to fetch detail",
            error: String(error),
        });
    }
};
exports.getPensiDetail = getPensiDetail;
const getSchedulesByEvent = async (req, res) => {
    try {
        const eventId = Number(req.params.id);
        if (isNaN(eventId)) {
            return res.status(400).json({ status: false, message: "Invalid ID" });
        }
        const schedules = await databaseUtil_1.prismaClient.eventSchedule.findMany({
            where: { performanceEventId: eventId },
        });
        return res.json({
            status: true,
            data: schedules
        });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: "Failed to fetch schedules",
            error: String(error),
        });
    }
};
exports.getSchedulesByEvent = getSchedulesByEvent;
