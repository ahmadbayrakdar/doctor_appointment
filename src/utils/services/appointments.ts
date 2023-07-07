import axiosInstance from "@/utils/axios";
import {APPOINTMENTS, GETAPPOINTMENT, GETAPPOINTMENTS} from "@/utils/endpoints/endpoints";
import {IAppointment} from "@/utils/enums/appointment";
import { NumberLiteralType } from "typescript";

export const getAppointmentsWithUserId = async (user_id: string) => {
    try {
        const response = await axiosInstance.get(GETAPPOINTMENTS(user_id));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getAppointment = async (id: string) => {
    try {
        const response = await axiosInstance.get(GETAPPOINTMENT(id));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

interface appointment {
    cancel: Boolean;
}

export const cancelAppointment = async (id: string, payload: appointment) => {
    try {
        const response = await axiosInstance.put(GETAPPOINTMENT(id), payload);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

interface addAppointment {
    // appointment_at: string | undefined,
    appointment_at: Date,
    // end: appointmentDate.add(1, "hours").toDate(),
    online: boolean,
    // visitReason,
    address: {
        description: string,
        address: string,
        latitude: number,
        longitude: number,
    },
    quantity: number,
    doctor: {
        id: number
    },
    clinic: {
        id: number,
        address_id: 11
    },
    patient: {
        id: number | undefined
    },
    user_id: string | undefined,
    cancel: boolean,
}


export const addAppointment = async (payload: addAppointment) => {
    try {
        const response = await axiosInstance.post(APPOINTMENTS, payload);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}
