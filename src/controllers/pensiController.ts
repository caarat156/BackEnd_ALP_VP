import { Request, Response } from "express";
import { prismaClient } from "../utils/databaseUtil";

export const getAllPensi = async (req: Request, res: Response) => {
    try {
        const events = await prismaClient.performanceEvent.findMany({
        include: {
            Place: true,          // Include tempat / lokasi
        },
        });

        return res.json({
        status: true,
        data: events
        });
    } catch (error) {
        return res.status(500).json({
        status: false,
        message: "Failed to fetch pensi",
        error: String(error),
        });
    }
};

export const getPensiDetail = async (req: Request, res: Response) => {
    try {
        const eventId = Number(req.params.id);

        if (isNaN(eventId)) {
        return res.status(400).json({ status: false, message: "Invalid ID" });
        }

    const event = await prismaClient.performanceEvent.findUnique({
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
    } catch (error) {
        return res.status(500).json({
        status: false,
        message: "Failed to fetch detail",
        error: String(error),
        });
    }
};

export const getSchedulesByEvent = async (req: Request, res: Response) => {
    try {
        const eventId = Number(req.params.id);

        if (isNaN(eventId)) {
        return res.status(400).json({ status: false, message: "Invalid ID" });
        }

        const schedules = await prismaClient.eventSchedule.findMany({
        where: { performanceEventId: eventId },
        });

        return res.json({
        status: true,
        data: schedules
        });
    } catch (error) {
        return res.status(500).json({
        status: false,
        message: "Failed to fetch schedules",
        error: String(error),
        });
    }
};
