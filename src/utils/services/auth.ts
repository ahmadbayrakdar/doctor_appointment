import axiosInstance from "@/utils/axios";
import {LOGIN, REGISTER, VERIFY} from "@/utils/endpoints/endpoints";

// login
interface LoginCredentials {
    email: string;
    password: string;
}

export const login = async (credentials: LoginCredentials) => {
    try {
        const response = await axiosInstance.post(LOGIN, credentials);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    phone_number: string;
}

export const register = async (credentials: RegisterCredentials) => {
    try {
        const response = await axiosInstance.post(REGISTER, credentials);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

// verify
interface VerifyCredentials {
    user_id: string | null;
    otp: string;
    app: string;
    device_type: string;
}

export const verify = async (credentials: VerifyCredentials) => {
    try {
        const response = await axiosInstance.post(VERIFY, credentials);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

// export const verify = async ()
