import {RootState} from "@/store";
import {HOME_ROUTE} from "@/utils/endpoints/routes";
import {Box} from "@mui/material";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {useEffect} from 'react';

const Chats = () => {

    const router = useRouter()
    const token = useSelector((state: RootState) => state.auth.token);
    // no token => go to login
    useEffect(() => {
        if (!token) {
            router.push(HOME_ROUTE);
        }
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
                Chats
            </Box>
        </Box>
    );
};

export default Chats;
