import {IMonthDay} from "@/utils/interfaces/monthDays";
import moment from "moment/moment";

export const generateDays: () => IMonthDay[] = () => {
    const startDate = moment();
    const data = [];

    for (let i = 0; i < 30; i++) {
        const currentDate = startDate.clone().add(i, 'days');
        const month = currentDate.format('MMM').toUpperCase();
        const monthNumber = currentDate.date();
        const day = currentDate.format('ddd').toUpperCase();

        data.push({month, monthNumber, day, isActive: i === 0});
    }

    return data;
};