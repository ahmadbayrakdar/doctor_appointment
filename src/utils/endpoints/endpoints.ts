export const LOGIN = `/login`;
export const REGISTER = `/register`;
export const VERIFY = `/loginOtp`;
export const PATIENTS = `/patients`;
export const GETPATIENTS = (user_id: string) => `${PATIENTS}?search=${user_id}`;
export const APPOINTMENTS = `/appointments`;
export const GETAPPOINTMENTS = (user_id: string) => `${APPOINTMENTS}?search=${user_id}`;
export const GETAPPOINTMENT = (id: string) => `${APPOINTMENTS}/${id}`;
export const DOCTORS = `/doctors`;
export const GETDOCTOR = (id: string) => `${DOCTORS}/${id}`;
export const GETSTRIPEURL = `payments/stripe/checkout`;
export const GETCLINIC = (id: string) => `/clinics/${id}`;
