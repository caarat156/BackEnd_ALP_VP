import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getAllPensi = async (req: Request, res: Response) => {
const events = await prisma.performanceEvent.findMany({
include: {
Place: true,
},
});
res.json(events);
};

export const getPensiDetail = async (req: Request, res: Response) => {
const eventId = Number(req.params.id);

const event = await prisma.performanceEvent.findUnique({
where: { performanceEventId: eventId },
include: { schedules: true, Place: true },
});

res.json(event);
};

export const getSchedulesByEvent = async (req: Request, res: Response) => {
const eventId = Number(req.params.id);
const schedules = await prisma.eventSchedule.findMany({
where: { performanceEventId: eventId },
});
res.json(schedules);
};