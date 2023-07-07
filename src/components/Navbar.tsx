import {Box, Button} from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import Link from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "@/store";
import {setToken} from "@/store/auth/authSlice";
import {LOGIN_ROUTE} from "@/utils/endpoints/routes";

const Navbar = () => {

    const router = useRouter()

    const [selected, setSelected] = useState(useRouter().asPath.split('/')[1]);
    const inactiveStyle = {
        color: '#aaadde',
        width: 'fit-content',
        borderRadius: '5px',
        minWidth: 'fit-content',
        textTransform: 'capitalize'
    }
    const activeStyle = {
        color: 'primary',
        borderRadius: '5px',
        justifyContent: 'space-evenly',
        backgroundColor: '#dbdeff',
        textTransform: 'capitalize',
        textOverflow: 'ellipsis',
        width: '100px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: "block"
    }
    const hide = {display: 'none'}

    const handleBarClick = (name: string) => {
        setSelected(name);
    }
    const token = useSelector((state: RootState) => state.auth.token);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(setToken(null));
        router.push(LOGIN_ROUTE);
    }

    return (
        <Box>
            {token ? (
                <Box>
                    <Box sx={{position: 'fixed', top: '0', left: '0', zIndex: 2, color: '#000', width: '100%'}}>
                        <Box sx={{
                            maxWidth: '650px', margin: '0 auto', padding: '15px 25px', display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            {
                                /* <Button sx={{minWidth: 'fit-content', backgroundColor: 'var(--backgroundGray)'}}>
                                    <NotesIcon sx={{color: '#000'}}/>
                                </Button> */
                            }
                            <Button color="primary" onClick={() => logout()} sx={{
                                '&:hover': {color: '#fff', backgroundColor: '#757ce8'},
                                backgroundColor: '#fff',
                                minWidth: 'fit-content'
                            }}>
                                <LogoutIcon/>
                            </Button>
                        </Box>
                    </Box>

                    <Box
                        sx={{display: 'flex', position: 'fixed', justifyContent: 'center', width: '100%', bottom: '0'}}>
                        <Box boxShadow={2} sx={{
                            width: 'clamp(200px, 100%, 650px)',
                            justifyContent: 'space-between',
                            backgroundColor: 'var(--backgroundGray)',
                            borderRadius: '10px 10px 0 0',
                            padding: '10px 15px',
                            display: 'flex'
                        }}>
                            <Link href="/home">
                                <Button className='routeIcon' onClick={() => handleBarClick('home')} name="home"
                                        sx={selected === 'home' ? activeStyle : inactiveStyle}>
                                    <HomeOutlinedIcon/>
                                    <span style={{width: '10px'}}> </span>
                                    {selected === 'home' ? "Home" : ""}
                                </Button>
                            </Link>
                            <Link href="/appointments">
                                <Button onClick={() => handleBarClick('appointments')} name="appointments"
                                        sx={selected === 'appointments' ? activeStyle : inactiveStyle}>
                                    <AssignmentOutlinedIcon/>
                                    <span style={{width: '10px'}}> </span>
                                    {selected === 'appointments' ? "Appointment" : ""}
                                </Button>
                            </Link>
                            {/* <Link href="/chats">
                    <Button onClick={() => handleBarClick('chats')} name="chats" sx={selected === 'chats'? activeStyle : inactiveStyle}>
                        <MessageOutlinedIcon />
                        <span style={{width: '10px'}}> </span>
                        {selected === 'chats'? "Message" : ""}
                    </Button>
                </Link> */}
                            <Link href="/patients">
                                <Button onClick={() => handleBarClick('patients')} name="patients"
                                        sx={selected === 'patients' ? activeStyle : inactiveStyle}>
                                    <PeopleAltOutlinedIcon/>
                                    <span style={{width: '10px'}}> </span>
                                    {selected === 'patients' ? "Patients" : ""}
                                </Button>
                            </Link>
                            {/* <Link href="/account">
                    <Button onClick={() => handleBarClick('account')} name="account" sx={selected === 'account'? activeStyle : inactiveStyle}>
                        <PersonOutlineOutlinedIcon />
                        <span style={{width: '10px'}}> </span>
                        {selected === 'account'? "Account" : ""}
                    </Button>
                </Link> */}
                        </Box>
                    </Box>
                </Box>
            ) : null}
        </Box>
    );
};

export default Navbar;
