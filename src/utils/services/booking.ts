import moment from "moment";
import axiosInstance from "@/utils/axios";
import {DoctorId} from "@/pages/home";

export async function getAvailabilityHours(date?: Date): Promise<[Date, boolean][]> {
    const queryParameters = {
        date: moment(date || new Date()).format('y-MM-DD'),
    };
    const uri = `availability_hours/${DoctorId}`;

    try {
        const response = await axiosInstance.get(uri, {params: queryParameters});
        if (response.data.success === true) {
            return response.data?.data;
        } else {
            throw new Error(response?.data?.message);
        }
    } catch (error: any) {
        throw new Error(error?.message);
    }
}
