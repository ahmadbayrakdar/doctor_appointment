import {RootState} from "@/store";
import {LOGIN_ROUTE} from "@/utils/endpoints/routes";
import {Box} from "@mui/material";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useSelector} from "react-redux";

const Account = () => {

    const router = useRouter()
    const token = useSelector((state: RootState) => state.auth.token);
    // no token => go to login
    useEffect(() => {
        if (!token) router.push(LOGIN_ROUTE);
    }, [token]);

    return (
        <Box sx={{maxWidth: '650px', margin: '0 auto'}}>
            <Box sx={{
                textAlign: 'center',
                color: 'primary.main',
                fontWeight: 'bold',
                fontSize: '18px',
                padding: '20px 0 0'
            }}>Counselor Appointments</Box>
            <Box sx={{padding: '20px 25px'}}>
                Account
            </Box>
        </Box>
    );
};

export default Account;
