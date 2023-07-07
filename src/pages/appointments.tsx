import {Box} from "@mui/material";
import AppointmentButton from "@/components/AppointmentButton";
import {useEffect, useState} from 'react';
import AppointmentCard from "@/components/AppointmentCard";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {LOGIN_ROUTE} from "@/utils/endpoints/routes";
import {getAppointmentsWithUserId} from "@/utils/services/appointments";
import {AlertTypeEnum} from "@/utils/enums/alertType";
import {IAppointment} from "@/utils/enums/appointment";


const Appointments = () => {
    const appointmentTypes = ['Received', 'Accepted', 'Done', 'Failed'];
    const [appointmentStatusId, setAppointmenStatustId] = useState("1");
    const [myAppointments, setMyAppoitments] = useState<IAppointment[]>([]);
    const [selected, setSelected] = useState(appointmentTypes[0]);
    const user_id = useSelector((state: RootState) => state.auth.user?.id);
    const router = useRouter()
    const token = useSelector((state: RootState) => state.auth.token);

    const selectThisItem = (item: string) => {
        setSelected(item);
        if (item == 'Received') {
            setAppointmenStatustId("1");
        } else if (item == "Accepted") {
            setAppointmenStatustId("10");
        } else if (item == "Done") {
            setAppointmenStatustId("50");
        } else if (item == "Failed") {
            setAppointmenStatustId("60");
        }
    }

    useEffect(() => {
        if (user_id) {
            getAppointmentsWithUserId(user_id)
                .then((res) => {
                    if (res.success == true) {
                        setMyAppoitments(res.data);
                        // awesomeAlert({msg: res.message});
                    } else {
                        console.error({msg: res.message[0][0], type: AlertTypeEnum.error});
                    }
                    // console.log("a: "+ myAppointments[0].id);
                })
                .catch((error) => {
                    // Handle login error here
                    console.error({
                        msg: error?.response?.data?.message,
                        type: AlertTypeEnum.error
                    })
                });
        }

    }, [user_id])

    // no token => go to login
    useEffect(() => {
        if (!token) router.push(LOGIN_ROUTE);
    }, [token]);

    return (
        <Box sx={{maxWidth: '650px', margin: '0 auto', position: 'relative'}}>
            <Box sx={{
                position: 'fixed',
                backgroundColor: 'var(--backgroundGray)',
                width: '100%',
                maxWidth: 'inherit',
                zIndex: 1
            }}>
                <Box sx={{
                    textAlign: 'center',
                    color: 'primary.main',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    padding: '20px 0 0'
                }}>Counselor Appointments</Box>
                <Box sx={{width: '100%', overflowX: 'scroll'}}>
                    <Box sx={{
                        padding: '20px 25px 10px',
                        textAlign: 'center',
                        width: 'fit-content',
                        display: 'flex',
                        flexWrap: 'nor-wrap'
                    }}>
                        {appointmentTypes.map((item) => (
                            <AppointmentButton key={item} content={item} itemSelected={selected}
                                               selectThisItem={(item: string) => selectThisItem(item)}/>
                        ))}
                    </Box>
                </Box>
            </Box>
            <Box sx={{padding: '20px 25px'}}>
                <Box sx={{margin: '115px 0 55px', width: '100%'}}>
                    {/* {myAppointments.map((appointment, index) => <Box>{appointment.id}</Box>)} */}
                    {myAppointments.map((appointment, index) =>
                        <AppointmentCard
                            key={index}
                            appointmentData={appointment}
                            status={appointmentStatusId}
                        />)}
                </Box>
            </Box>
        </Box>
    );
};

export default Appointments;
