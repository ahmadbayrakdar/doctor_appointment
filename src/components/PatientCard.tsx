import {Box, Grid} from "@mui/material";
import defaultImage from "../images/download.png";
import Image from 'next/image'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {useState} from "react";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import HeightIcon from '@mui/icons-material/Height';
import {theme} from "@/utils/theme";
import {IPatient} from "@/utils/enums/patients";

type Props = {
    patientData: IPatient
}

const PatientCard = (props: Props) => {

    const [gender, setGender] = useState('Male');

    return (
        <Box borderRadius={theme.shape.borderRadius} bgcolor={'#fff'} sx={{boxShadow: 'var(--global-box-shadow)'}}>
            <Grid container spacing={0} sx={{
                borderRadius: '15px',
                width: '100%',
                padding: '20px',
                margin: '20px 0',
                justifyContent: 'space-between',
                position: 'relative',
                backgroundColor: "var(--background-end-rgb)"
            }}>
                <Grid item xs={3} sx={{height: '150px'}}>
                    <Box sx={{height: '100%', backgroundColor: 'lightgray', borderRadius: '10px', overflow: 'hidden'}}>
                        <Image
                            style={{
                                objectFit: 'cover',
                                height: '100%'
                            }}
                            src={defaultImage}
                            alt="default image"
                        />
                    </Box>
                </Grid>
                <Grid container xs={8} spacing={0}
                      sx={{fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px', margin: '0'}}>
                    <Grid container spacing={0} sx={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        margin: '0',
                        width: '100%',
                        borderBottom: 'solid 1px #ededed'
                    }}>
                        <Box sx={{fontSize: '17px'}}>
                            {/* Patient's Name */}
                            {props.patientData.first_name}
                        </Box>
                    </Grid>
                    <Grid container spacing={0} sx={{
                        fontSize: '14px',
                        fontWeight: 'normal',
                        letterSpacing: '1px',
                        margin: '0',
                        borderBottom: 'solid 1px #ededed',
                        width: '100%'
                    }}>
                        <Grid xs={3} item sx={{minWidth: 'fit-content', padding: '10px 20px 10px 0'}}>
                            <AccountBoxIcon/> {props.patientData.age}
                        </Grid>
                        <Grid xs={3} item sx={{minWidth: 'fit-content', padding: '10px 20px 10px 0'}}>
                            {(gender == 'Male') ? (<MaleIcon/>) : (<FemaleIcon/>)} {gender}
                        </Grid>
                        <Grid xs={3} item sx={{minWidth: 'fit-content', padding: '10px 20px 10px 0'}}>
                            <MonitorWeightIcon/> {props.patientData.weight} KG
                        </Grid>
                        <Grid xs={3} item sx={{minWidth: 'fit-content', padding: '10px 20px 10px 0'}}>
                            <HeightIcon/> {props.patientData.height} CM
                        </Grid>
                    </Grid>
                    <Box sx={{fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px', margin: '0', width: '100%'}}>
                        <Box sx={{padding: '0 0 20px'}}>
                            Total Appointments: {props.patientData.total_appointments}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PatientCard;
