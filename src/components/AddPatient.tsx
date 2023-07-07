import {Box, IconButton, InputAdornment, MenuItem, Select} from "@mui/material"
import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneInput from 'react-phone-number-input'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MaleIcon from '@mui/icons-material/Male';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import HeightIcon from '@mui/icons-material/Height';
import {createPatient} from "@/utils/services/patients";
import awesomeAlert from "@/utils/functions/alert";
import {AlertTypeEnum} from "@/utils/enums/alertType";
import Media from "@/utils/services/media_model";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {IPatient} from "@/utils/enums/patients";

const AddPatient = () => {
    const user_id = useSelector((state: RootState) => state.auth.user?.id);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [images, setImages] = useState<Media[]>([]);
    const [selectedImage, setSelectedImage] = useState<Media | null>(null);

    const handleImage = (item: Media) => {
        setSelectedImage(item);
        setImages((prevImages) => [...prevImages, item]);
    }

    const handleMobileChange = (value: 'string') => {
        setMobileNumber(value);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createPatientFn = () => {
        // console.log({images});
        if (user_id) {
            const payload = {
                user_id,
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                mobile_number: mobileNumber,
                age,
                gender,
                weight,
                height,
                images
            } as IPatient

            createPatient(payload)
                .then((res) => {
                    if (res.success == true) {
                        awesomeAlert({msg: `Patient Created Successfully`});
                        window.location.reload();
                    } else {
                        awesomeAlert({msg: res.message[0][0], type: AlertTypeEnum.error});
                    }
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

    return (
        <Box>
            <IconButton
                edge="start"
                color="primary"
                aria-label="close"
                sx={{
                    fontSize: '15px',
                    borderRadius: '10px',
                    color: 'primary.dark',
                    padding: '10px 20px'
                }}
                onClick={handleClickOpen}
            >
                Add
                <AddCircleOutlineIcon sx={{marginLeft: '10px'}}/>
            </IconButton>
            <Dialog open={open} onClose={handleClose} sx={{'& .MuiPaper-root': {width: '100%', height: '100%'}}}>
                <DialogTitle>Add Patient</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill in the following details
                    </DialogContentText>
                    <>
                        <TextField
                            sx={{my: 2}}
                            autoFocus
                            size='small'
                            id="name"
                            label="First Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon sx={{color: 'primary.main'}}/>
                                    </InputAdornment>
                                ),
                            }}
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                        <TextField
                            sx={{my: 2}}
                            autoFocus
                            size='small'
                            id="lastName"
                            label="Last Name"
                            type="text"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon sx={{color: 'primary.main'}}/>
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                        />
                        <label style={{marginTop: '5px'}}>Phone Number</label>
                        <PhoneInput
                            international
                            defaultCountry="SA"
                            value={mobileNumber}
                            onChange={handleMobileChange}
                            style={{display: 'flex', flexWrap: 'wrap'}}
                        />
                        <TextField
                            sx={{my: 2}}
                            autoFocus
                            size='small'
                            id="age"
                            label="Age"
                            type="number"
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountBoxIcon sx={{color: 'primary.main'}}/>
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{
                                min: 1,
                            }}
                            value={age}
                            onChange={(event) => setAge(event.target.value)}
                        />
                        <label style={{
                            display: 'block',
                            marginTop: '5px',
                            width: '100%',
                            padding: '0 0 10px 0'
                        }}>Gender</label>
                        <Select
                            sx={{mb: 2}}
                            labelId="select-label"
                            id="gender"
                            size='small'
                            variant="outlined"
                            fullWidth
                            value={gender}
                            startAdornment={<MaleIcon sx={{color: 'primary.main'}}/>}
                            onChange={(event) => setGender(event.target.value)}
                        >
                            {/* <MenuItem value="">None</MenuItem> */}
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>

                        <TextField
                            sx={{my: 2}}
                            autoFocus
                            size='small'
                            id="weight"
                            label="Weight (kg)"
                            type="number"
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MonitorWeightIcon sx={{color: 'primary.main'}}/>
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{
                                min: 1,
                            }}
                            value={weight}
                            onChange={(event) => setWeight(event.target.value)}
                        />

                        <TextField
                            sx={{my: 2}}
                            autoFocus
                            size='small'
                            id="height"
                            label="height (cm)"
                            type="number"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HeightIcon sx={{color: 'primary.main'}}/>
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            inputProps={{
                                min: 1,
                            }}
                            value={height}
                            onChange={(event) => setHeight(event.target.value)}
                        />
                    </>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={createPatientFn}>Create Patient</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default AddPatient;
