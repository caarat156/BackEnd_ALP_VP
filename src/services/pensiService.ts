import { prismaClient } from "../utils/databaseUtil"
import { ResponseError } from "../error/responseError"

export class PensiService {

    // 1. UPDATE: Tambahkan parameter locationId
    static async getAllPensi(locationId?: number) {
        return prismaClient.performance_event.findMany({
            where: {
                // Logic: Cari event dimana place-nya memiliki location_id yg sesuai
                ...(locationId && {
                    place: {
                        location_id: locationId
                    }
                })
            },
            include: {
                place: {
                    include: {
                        location: true // Include location biar tau ini kota apa
                    }
                },
                event_schedule: true // Include jadwal biar bisa dilihat di list
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

    // 2. BARU: Fitur History User
    static async getUserHistory(userId: number) {
        return prismaClient.event_booking.findMany({
            where: { user_id: userId },
            include: {
                performance_event: {
                    include: {
                        place: true
                    }
                },
                // Kita perlu tau jadwal mana yang dia booking
                // Note: Di schema kamu relasinya ke performance_event, 
                // tapi idealnya booking juga link ke event_schedule.
                // Asumsi: Logic booking kamu menyimpan harga & tanggal snapshot.
            },
            orderBy: {
                event_booking_id: 'desc'
            }
        })
    }

    // 3. BARU: Buat Data Pensi (Untuk Admin/Input di Postman)
    static async createPensi(data: any) {
        // Buat Event beserta Jadwalnya sekaligus
        return prismaClient.performance_event.create({
            data: {
                place_id: data.placeId,
                title: data.title,
                event_description: data.description,
                venue_address: data.venueAddress,
                image_url: data.imageUrl,
                event_schedule: {
                    create: data.schedules.map((s: any) => ({
                        date: new Date(s.date),
                        start_time: new Date(`1970-01-01T${s.startTime}Z`), // Format Time PostgreSQL
                        end_time: new Date(`1970-01-01T${s.endTime}Z`),
                        price: s.price
                    }))
                }
            },
            include: {
                event_schedule: true
            }
        })
    }
}