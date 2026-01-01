export class CalendarService {

    static generateCalendar(year: number, month: number) {
        if (!year || !month || month < 1 || month > 12) {
            throw new Error("Invalid year or month");
        }
    
        const daysInMonth = new Date(year, month, 0).getDate();
        const dates = [];
    
        for (let day = 1; day <= daysInMonth; day++) {
            dates.push({
            day,
            date: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
            });
        }
    
        return dates;
        }
    
    }
