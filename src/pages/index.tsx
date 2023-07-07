import HomeLayout from '@/components/layouts/HomeLayout'
import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { login } from "@/utils/services/auth";
import awesomeAlert from "@/utils/functions/alert";
import LoadingButton from "@mui/lab/LoadingButton";
import { HOME_ROUTE, REGISTER_ROUTE } from "@/utils/endpoints/routes";
import { AlertTypeEnum } from "@/utils/enums/alertType";
import { RootState } from "@/store";
import { theme } from '@/utils/theme';
import Link from 'next/link';
import { setToken, setToken2, setUser } from "@/store/auth/authSlice";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '@/firebase';

type IFirebaseUser = {
    accessToken: string,
    email: string,
    emailVerified: boolean,
    isAnonymous: boolean,
    phoneNumber: null | number,
    photoURL: null | string,
    providerData: [],
    reloadUserInfo: { localId: string, email: string, passwordHash: string, emailVerified: boolean },
    stsTokenManager: { refreshToken: string, accessToken: string, expirationTime: number },
    uid: string,

}


const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const firebaseRegister = async (email: any, password: any) => {
        try {
            const auth = getAuth(app);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            // @ts-ignore
            // console.log(11, user.accessToken);
            // console.log(12);
            awesomeAlert({ msg: `Login Successfully` });
            dispatch(setToken2(user.accessToken));
            router.push(HOME_ROUTE);
        } catch (error: any) {
            awesomeAlert({ msg: `wrong credentials`, type: AlertTypeEnum.error });
            console.log(error.code, error.message);
            // Handle error and display appropriate messages to the user
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = event.currentTarget.email.value;
        const password = event.currentTarget.password.value;
        setLoading(true)
        login({ email, password })
            // @ts-ignore
            .then((res) => {
                setLoading(false)
                if (res.success == true) {
                    // awesomeAlert({ msg: `Login Successfully` });
                    dispatch(setUser(res.data));
                    dispatch(setToken(res.data.api_token));
                    firebaseRegister(email, password);
                } else {
                    awesomeAlert({ msg: res.message[0][0], type: AlertTypeEnum.error });
                }
            })
            .catch((error) => {
                setLoading(false)
                // Handle login error here
                awesomeAlert({
                    msg: error?.response?.data?.message,
                    type: AlertTypeEnum.error
                })
            });
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const token = useSelector((state: RootState) => state.auth.token);
    // token => go to home
    // useEffect(() => {
    //     if (!!token) {
    //         router.push(HOME_ROUTE);
    //     }
    // }, [token]);

    return <HomeLayout>
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
                    >LOGIN</h1>
                    <FormControl fullWidth sx={{ mt: 6 }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                        <OutlinedInput
                            endAdornment={
                                <InputAdornment position="end">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                            name='email'
                            id="outlined-adornment-email"
                            label="Email"
                            type="email"
                            required
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            required
                        />
                    </FormControl>
                    <Box className="text-right">
                        <LoadingButton
                            loading={loading}
                            className="rounded-2xl"
                            type='submit'
                            fullWidth
                            variant="contained"
                            sx={{ px: 4, mt: 3 }}
                        >Login</LoadingButton>
                    </Box>
                    <Box sx={{
                        padding: '20px 0',
                        textAlign: 'center',
                        color: theme.palette.primary.main,
                        '&:hover': { textDecoration: 'underline' }
                    }}>
                        <Link href={{ pathname: REGISTER_ROUTE }}>register new account</Link>
                    </Box>
                </Box>
            </Box>

        </form>

    </HomeLayout>
}

export default Login
