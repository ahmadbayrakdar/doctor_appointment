import {Grid} from '@mui/material';
import {theme} from "@/utils/theme";
import {lightBorder} from "@/components/BookCounselorDialog";

import AddPatient from '@/components/AddPatient'

const CreatePatient = (props: { havePatient: Boolean }): JSX.Element => {

    return (<>
            {
                props.havePatient ?
                    <Grid container spacing={2} sx={{
                        ...lightBorder,
                        backgroundColor: '#fff',
                        padding: '15px',
                        borderRadius: theme.shape.borderRadius,
                        width: '100%',
                        margin: '0',
                        fontWeight: 'bold'
                    }}>
                        You already have a patient
                    </Grid>
                    :
                    <Grid container spacing={2} sx={{
                        ...lightBorder,
                        backgroundColor: '#fff',
                        padding: '15px',
                        borderRadius: theme.shape.borderRadius,
                        width: '100%',
                        margin: '0',
                        fontWeight: 'bold'
                    }}>
                        <Grid xs={8} sx={{display: 'flex', alignItems: 'center'}}>Create Patient</Grid>
                        <Grid xs={4} sx={{textAlign: 'end'}}>
                            <AddPatient/>
                        </Grid>
                    </Grid>
            }
        </>
    );
}


export default CreatePatient;
