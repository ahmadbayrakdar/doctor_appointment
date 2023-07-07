import axiosInstance from "@/utils/axios";
import {GETCLINIC} from "@/utils/endpoints/endpoints";

export const getClinic = async (id: string) => {
    try {
        const response = await axiosInstance.get(GETCLINIC(id));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}
