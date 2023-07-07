export interface IAppointment {
    id: string
    address: { description: string },
    patient: { first_name: string, last_name: string },
    doctor: { discount_price: string },
    appointment_at: string,
    appointment_status_id: string
}
