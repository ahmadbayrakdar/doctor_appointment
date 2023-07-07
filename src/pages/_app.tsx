import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {Box, ThemeProvider} from "@mui/material";
import {theme} from "@/utils/theme";
import {persistor, store} from "@/store";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/module.css'
import Navbar from "@/components/Navbar";


function MyApp({Component, pageProps}: AppProps) {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <Box sx={{backgroundColor: 'var(--backgroundGray)'}}>
                        <Component {...pageProps} />
                        <Navbar/>
                    </Box>
                    <ToastContainer/>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}

export default MyApp;
