export const CalendarService = {
    async getHolidays(year: number, country: string = "ID") {
    const apiKey = process.env.CALENDARIFIC_KEY;
    const url = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return data?.response?.holidays || [];
    }
};