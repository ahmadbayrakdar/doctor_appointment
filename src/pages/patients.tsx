import {RootState} from "@/store";
import {LOGIN_ROUTE} from "@/utils/endpoints/routes";
import {Box} from "@mui/material";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getPatientsWithUserId} from "@/utils/services/patients";
import awesomeAlert from "@/utils/functions/alert";
import {AlertTypeEnum} from "@/utils/enums/alertType";
import PatientCard from "@/components/PatientCard";
import {IPatient} from "@/utils/enums/patients";

const Patients = () => {
    const [myPatients, setMyPatients] = useState<IPatient[]>([]);
    const user_id = useSelector((state: RootState) => state.auth.user?.id);
    const router = useRouter()
    const token = useSelector((state: RootState) => state.auth.token);
    const getPatients = () => {
        if (user_id) {
            getPatientsWithUserId(user_id)
                .then((res) => {
                    if (res.success) {
                        setMyPatients(res.data);
                        // awesomeAlert({msg: res.message});
                    } else {
                        awesomeAlert({msg: res.message[0][0], type: AlertTypeEnum.error});
                    }
                    // console.log("p: "+myPatients);
                })
                .catch((error) => {
                    // Handle login error here
                    awesomeAlert({
                        msg: error?.response?.data?.message,
                        type: AlertTypeEnum.error
                    })
                });
        }
    };

    // no token => go to login
    useEffect(() => {
        if (!token) router.push(LOGIN_ROUTE);
    }, [token]);

    // Call getUserID when the component mounts
    useEffect(() => {
        getPatients();
    }, [user_id]);

    return (
        <Box sx={{maxWidth: '650px', margin: '0 auto'}}>
            <Box sx={{
                textAlign: 'center',
                color: 'primary.main',
                fontWeight: 'bold',
                fontSize: '18px',
                padding: '20px 0',
                position: 'fixed',
                top: 0,
                width: '100%',
                backgroundColor: 'var(--backgroundGray)',
                zIndex: '1',
                maxWidth: '650px'
            }}>Patients</Box>
            <Box sx={{padding: '20px 25px', margin: '40px 0 35px'}}>
                {myPatients.map((patient, i) => (
                    <PatientCard key={i} patientData={myPatients[i]}/>
                ))}
            </Box>
        </Box>
    );
};

export default Patients;
