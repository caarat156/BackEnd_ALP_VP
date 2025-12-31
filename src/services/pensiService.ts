import { prismaClient } from "../utils/databaseUtil"
import { ResponseError } from "../error/responseError"

export class PensiService {

    static async getAllPensi() {
        return prismaClient.performance_event.findMany({
        include: {
            place: true
        }
        })
    }

    static async getPensiDetail(eventId: number) {
        if (isNaN(eventId)) {
        throw new ResponseError(400, "Invalid ID")
        }

        const event = await prismaClient.performance_event.findUnique({
        where: { performance_event_id: eventId },
        include: {
            event_schedule: true,
            place: true
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

        return prismaClient.event_schedule.findMany({
        where: { performance_event_id: eventId }
        })
    }
}
