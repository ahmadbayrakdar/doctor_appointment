import React from 'react';
import {Button} from "@mui/material";

type Props = {
    isActive: boolean;
    isDisabled: boolean;
    onClick: () => void;
    time: number
}

const TimeSlot = ({time, isActive, isDisabled, onClick}: Props) => {

    return (<Button
        variant="contained"
        color={isActive ? 'primary' : 'inherit'}
        disabled={isDisabled}
        onClick={onClick}
        size='large'
        sx={{
            boxShadow: 0,
            minWidth: '80px',
            borderRadius: '8px',
            padding: '10px',
            backgroundColor: isActive ? '#757ce8' : '#efefef',
            color: isActive ? 'white' : 'black',
            '&:hover': {
                backgroundColor: isActive ? '#757ce8' : 'rgba(0, 0, 0, 0.12)',
            },
        }}
    >
        {time.toString().length === 2 ? time : `0${time}`}:00
    </Button>);
};

export default TimeSlot;
