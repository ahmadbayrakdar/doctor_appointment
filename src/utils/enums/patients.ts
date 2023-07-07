import Media from "@/utils/services/media_model";

export interface IPatient {
    id?: number;
    first_name: string;
    last_name: string;
    age: string;
    gender: string;
    weight: string;
    height: string;

    user_id: string;
    phone_number: string;
    mobile_number: string | null;
    images: Media[];

    total_appointments: number
}