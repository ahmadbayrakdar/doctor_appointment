import {Box, Button, Grid} from "@mui/material";
import Image from 'next/image'
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {APPOINTMENTS_ROUTE, LOGIN_ROUTE} from "@/utils/endpoints/routes";
import {useEffect, useRef, useState} from 'react';
import {cancelAppointment, getAppointment} from "@/utils/services/appointments";
import awesomeAlert from "@/utils/functions/alert";
import {AlertTypeEnum} from "@/utils/enums/alertType";
import englandBridge from '../images/engalnd.jpg'
import Link from "next/link";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {currencySymbol, doctorEmail} from "@/utils/endpoints/consts/global";
import GoToCheckout from "@/components/GoToCheckout";

export type IMyAppointment = {
    id: number,
    appointment_at: string,
    appointment_status_id: string,
    taxes: string[],
    payment_id: string,
    hint: string,
    patient: {
        first_name: string,
        last_name: string,
    },
    doctor: {
        name: {
            en: string
        },
        price: number,
        discount_price: number
    }
}
const Details = () => {

    const router = useRouter()
    const query = router.query;
    const appointment_id = query.appointment_id;
    const [myAppointment, setMyAppointment] = useState<IMyAppointment>();

    const [openPopup, setOpenPopup] = useState(false);
    const popRef = useRef<HTMLDivElement>(null)

    const token = useSelector((state: RootState) => state.auth.token);
    // no token => go to login
    useEffect(() => {
        if (!token) router.push(LOGIN_ROUTE);
    }, [token]);

    useEffect(() => {
        if (appointment_id) {
            getAppointment(appointment_id as string)
                .then((res) => {
                    if (res.success == true) {
                        // console.log(res.data);
                        setMyAppointment(res.data);
                        // awesomeAlert({msg: res.message});
                    } else {
                        console.error({msg: res.message[0][0], type: AlertTypeEnum.error});
                    }
                })
                .catch((error) => {
                    console.error({
                        msg: error?.response?.data?.message,
                        type: AlertTypeEnum.error
                    })
                })
        }
    }, [appointment_id])

    const [time, setTime] = useState("");
    const [day, setDay] = useState(0);
    const [month, setMonth] = useState("");
    const [year, setYear] = useState(2023);

    const [status, setStatus] = useState("1");

    const [taxAmount, setTaxAmount] = useState("-");

    useEffect(() => {
        // Input date string
        const dateString = myAppointment?.appointment_at || '';

        // Create a new Date object
        const date = new Date(dateString);

        // Extract the desired components
        const hours = date.getHours(); // Get the hours (in 24-hour format)
        const minutes = date.getMinutes(); // Get the minutes
        // Format the time
        const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;

        const formattedDay = date.getDate(); // Get the day of the month
        const formattedMonth = date.toLocaleString('default', {month: 'long'}); // Get the month name

        const formattedYear = date.getFullYear();

        setTime(formattedTime);
        setDay(formattedDay);
        setMonth(formattedMonth);
        setYear(formattedYear);

        const itemStatus = myAppointment?.appointment_status_id || '';

        if (itemStatus == '1') {
            setStatus("Received");
        } else if (itemStatus == "10") {
            setStatus("Accepted");
        } else if (itemStatus == "50") {
            setStatus("Done");
        } else if (itemStatus == "60") {
            setStatus("Failed");
        }

        if (myAppointment?.taxes) {
            setTaxAmount(myAppointment?.taxes[0]);
        }

    }, [myAppointment])

    // const handleCancel = () => {
    //   cancelAppointment(appointment_id as string, {cancel: true})
    //   .then((res) => {
    //     if(res.success == true){
    //       console.log(res.data);
    //       awesomeAlert({msg: res.message});
    //     }else{
    //       awesomeAlert({msg: res.message[0][0], type: AlertTypeEnum.error});
    //     }
    //   })
    //   .catch((error) => {
    //     console.error({
    //       msg: error?.response?.data?.message,
    //       type: AlertTypeEnum.error
    //     })
    //   })
    //   .finally(() => {
    //     // awesomeAlert({msg: "appointment cancelled"});
    //     router.push(APPOINTMENTS_ROUTE);
    //   })
    // }

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
                // router.reload();
                router.push(APPOINTMENTS_ROUTE);
            })
    }

    return (
        // <Box sx={{maxWidth: "var(--maxWidthApp)", margin: '75px auto 55px'}}>
        //   <Box borderRadius={theme.shape.borderRadius} p={2} sx={{boxShadow: 'var(--global-box-shadow)', backgroundColor: '#fff'}}>
        //     hi
        //     {appointment_id}
        //     {myAppointment.id ?? ''}
        //     {myAppointment.doctor?.name?.en ?? ''}
        //   </Box>
        // </Box>

        <>
            <Box sx={{position: 'relative'}}>
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
                <Box sx={{width: '100%', height: '40vh', overflow: 'hidden'}}>
                    <Image src={englandBridge} alt="psychologist"
                           style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                </Box>
                <Box sx={{maxWidth: '700px', margin: '-100px auto 55px'}}>
                    <Box sx={{width: '100%', position: 'absolute', marginTop: '-50px', maxWidth: '700px'}}>
                        <Box sx={{
                            backgroundColor: '#fff',
                            padding: '0 25px',
                            margin: '0 25px',
                            borderRadius: '20px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            boxShadow: 'var(--global-box-shadow)'
                        }}>
                            <Grid container spacing={0} sx={{width: '100%', margin: '0 auto', padding: '11px 0'}}>
                                <Grid item xs={8} sx={{padding: '5px 0'}}>
                                    <Box sx={{textAlign: 'left', color: 'primary.main'}}>
                                        {/* Ranem Yatakan */}
                                        {/* {doctorInfo.name? doctorInfo.name.en: "Ranem Yatakan"} */}
                                        {`${myAppointment?.patient?.first_name} ${myAppointment?.patient?.last_name}`}
                                    </Box>
                                    <Box>
                                        {/* <Rating
                      name="text-feedback"
                      value={ratingValue}
                      readOnly
                      precision={0.5}
                      sx={{fontSize: '15px'}}
                      emptyIcon={<StarIcon sx={{ opacity: 0.55 }} fontSize="inherit" />}
                    /> */}
                                    </Box>
                                    <Box sx={{
                                        textAlign: 'left',
                                        color: 'gray',
                                        fontSize: '12px',
                                        margin: '10px 0 15px'
                                    }}>
                                        Online
                                    </Box>
                                </Grid>
                                <Grid item xs={4} sx={{padding: '5px'}}>
                                    <Box sx={{
                                        backgroundColor: 'primary.main',
                                        color: '#fff',
                                        borderRadius: '15px',
                                        padding: '10px',
                                        height: '100%',
                                        Bottom: '16px',
                                        fontWeight: 'normal',
                                        fontSize: '14px'
                                    }}>
                                        {time} <br/> {day} <br/> {month}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {/* <Box sx={{marginTop: '75px', padding: '65px 25px 0'}}>
            <Box sx={{backgroundColor: '#FFB6C1', width: 'fit-content', padding: '2px 10px', borderRadius: '50px', color: '#DC143C'}}>Psychologist</Box>
          </Box> */}
                    <Box sx={{marginTop: '95px', padding: '65px 25px 0'}}>
                        <Box sx={{
                            marginTop: '25px',
                            backgroundColor: '#fff',
                            padding: '0 25px',
                            borderRadius: '20px',
                            boxShadow: 'var(--global-box-shadow)'
                        }}>
                            <Grid container sx={{
                                fontWeight: 'bold',
                                padding: '15px 0',
                                color: 'primary.main',
                                justifyContent: 'space-between'
                            }}>
                                <Grid item>
                                    Contact Counselor
                                </Grid>
                                <Grid item>
                                    {/* <Link href={`mailto:${doctorEmail}`} target='_blank' style={{backgroundColor: '#dbdeff', color: '#757ce8', width: 'fit-content', padding: '5px 7px', borderRadius: '5px', minWidth: 'fit-content', margin: '0 5px'}}>
                    <PhoneAndroidIcon />
                  </Link> */}
                                    <Link href={`mailto:${doctorEmail}`} target='_blank' style={{
                                        backgroundColor: '#dbdeff',
                                        color: '#757ce8',
                                        width: 'fit-content',
                                        padding: '5px 7px',
                                        borderRadius: '5px',
                                        minWidth: 'fit-content',
                                        margin: '0 5px'
                                    }}>
                                        <MailOutlineIcon/>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{
                            marginTop: '25px',
                            backgroundColor: '#fff',
                            padding: '0 25px',
                            borderRadius: '20px',
                            boxShadow: 'var(--global-box-shadow)',
                            fontSize: '14px'
                        }}>
                            <Grid container spacing={0} sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                                <Grid item sx={{fontWeight: 'bold', padding: '15px 0', color: 'primary.main'}}>
                                    Appointment Details
                                </Grid>
                                <Grid item sx={{padding: '0 5px'}}>
                                    {`#${appointment_id}`}
                                </Grid>
                            </Grid>
                            <Box sx={{backgroundColor: '#ddd', height: '1px'}}></Box>
                            <Grid container sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                                <Grid item sx={{padding: '15px 0', color: 'gray'}}>
                                    Status
                                </Grid>
                                <Grid item>
                                    <Box sx={{backgroundColor: '#eee', borderRadius: '15px', padding: '0 15px'}}>
                                        {status}
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box sx={{backgroundColor: '#ddd', height: '1px'}}></Box>
                            <Grid container sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                                <Grid item sx={{padding: '15px 0', color: 'gray'}}>
                                    Payment status
                                </Grid>
                                <Grid item>
                                    <Box sx={{backgroundColor: '#eee', borderRadius: '15px', padding: '0 15px'}}>
                                        {myAppointment?.payment_id ? 'Paid' : 'Not paid'}
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box sx={{backgroundColor: '#ddd', height: '1px'}}></Box>
                            <Grid container sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                                <Grid item sx={{padding: '15px 0', color: 'gray'}}>
                                    Hint
                                </Grid>
                                <Grid item>
                                    <Box sx={{backgroundColor: '#eee', borderRadius: '15px', padding: '0 15px'}}>
                                        {myAppointment?.hint || ''}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{
                            marginTop: '25px',
                            backgroundColor: '#fff',
                            padding: '0 25px',
                            borderRadius: '20px',
                            boxShadow: 'var(--global-box-shadow)',
                            fontSize: '14px'
                        }}>
                            <Grid container spacing={0} sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                                <Grid item sx={{fontWeight: 'bold', padding: '15px 0', color: 'primary.main'}}>
                                    Appointment Date & Time
                                </Grid>
                            </Grid>
                            <Box sx={{backgroundColor: '#ddd', height: '1px'}}></Box>
                            <Grid container sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                                <Grid item sx={{padding: '15px 0', color: 'gray'}}>
                                    Appointment at
                                </Grid>
                                <Grid item>
                                    <Box sx={{backgroundColor: '#eee', borderRadius: '15px', padding: '0 15px'}}>
                                        {`${day}, ${month} ${year} \u00A0 ${time}`}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{
                            marginTop: '25px',
                            backgroundColor: '#fff',
                            padding: '0 25px',
                            borderRadius: '20px',
                            boxShadow: 'var(--global-box-shadow)',
                            fontSize: '14px'
                        }}>
                            <Grid container spacing={0} sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                                <Grid item sx={{fontWeight: 'bold', padding: '15px 0', color: 'primary.main'}}>
                                    Pricing
                                </Grid>
                            </Grid>
                            <Box sx={{backgroundColor: '#ddd', height: '1px'}}></Box>
                            <Grid container sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                                <Grid item sx={{padding: '15px 0', color: 'gray'}}>
                                    {myAppointment?.doctor?.name?.en || ""}
                                </Grid>
                                <Grid item>
                                    <Box sx={{backgroundColor: '#eee', borderRadius: '15px', padding: '0 15px'}}>
                                        {myAppointment?.doctor?.discount_price.toFixed(2) || ""} {currencySymbol}
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box sx={{backgroundColor: '#ddd', height: '1px'}}></Box>
                            <Grid container sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                                <Grid item sx={{padding: '15px 0', color: 'gray'}}>
                                    Tax Amount
                                </Grid>
                                <Grid item>
                                    <Box sx={{backgroundColor: '#eee', borderRadius: '15px', padding: '0 15px'}}>
                                        {taxAmount || "-"}
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box sx={{backgroundColor: '#ddd', height: '1px'}}></Box>
                            <Grid container sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                                <Grid item sx={{padding: '15px 0', color: 'gray'}}>
                                    Subtotal
                                </Grid>
                                <Grid item>
                                    <Box sx={{backgroundColor: '#eee', borderRadius: '15px', padding: '0 15px'}}>
                                        {myAppointment?.doctor?.discount_price.toFixed(2) || ""} {currencySymbol}
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box sx={{backgroundColor: '#ddd', height: '1px'}}></Box>
                            <Grid container sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                                <Grid item sx={{padding: '15px 0', color: 'gray'}}>
                                    Total amount
                                </Grid>
                                <Grid item>
                                    <Box sx={{color: 'primary.main', fontSize: '16px', fontWeight: 'bold'}}>
                                        {myAppointment?.doctor?.discount_price.toFixed(2) || ""} {currencySymbol}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {/* <Box sx={{marginTop: '25px' , padding: '15px 25px', borderRadius: '20px'}}> */}
                    {/* <Button sx={{backgroundColor: '#0063cc'}} variant="contained">hu</Button> */}
                    {/* <ColorButton sx={{width: '100%'}} variant="contained">Book Counselor</ColorButton> */}
                    {/* </Box> */}

                    <Box sx={{position: 'relative', marginTop: '10px', padding: '15px 25px', borderRadius: '20px'}}>
                        {/* Rest of the code */}

                        {/* Add the GoToCheckout component */}
                        <Grid container>
                            <Grid item xs={true}>
                                {
                                    !!myAppointment &&
                                    <GoToCheckout myAppointment={myAppointment} taxAmount={taxAmount}/>
                                }
                            </Grid>
                            <Grid item xs={2} sx={{textAlign: 'center'}}>
                                <Button variant="contained" sx={{
                                    backgroundColor: "#ddd",
                                    color: '#777',
                                    '&:hover': {
                                        backgroundColor: '#777',
                                        color: '#fff'
                                    }
                                }} color="inherit" onClick={() => setOpenPopup(true)}>Cancel</Button>
                            </Grid>
                        </Grid>
                        {/* Rest of the code */}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Details;
