import * as React from 'react';
import {useState} from 'react';
import {Box} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {DialogTransition} from "@/components/global/DialogTransition";

import LoadingButton from "@mui/lab/LoadingButton";

export type StripeHTMLResponse = string;
export const lightBorder = {border: '1px solid #ebebeb99'}

export default function StripeDialog(props: {
    handleCheckout: Function,
    stripeHTMLResponse: StripeHTMLResponse | undefined
}) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        props.handleCheckout()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            {/* <Button variant="contained" sx={{width: '100%', backgroundcolor: "deepPurple"}}>Book Counselor</Button> */}
            <LoadingButton
                loading={loading}
                onClick={handleClickOpen}
                fullWidth
                variant="contained">
                Confirm & Pay Now
            </LoadingButton>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={DialogTransition}
            >

                <Box sx={{
                    backgroundColor: '#fafafa',
                    width: 'clamp(200px, 90%, 700px)',
                    margin: '0 auto'
                }}>
                    <AppBar
                        sx={{position: 'relative', backgroundColor: 'white', boxShadow: 'none', color: 'primary.main'}}>
                        <Toolbar>
                            <IconButton
                                color="primary"
                                onClick={handleClose}
                                aria-label="close">
                                <ArrowBackIosNewIcon/>
                            </IconButton>
                            <Typography sx={{ml: 2, flex: 1, textAlign: 'center', fontFamily: 'inherit'}}
                                        variant="h6" component="div">
                                Pay
                            </Typography>
                            {/* <Button autoFocus color="inherit" onClick={handleClose}>save</Button> */}
                        </Toolbar>
                    </AppBar>
                    <Box>
                        <iframe src={props.stripeHTMLResponse} style={{width: '100%', height: '500px'}}/>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
}
