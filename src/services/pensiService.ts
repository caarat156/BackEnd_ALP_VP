import { prismaClient } from "../utils/databaseUtil"
import { ResponseError } from "../error/responseError"

export class PensiService {

    static async getAllPensi() {
        return prismaClient.performanceEvent.findMany({
            include: {
                Place: true
            }
        })
    }

    static async getPensiDetail(eventId: number) {
        if (isNaN(eventId)) {
            throw new ResponseError(400, "Invalid ID")
        }

        const event = await prismaClient.performanceEvent.findUnique({
            where: { performanceEventId: eventId },
            include: {
                schedules: true,
                Place: true
            }
        })

        if (!event) {
            throw new ResponseError(404, "Event not found")
        }

        return event
    }

    static async getSchedulesByEvent(eventId: number) {
        if (isNaN(eventId)) {
            throw new ResponseError(400, "Invalid ID")
        }

        const event = await prismaClient.performanceEvent.findUnique({
            where: { performanceEventId: eventId }
        });

        if (!event) {
            throw new ResponseError(404, "Event not found");
        }

        return prismaClient.eventSchedule.findMany({
            where: { performanceEventId: eventId }
        });
    }
}
