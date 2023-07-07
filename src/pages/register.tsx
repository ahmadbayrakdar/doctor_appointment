import HomeLayout from "@/components/layouts/HomeLayout";
import {RootState} from "@/store";
import {HOME_ROUTE, LOGIN_ROUTE} from "@/utils/endpoints/routes";
import {AlertTypeEnum} from "@/utils/enums/alertType";
import awesomeAlert from "@/utils/functions/alert";
import {register} from "@/utils/services/auth";
import {theme} from "@/utils/theme";
import {AccountCircle, Visibility, VisibilityOff} from "@mui/icons-material";
import {Box} from "@mui/joy";
import {LoadingButton} from "@mui/lab";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import Link from "next/link";
import {useRouter} from "next/router";
import {FormEvent, MouseEvent, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import CallIcon from '@mui/icons-material/Call';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from "@/firebase"; // Import the firebase.js file with your Firebase initialization


const Register = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const token = useSelector((state: RootState) => state.auth.token);
    // token => go home
    useEffect(() => {
        if (!!token) {
            router.push(HOME_ROUTE);
        }
    }, [token]);

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const firebaseRegister = async () => {
        try {
            const auth = getAuth(app);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // console.log(user);
            // You can perform additional actions here, such as saving user data to a database
            router.push(LOGIN_ROUTE);
          } catch (error: any) {
            console.log(error.code, error.message);
            // Handle error and display appropriate messages to the user
          }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        register({name, email, password, phone_number: phoneNumber})
            .then((res) => {
                if (res.success === true) {
                    awesomeAlert({msg: "Registration Successful"});
                    firebaseRegister();
                    // router.push(LOGIN_ROUTE);
                } else {
                    awesomeAlert({msg: res.message[0][0], type: AlertTypeEnum.error});
                }
            })
            .catch((error) => {
                awesomeAlert({
                    msg: error?.res?.message,
                    type: AlertTypeEnum.error,
                });
            });
    };

    return (
        <HomeLayout>
            <form onSubmit={handleSubmit}>
                <Box
                    sx={{
                        display: 'flex',
                        alignContent: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        alignItems: 'center',
                    }}>
                    <Box className='p-5'>
                        <h1 style={{
                            fontSize: '40px',
                            fontWeight: "900",
                            textAlign: 'center',
                            color: '#757ce8'
                        }}
                        >REGISTER</h1>
                        <FormControl fullWidth sx={{mt: 6}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
                            <OutlinedInput
                                endAdornment={
                                    <InputAdornment position="end">
                                        <SentimentSatisfiedAltIcon/>
                                    </InputAdornment>
                                }
                                name='text'
                                id="outlined-adornment-name"
                                label="Name"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{mt: 2}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                            <OutlinedInput
                                endAdornment={
                                    <InputAdornment position="end">
                                        <AccountCircle/>
                                    </InputAdornment>
                                }
                                name='email'
                                id="outlined-adornment-email"
                                label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                type="email"
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{mt: 2}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-phone-number">Phone Number</InputLabel>
                            <OutlinedInput
                                endAdornment={
                                    <InputAdornment position="end">
                                        <CallIcon/>
                                    </InputAdornment>
                                }
                                name='phone-number'
                                id="outlined-adornment-phone-number"
                                label="Phone Number"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{mt: 2}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <Box className="text-right">
                            <LoadingButton
                                loading={loading}
                                className="rounded-2xl"
                                type='submit'
                                fullWidth
                                variant="contained"
                                sx={{px: 4, mt: 3}}
                            >REGISTER</LoadingButton>
                        </Box>
                        <Box sx={{
                            padding: '20px 0',
                            textAlign: 'center',
                            color: theme.palette.primary.main,
                            '&:hover': {textDecoration: 'underline'}
                        }}>
                            <Link href={{pathname: LOGIN_ROUTE}}>sign in</Link>
                        </Box>
                    </Box>
                </Box>

            </form>
        </HomeLayout>
    );
};

export default Register;
