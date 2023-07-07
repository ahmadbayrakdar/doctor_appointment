import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box, Button, Grid} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {DialogTransition} from "@/components/global/DialogTransition";
import {theme} from "@/utils/theme";
import PaymentIcon from '@mui/icons-material/Payment';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {currencySymbol} from '@/utils/endpoints/consts/global';
import {IMyAppointment} from "@/pages/details";
import {GETSTRIPEURL} from '@/utils/endpoints/endpoints';
import StripeDialog from './StripeDialog';

export const lightBorder = {border: '1px solid #ebebeb99'}

export default function GoToCheckout(props: { myAppointment: IMyAppointment, taxAmount: string }) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(1);
    const [appointmentId, setAppointmentId] = useState<string>("1")

    const [stripeHTMLResponse, setStripeHTMLResponse] = useState<string>();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseSubmit = () => {
        setOpen(false);
    };

    useEffect(() => {
        setAppointmentId(props.myAppointment.id.toString());
    }, [props.myAppointment])

    const hoveredPayment = {
        alignItems: 'center',
        margin: '15px 0',
        padding: '15px 0',
        borderRadius: '15px',
        '&:hover': {
            backgroundColor: 'primary.main',
            color: 'white'
            // Add any other styles you want to change on hover
        }
    };
    const selectedPaymenyStyle = {
        alignItems: 'center',
        margin: '15px 0',
        padding: '15px 0',
        backgroundColor: 'primary.main',
        color: 'white',
        borderRadius: '15px',
    };
    const infoTitle = {
        justifyContent: "space-between",
        padding: "15px"
    }

    const handleCheckout = () => {
        setStripeHTMLResponse(`${process.env.NEXT_PUBLIC_API_URL_WITHOUR_API + GETSTRIPEURL}?appointment_id=${appointmentId}&api_token=`);
    }

    return (
        <Box>
            {/* <Button variant="contained" sx={{width: '100%', backgroundcolor: "deepPurple"}}>Book Counselor</Button> */}
            <Button sx={{width: '100%'}} onClick={handleClickOpen} variant="contained">
                Go To Checkout
            </Button>
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
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <ArrowBackIosNewIcon/>
                            </IconButton>
                            <Typography sx={{ml: 2, flex: 1, textAlign: 'center', fontFamily: 'inherit'}}
                                        variant="h6" component="div">
                                Checkout
                            </Typography>
                            {/* <Button autoFocus color="inherit" onClick={handleClose}>save</Button> */}
                        </Toolbar>
                    </AppBar>
                    <Box sx={{padding: '15px', backgroundColor: 'white'}}>
                        <Grid container sx={{alignItems: 'center'}}>
                            <Grid item sx={{margin: '0 30px 0 15px'}}>
                                <PaymentIcon/>
                            </Grid>
                            <Grid item>
                                <Box sx={{fontWeight: 'bold', fontSize: '20px'}}>Payment Option</Box>
                                <Box sx={{fontSize: '13px'}}>Select your preffered paymend mode</Box>
                            </Grid>
                        </Grid>
                        <Grid container sx={selectedPayment == 1 ? selectedPaymenyStyle : hoveredPayment}>
                            <Grid item sx={{margin: '0 30px'}}>
                                <ErrorOutlineIcon/>
                            </Grid>
                            <Grid item>
                                <Box sx={{fontWeight: 'bold', fontSize: '15px'}}>Credits Card (Stripe)</Box>
                                <Box sx={{fontSize: '13px'}}>Click to pay with your credit card</Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{padding: '15px', backgroundColor: 'white'}}>
                        <Box sx={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Box sx={{
                                ...lightBorder,
                                backgroundColor: 'white',
                                py: 2,
                                px: 2,
                                boxShadow: 'var(--global-box-shadow)',
                                position: 'fixed',
                                bottom: '0',
                                maxWidth: 650 + 50 + 'px',
                                width: '100%',
                                borderStartStartRadius: theme.shape.borderRadius,
                                borderStartEndRadius: theme.shape.borderRadius
                            }}>
                                <Box>
                                    <Box sx={infoTitle}>
                                        <Box sx={{fontWeight: 'bold'}}>
                                            {props.myAppointment?.doctor?.name.en || ""}
                                        </Box>
                                    </Box>
                                    <Box sx={{backgroundColor: '#ddd', height: '1px'}}></Box>
                                    <Grid container sx={infoTitle}>
                                        <Grid item>
                                            Tax Amount
                                        </Grid>
                                        <Grid item sx={{fontWeight: 'bold'}}>
                                            {props.taxAmount || "-"}
                                        </Grid>
                                    </Grid>
                                    <Grid container sx={infoTitle}>
                                        <Grid item>
                                            Subtotal
                                        </Grid>
                                        <Grid item sx={{fontWeight: 'bold'}}>
                                            {props.myAppointment?.doctor?.discount_price || "-"} {currencySymbol}
                                        </Grid>
                                    </Grid>
                                    <Grid container sx={infoTitle}>
                                        <Grid item>
                                            Total Amount
                                        </Grid>
                                        <Grid item sx={{color: 'primary.main', fontWeight: 'bold', fontSize: '20px'}}>
                                            {props.myAppointment?.doctor?.discount_price || "-"} {currencySymbol}
                                        </Grid>
                                    </Grid>
                                </Box>
                                {/* <LoadingButton
                                    loading={loading}
                                    onClick={handleCheckout}
                                    fullWidth
                                    variant="contained">
                                    Confirm & Pay Now
                                </LoadingButton> */}
                                <StripeDialog handleCheckout={handleCheckout} stripeHTMLResponse={stripeHTMLResponse}/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
}
