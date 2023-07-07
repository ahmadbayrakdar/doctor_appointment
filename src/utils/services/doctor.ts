import axiosInstance from "@/utils/axios";
import {GETDOCTOR} from "@/utils/endpoints/endpoints";

export const getDoctor = async (id: string) => {
    try {
        const response = await axiosInstance.get(GETDOCTOR(id));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}
