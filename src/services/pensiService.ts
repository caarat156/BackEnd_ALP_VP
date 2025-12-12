import { fetchExternal } from "../utils/fetchExternal";

export const CalendarService = {
async getHolidays(year: number, country = "ID") {
const url = `https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDARIFIC_KEY}&country=${country}&year=${year}`;
const result = await fetchExternal(url);
return result?.response?.holidays || [];
},
};