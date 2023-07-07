import {Box, Button, Grid} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import defaultImage from "../images/download.png";
import Image from 'next/image'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {currencySymbol} from "@/utils/endpoints/consts/global";
import awesomeAlert from "@/utils/functions/alert";
import {AlertTypeEnum} from "@/utils/enums/alertType";
import {cancelAppointment} from "@/utils/services/appointments";
import {useRouter} from "next/router";
import {IAppointment} from "@/utils/enums/appointment";

type Props = {
    appointmentData: IAppointment,
    status: string
}

const AppointmentCard = (props: Props) => {
    const router = useRouter();

    const [openMenu, setOpenMenu] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const boxRef = useRef<HTMLDivElement>(null);
    const popRef = useRef<HTMLDivElement>(null)

    const [time, setTime] = useState("");
    const [day, setDay] = useState(0);
    const [month, setMonth] = useState("");

    const appointment_id = props.appointmentData.id;

    const handleOutsideClick = (event: MouseEvent) => {
        if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
            setOpenMenu(false);
        }
        if (popRef.current && !popRef.current.contains(event.target as Node)) {
            setOpenPopup(false);
        }
    };

    useEffect(() => {

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };

    }, []);

    useEffect(() => {
        // Input date string
        const dateString = props.appointmentData.appointment_at;

        // Create a new Date object
        const date = new Date(dateString);

        // Extract the desired components
        const hours = date.getHours(); // Get the hours (in 24-hour format)
        const minutes = date.getMinutes(); // Get the minutes
        // Format the time
        const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;

        const formattedDay = date.getDate(); // Get the day of the month
        const formattedMonth = date.toLocaleString('default', {month: 'long'}); // Get the month name

        setTime(formattedTime);
        setDay(formattedDay);
        setMonth(formattedMonth);

    }, [props.appointmentData])

    const handleCancel = () => {
        // console.log(appointment_id);
        cancelAppointment(appointment_id as string, {cancel: true})
            .then((res) => {
                if (res.success == true) {
                    // console.log(res.data);
                    awesomeAlert({msg: res.message});
                } else {
                    awesomeAlert({msg: res.message[0][0], type: AlertTypeEnum.error});
                }
            })
            .catch((error) => {
                console.error({
                    msg: error?.response?.data?.message,
                    type: AlertTypeEnum.error
                })
            })
            .finally(() => {
                // awesomeAlert({msg: "appointment cancelled"});
                setOpenPopup(false);
                router.reload();
            })
    }

    return (
        props.appointmentData.appointment_status_id == props.status ? (
            <Grid container spacing={2} sx={{
                boxShadow: 'var(--global-box-shadow)',
                borderRadius: '15px',
                width: '100%',
                padding: '10px 20px 10px 0',
                margin: '20px 0',
                justifyContent: 'space-between',
                position: 'relative',
                backgroundColor: 'var(--background-end-rgb)'
            }}>
                {openPopup ? (
                    <Box sx={{
                        background: '#0005',
                        width: '100%',
                        height: '100%',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: 4
                    }}>
                        <Box ref={popRef} sx={{
                            backgroundColor: '#fff',
                            maxWidth: '90%',
                            width: '550px',
                            height: '200px',
                            margin: '100px auto',
                            borderRadius: '8px',
                            padding: '25px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}>
                            Are you sure you want to delete the appointment?
                            <Grid container spacing={2} sx={{paddingTop: '25px'}}>
                                <Grid item xs={6}>
                                    <Button onClick={handleCancel} variant="contained" color="error">yes</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" onClick={() => setOpenPopup(false)}>No</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                ) : null}
                {openMenu ? (
                    <Box ref={boxRef} sx={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        backgroundColor: '#fff',
                        boxShadow: 'var(--global-box-shadow)',
                        borderRadius: '8px',
                        zIndex: 3
                    }}>
                        <List>
                            <ListItem disablePadding>
                                <Link href={{pathname: '/details', query: {appointment_id: props.appointmentData.id}}}
                                      style={{width: '100%'}}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Grid3x3Icon/>
                                        </ListItemIcon>
                                        <ListItemText primary={props.appointmentData.id}/>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem disablePadding>
                                <Link href={{pathname: '/details', query: {appointment_id: props.appointmentData.id}}}
                                      style={{width: '100%'}}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <AssignmentOutlinedIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Details"/>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem disablePadding onClick={() => setOpenPopup(true)}>
                                <ListItemButton>
                                    <ListItemIcon sx={{color: 'red'}}>
                                        <RemoveCircleOutlineIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Cancel" sx={{color: 'red'}}/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                ) : null}
                <Grid item xs={3} sx={{height: '150px'}}>
                    <Box sx={{
                        height: '50%',
                        backgroundColor: 'lightgray',
                        borderRadius: '10px 10px 0 0',
                        overflow: 'hidden'
                    }}>
                        <Image
                            style={{
                                objectFit: 'cover',
                                height: '100%'
                            }}
                            src={defaultImage}
                            alt="default image"
                        />
                    </Box>
                    <Box sx={{
                        backgroundColor: 'primary.main',
                        height: '50%',
                        borderRadius: '0 0 10px 10px',
                        color: '#fff',
                        padding: '5px',
                        textAlign: 'center',
                        fontSize: '13px'
                    }}>
                        {/* 09:00 <br/> 13 <br/> May */}
                        {time} <br/> {day} <br/> {month}
                    </Box>
                </Grid>
                <Grid container item xs={8} spacing={3}
                      sx={{fontSize: '13px', fontWeight: 'bold', letterSpacing: '1px', margin: '0'}}>
                    <Grid container spacing={2} sx={{
                        fontSize: '13px',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        margin: '0',
                        width: '100%',
                        borderBottom: 'solid 1px #ededed'
                    }}>
                        <Grid item xs={10} sx={{padding: '5px 0 10px', fontSize: '17px'}}>
                            {props.appointmentData.patient.first_name}
                            {props.appointmentData.patient.last_name}
                        </Grid>
                        <Grid item xs={2} sx={{padding: '5px 0 10px', fontSize: '17px', cursor: 'pointer'}}>
                            <IconButton onClick={() => setOpenMenu(true)}>
                                <MoreVertIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item sx={{
                        fontSize: '13px',
                        fontWeight: 'normal',
                        letterSpacing: '1px',
                        margin: '0',
                        borderBottom: 'solid 1px #ededed',
                        padding: 0,
                        width: '100%'
                    }}>
                        <Box>
                            {/* {props.appointmentData.address.description} */}
                            online
                        </Box>
                    </Grid>
                    <Grid container spacing={2}
                          sx={{fontSize: '13px', fontWeight: 'bold', letterSpacing: '1px', margin: '0', width: '100%'}}>
                        <Grid item xs={6} sx={{padding: '10px 0'}}>
                            Total
                        </Grid>
                        <Grid item xs={6} sx={{textAlign: 'end', fontSize: '20px', color: 'primary.main'}}>
                            {props.appointmentData.doctor.discount_price} {currencySymbol}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        ) : <Box> </Box>
    );
};

export default AppointmentCard;
