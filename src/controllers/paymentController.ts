import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const checkoutPayment = async (req: Request, res: Response) => {
const { userId, performanceEventId, eventScheduleId, quantity } = req.body;

const schedule = await prisma.eventSchedule.findUnique({
where: { eventScheduleId },
});

if (!schedule) return res.status(404).json({ message: 'Schedule not found' });

const totalPrice = schedule.price * quantity;

const booking = await prisma.eventBooking.create({
data: {
userId,
performanceEventId,
eventScheduleId,
quantity,
totalPrice,
status: 'PAID', // Dummy langsung sukses
},
});

res.json({ message: 'Payment successful (dummy)', booking });
};
export const getBooking = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    
    const booking = await prisma.eventBooking.findUnique({
    where: { eventBookingId: id },
    include: {
    PerformanceEvent: true,
    EventSchedule: true,
    },
    });
    
    res.json(booking);
    };