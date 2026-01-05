"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarService = void 0;
const fetchExternal_1 = require("../utils/fetchExternal");
exports.CalendarService = {
    async getHolidays(year, country = "ID") {
        const url = `https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDARIFIC_KEY}&country=${country}&year=${year}`;
        const result = await (0, fetchExternal_1.fetchExternal)(url);
        return result?.response?.holidays || [];
    },
};
