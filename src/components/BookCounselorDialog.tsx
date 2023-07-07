import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box, Button, FormControl} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CreatePatient from './CreatePatient';
import MonthDay from "@/components/complete-appointment/MonthDay";
import {IMonthDay} from "@/utils/interfaces/monthDays";
import {DialogTransition} from "@/components/global/DialogTransition";
import {generateDays} from "@/utils/functions/generateDays";
import SchedulePage from "@/components/complete-appointment/SchedulePage";
import {theme} from "@/utils/theme";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from '@mui/material/TextField';
import {getAvailabilityHours} from "@/utils/services/booking";
import moment from "moment/moment";
import {RadioButtonChecked} from "@mui/icons-material";
import {getPatientsWithUserId} from "@/utils/services/patients";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {IPatient} from "@/utils/enums/patients";
import { addAppointment } from '@/utils/services/appointments';
import awesomeAlert from '@/utils/functions/alert';
import { AlertTypeEnum } from '@/utils/enums/alertType';
import { getDoctor } from '@/utils/services/doctor';
import { DoctorId, IDoctorInfo } from '@/pages/home';
import { getClinic } from '@/utils/services/clinic';

export const lightBorder = {border: '1px solid #ebebeb99'}


export default function BookCounselorDialog() {
    const [monthDays, setMonthDays] = useState<IMonthDay[]>([]);
    const [selectedDay, setSelectedDay] = useState<null | number>(null);
    const [time, setTime] = useState<null | number>(null);
    const [loadingPatient, setLoadingPatient] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeHours, setActiveHours] = useState<boolean[]>([]);
    const [visitReason, setVisitReason] = useState<string>('');
    const [open, setOpen] = useState(false);
    const user_id = useSelector((state: RootState) => state.auth.user?.id);
    const user = useSelector((state: RootState) => state.auth.user);
    const [patient, setPatient] = useState<IPatient>();
    const hasPatient = !!patient;
    const [doctorInfo, setDoctorInfo] = useState<IDoctorInfo>({});
    const [clinicInfo, setClinicInfo] = useState<any>({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const appointmentDate = moment().add(selectedDay, "days").add(time, "hours")
        if (time !== null && hasPatient){
            console.log({
                appointment_at: appointmentDate.toDate(),
                // end: appointmentDate.add(1, "hours").toDate(),
                online: true,
                hint: visitReason,
                address: {
                    description: "Office",
                    address: "Online",
                },
                quantity: 1,
                doctor: doctorInfo,
                clinic: {
                    id: 7
                },
                patient: {
                    id: patient.id
                },
                user_id: user_id,
                cancel: false,
            })
            console.log(doctorInfo);
            console.log(clinicInfo);
            // setOpen(false);
            addAppointment({
                // appointment_at: appointmentDate.toDate().toString(),
                appointment_at: appointmentDate.toDate(),
                // end: appointmentDate.add(1, "hours").toDate(),
                online: true,
                // visitReason,
                address: {
                    description: "Office",
                    address: "Online",
                    latitude: 51.503399,
                    longitude: -0.119519,
                },
                quantity: 1,
                doctor: {
                    id: 1
                },
                clinic: {
                    id: 7,
                    address_id: 11
                },
                patient: {
                    id: patient.id
                },
                user_id: user_id,
                cancel: false,
            }).then((res) => {
                if(res.success == true){
                    awesomeAlert({msg: res.message});
                } else {
                    awesomeAlert({msg: res.message, type: AlertTypeEnum.error})
                }
            }).catch((error) => {
                console.error({
                    msg: error?.response?.data?.message,
                    type: AlertTypeEnum.error
                })
            })
        }
    };
    const fetchActiveHour = (date: Date) => {
        setLoading(true)
        getAvailabilityHours(date)
            .then((res) => {
                const activeHourList: boolean[] = []
                res.forEach(r => {
                        activeHourList[parseInt(moment(r[0]).format('H'))] = r[1]
                    }
                )
                setActiveHours(activeHourList)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleGettingClinic = (clinic_id: string) => {

        getClinic(clinic_id)
        .then((res) => {
            if (res.success == true) {
                setClinicInfo(res.data);
                // awesomeAlert({msg: res.message});
            } else {
                awesomeAlert({msg: res.message[0][0], type: AlertTypeEnum.error});
            }
            // console.log("a: "+ myAppointments[0].id);
        })
        .catch((error) => {
            // Handle login error here
            awesomeAlert({
                msg: error?.response?.data?.message,
                type: AlertTypeEnum.error
            })
        });

    }

    useEffect(() => {
        setMonthDays(generateDays())
        fetchActiveHour(new Date())
        getDoctor(DoctorId)
        .then((res) => {
            if (res.success == true) {
                setDoctorInfo(res.data);
                // handleGettingClinic(res.data.clinic_id);
                // awesomeAlert({msg: res.message});
            } else {
                awesomeAlert({msg: res.message[0][0], type: AlertTypeEnum.error});
            }
            // console.log("a: "+ myAppointments[0].id);
        })
        .catch((error) => {
            // Handle login error here
            awesomeAlert({
                msg: error?.response?.data?.message,
                type: AlertTypeEnum.error
            })
        })
    }, [])

    useEffect(() => {
        fetchActiveHour(moment().add(selectedDay, 'day').toDate())
    }, [selectedDay])

    useEffect(() => {
        if (user_id) getPatientsWithUserId(user_id).then(res => {
            if (res.success) setPatient(res.data[0])
        })
    }, [user_id])

    return (
        <Box>
            {/* <Button variant="contained" sx={{width: '100%', backgroundcolor: "deepPurple"}}>Book Counselor</Button> */}
            <Button sx={{width: '100%'}} onClick={handleClickOpen} variant="contained">
                Book Counselor
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={DialogTransition}
            >
                <Box sx={{
                    backgroundColor: '#fafafa',
                    width: 'clamp(200px, 90%, 700px)',
                    margin: '0 auto'
                }}>
                    <AppBar
                        sx={{position: 'relative', backgroundColor: 'white', boxShadow: 'none', color: 'primary.main'}}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <ArrowBackIosNewIcon/>
                            </IconButton>
                            <Typography sx={{ml: 2, flex: 1, textAlign: 'center', fontFamily: 'inherit'}}
                                        variant="h6" component="div">
                                Complete Your Appointment
                            </Typography>
                            {/* <Button autoFocus color="inherit" onClick={handleClose}>save</Button> */}
                        </Toolbar>
                    </AppBar>
                    <Box sx={{padding: '15px'}}>
                        {
                            !hasPatient && <CreatePatient havePatient={hasPatient}/>
                        }

                        <Box sx={{padding: '15px 0'}}>
                            <Button color='primary' variant='contained' fullWidth sx={{py: 1, pointerEvents: 'none'}}>
                                <RadioButtonChecked sx={{marginRight: '15px'}}/>
                                Online Consultation
                            </Button>
                        </Box>
                        <Box sx={{p: 2, maxWidth: '100%', overflow: 'auto'}}>
                            <Box sx={{width: 'max-content'}}>
                                {
                                    monthDays.map((m, i) => (
                                        <MonthDay
                                            key={i}
                                            isActive={selectedDay ? i === selectedDay : m.isActive}
                                            onClick={() => setSelectedDay(i)}
                                            day={m.day}
                                            month={m.month}
                                            monthNumber={m.monthNumber}
                                        />
                                    ))
                                }
                            </Box>
                        </Box>
                        <SchedulePage
                            setTime={(t) => setTime(t)}
                            loading={loading || loadingPatient}
                            activeHours={activeHours}/>
                        <Box sx={{
                            ...lightBorder,
                            background: 'white',
                            py: 2,
                            px: 3,
                            mt: 2,
                            borderRadius: theme.shape.borderRadius
                        }}>
                            <FormControl variant="outlined" fullWidth>
                                <TextField
                                    label="Visiting Reason"
                                    size='small'
                                    id="visiting_reason"
                                    value={visitReason}
                                    onChange={(val) => setVisitReason(val.currentTarget.value)}
                                    fullWidth
                                    variant="outlined"
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{
                            minHeight: '70px'
                        }}></Box>
                        <Box sx={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Box sx={{
                                ...lightBorder,
                                backgroundColor: 'white',
                                py: 2,
                                px: 2,
                                zIndex: 99,
                                boxShadow: 'var(--global-box-shadow)',
                                position: 'fixed',
                                bottom: '0',
                                maxWidth: 650 + 50 + 'px',
                                width: '100%',
                                borderStartStartRadius: theme.shape.borderRadius,
                                borderStartEndRadius: theme.shape.borderRadius
                            }}>
                                <LoadingButton
                                    loading={loading}
                                    disabled={time === null || !hasPatient}
                                    onClick={handleSubmit}
                                    sx={{textTransform: 'capitalize'}}
                                    fullWidth
                                    variant="contained">
                                    {
                                        !hasPatient ?
                                            'Add Patient To Continue' :
                                            time === null ?
                                                'Select Time To Continue' :
                                                'Continue'
                                    }
                                </LoadingButton>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
}
