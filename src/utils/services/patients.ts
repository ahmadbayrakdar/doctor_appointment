import axiosInstance from "@/utils/axios";
import {GETPATIENTS, PATIENTS} from "@/utils/endpoints/endpoints";
import {IPatient} from "@/utils/enums/patients";

type IResponse<T> = {
    success: boolean
    data: T
    message: any
}
export const createPatient = async (payload: IPatient): Promise<IResponse<IPatient>> => {
    try {
        const response = await axiosInstance.post(PATIENTS, payload);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getPatientsWithUserId = async (user_id: string): Promise<IResponse<IPatient[]>> => {
    try {
        const response = await axiosInstance.get(GETPATIENTS(user_id));
        return response.data;
    } catch (error: any) {
        throw error;
    }
};
