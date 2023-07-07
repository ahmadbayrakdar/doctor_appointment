import {IUser} from "@/utils/interfaces/user";
import {IPatient} from "@/utils/enums/patients";

type IAppointmentStatus  = {
    id: string;
    status: string;
    order: number;
}
type ITax = {
    id: string;
    name: string;
    type: string;
    value: number;
}

type IPayment = {
    id: string;
    description: string;
    amount: number;
    paymentMethod: any;
    paymentStatus: any;
    // paymentMethod: PaymentMethod;
    // paymentStatus: PaymentStatus;
}

export type IMonthDay = {
     id: string;
     hint: string;
     cancel: boolean;
     online: boolean;
     duration: number;
     status?: IAppointmentStatus;
     user?: IUser;
     doctor: string;
     // doctor: Doctor;
     clinic: string;
     patient: IPatient;
     taxes?: ITax[];
     // address: Address;
     // coupon: Coupon;
     appointmentAt: Date;
     startAt?: Date;
     endsAt?: Date;
     payment: IPayment;
}