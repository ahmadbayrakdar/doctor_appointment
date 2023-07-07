import Image from 'next/image'
import {Inter} from 'next/font/google'
import psychologistImage from '../images/pexels-shvets-production-7176036.jpg'
import {Box, Grid} from '@mui/material'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import {currencySymbol, doctorEmail} from '@/utils/endpoints/consts/global'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookCounselorDialog from "@/components/BookCounselorDialog";
import {useRouter} from 'next/router'
import {useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {RootState} from '@/store'
import {LOGIN_ROUTE} from '@/utils/endpoints/routes'
import {getDoctor} from '@/utils/services/doctor'
import awesomeAlert from '@/utils/functions/alert'
import {AlertTypeEnum} from '@/utils/enums/alertType'
import Link from 'next/link'

export type IDoctorInfo = {
    rate?: number,
    description?: { en: string },
    name?: { en: string }
    available?: boolean,
    price?: number,
    discount_price?: string,
}

const inter = Inter({subsets: ['latin']})
export const DoctorId = "1"
export default function Home() {
    const [ratingValue, setRatingValue] = useState(5);
    const [doctorInfo, setDoctorInfo] = useState<IDoctorInfo>({});

    const [descriptionText, setDescriptionText] = useState<string>("");

    const router = useRouter()
    const token = useSelector((state: RootState) => state.auth.token);
    // no token => go to login
    useEffect(() => {
        if (!token) router.push(LOGIN_ROUTE);
    }, [token]);

    useEffect(() => {

        getDoctor(DoctorId)
            .then((res) => {
                if (res.success == true) {
                    setDoctorInfo(res.data);
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
    }, [])

    useEffect(() => {
        // console.log(doctorInfo);
        if (doctorInfo?.rate)
            setRatingValue(doctorInfo?.rate)

        const htmlString = doctorInfo.description?.en || '';

        const parser = new DOMParser();
        const parsedHtml = parser.parseFromString(htmlString, 'text/html');
        const textContent = parsedHtml.documentElement.textContent || "";

        setDescriptionText(textContent);
    }, [doctorInfo]);

    return (
        <>
            <Box sx={{position: 'relative'}}>
                <Box sx={{width: '100%', height: '40vh', overflow: 'hidden'}}>
                    <Image src={psychologistImage} alt="psychologist"
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
                            <Grid container spacing={2} sx={{width: '100%', margin: '0 auto'}}>
                                <Grid item xs={8} sx={{padding: '5px 0'}}>
                                    <Box sx={{textAlign: 'left', color: 'primary.main'}}>
                                        {/* Ranem Yatakan */}
                                        {doctorInfo.name ? doctorInfo.name.en : "Ranem Yatakan"}
                                    </Box>
                                    <Box sx={{height: '25px'}}></Box>
                                    <Box
                                        sx={{
                                            width: 200,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Rating
                                            name="text-feedback"
                                            value={ratingValue}
                                            readOnly
                                            precision={0.5}
                                            sx={{fontSize: '15px'}}
                                            emptyIcon={<StarIcon sx={{opacity: 0.55}} fontSize="inherit"/>}
                                        />
                                    </Box>
                                    <Box sx={{textAlign: 'left', color: 'gray', fontSize: '12px'}}>ratings (5)</Box>
                                </Grid>
                                <Grid item xs={4} sx={{padding: '5px'}}>
                                    <Box sx={{
                                        backgroundColor: doctorInfo.available ? 'primary.main' : 'lightgray',
                                        borderRadius: '50px',
                                        color: doctorInfo.available ? 'white' : 'gray',
                                        fontSize: '12px',
                                        marginTop: '5px'
                                    }}>
                                        {/* offline */}
                                        {doctorInfo.available ? "online" : "offline"}
                                    </Box>
                                    <Box sx={{
                                        color: 'gray',
                                        fontSize: '20px',
                                        padding: '5px',
                                        textDecoration: 'line-through'
                                    }}>
                                        {doctorInfo.price ? (doctorInfo.price).toFixed(2) : '09.00'} {currencySymbol}
                                    </Box>
                                    <Box sx={{color: '#757ce8', fontSize: '17x'}}>
                                        {doctorInfo.discount_price ? doctorInfo.discount_price : '01.00'} {currencySymbol}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Box sx={{marginTop: '75px', padding: '80px 25px 0'}}>
                        <Box sx={{
                            backgroundColor: '#FFB6C1',
                            width: 'fit-content',
                            padding: '2px 10px',
                            borderRadius: '50px',
                            color: '#DC143C'
                        }}>Psychologist</Box>
                    </Box>
                    <Box sx={{marginTop: '20px', padding: '0 25px'}}>
                        <Box sx={{
                            backgroundColor: '#fff',
                            padding: '0 25px',
                            borderRadius: '20px',
                            boxShadow: 'var(--global-box-shadow)'
                        }}>
                            <Box sx={{fontWeight: 'bold', padding: '15px 0', color: 'primary.main'}}>Description</Box>
                            <Box sx={{backgroundColor: '#ddd', height: '1px'}}></Box>
                            <Box sx={{fontSize: '14px', padding: '15px 0', color: 'gray'}}>

                                {doctorInfo.description ? descriptionText : "I'm a certified lifecoach & psychotherapist specializing in inBoxidual and relationship therapy. My mission is to help people live happier and more fulfilling lives."}
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{marginTop: '20px', padding: '0 25px'}}>
                        <Box sx={{
                            backgroundColor: '#fff',
                            padding: '15px 25px',
                            borderRadius: '20px',
                            boxShadow: 'var(--global-box-shadow)'
                        }}>
                            <Box sx={{fontWeight: 'bold', color: 'primary.main'}}>Contact Us</Box>
                            <Box sx={{textAlign: 'center'}}>
                                <Grid container spacing={2} sx={{
                                    fontSize: '14px',
                                    color: 'gray',
                                    width: '100%',
                                    margin: '0',
                                    justifyContent: 'space-between'
                                }}>
                                    <Grid item xs={8} sx={{width: 'fit-content', textAlign: 'left'}}>
                                        <Box>
                                            If you have any question!
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} sx={{width: 'fit-content', textAlign: 'left'}}>
                                        <Box sx={{textAlign: 'right'}}>
                                            <Link href={`mailto:${doctorEmail}`} target='_blank' style={{
                                                backgroundColor: '#dbdeff',
                                                color: '#757ce8',
                                                width: 'fit-content',
                                                padding: '5px 7px',
                                                borderRadius: '5px',
                                                minWidth: 'fit-content'
                                            }}>
                                                <MailOutlineIcon/>
                                            </Link>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                    {/* <Box sx={{marginTop: '25px' , padding: '15px 25px', borderRadius: '20px'}}> */}
                    {/* <Button sx={{backgroundColor: '#0063cc'}} variant="contained">hu</Button> */}
                    {/* <ColorButton sx={{width: '100%'}} variant="contained">Book Counselor</ColorButton> */}
                    {/* </Box> */}

                    <Box sx={{position: 'relative', marginTop: '10px', padding: '15px 25px', borderRadius: '20px'}}>
                        {/* Rest of the code */}

                        {/* Add the BookCounselorDialog component */}
                        <BookCounselorDialog/>

                        {/* Rest of the code */}
                    </Box>
                </Box>
            </Box>
        </>
    )
}
