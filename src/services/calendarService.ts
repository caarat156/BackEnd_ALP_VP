import { fetchExternal } from "../utils/fetchExternal";
import { ResponseError } from "../error/responseError";

export class CalendarService {

    static async getHolidays(year: number, country = "ID") {
        if (!year || isNaN(year)) {
            throw new ResponseError(400, "Invalid year");
        }

        const url = `https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDARIFIC_KEY}&country=${country}&year=${year}`;

        const result = await fetchExternal(url);

        return result?.response?.holidays ?? [];
    }
}
