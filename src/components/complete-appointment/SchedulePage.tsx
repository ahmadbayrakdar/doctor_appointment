import React, {useEffect, useState} from 'react';
import {Box, Skeleton, Typography} from '@mui/material';
import {generateTimeSlots} from "@/utils/functions/generateTimeSlot";
import TimeSlot from "@/components/complete-appointment/TimeSlot";
import {theme} from "@/utils/theme";
import {lightBorder} from "@/components/BookCounselorDialog";

const boxStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    mx: 3,
    gap: 2,
}

const boxTextStyle = {
    mx: 3,
    my: 2,
    fontWeight: 'bold'
}

type Props = {
    loading: boolean;
    activeHours: boolean[];
    setTime: (time: null | number) => void
}

const SchedulePage: React.FC<Props> = ({activeHours, loading, setTime}) => {
    const [selectedTime, setSelectedTime] = useState<null | number>(null)

    const morningTimes = generateTimeSlots(7, 12, 1);
    const afternoonTimes = generateTimeSlots(13, 17, 1);
    const eveningTimes = generateTimeSlots(18, 21, 1);
    const nightTimes = generateTimeSlots(22, 23, 1);

    useEffect(() => {
        setSelectedTime(null)
    }, [loading])

    useEffect(() => {
        setTime(selectedTime)
    }, [selectedTime])

    return (
        <Box sx={{
            backgroundColor: 'white',
            ...lightBorder,
            pt: 1,
            pb: 3,
            mt: 2,
            borderRadius: theme.shape.borderRadius
        }}>
            <Box sx={boxTextStyle}>
                <Typography variant="body1">Morning</Typography>
            </Box>
            <Box sx={boxStyle}>
                {
                    morningTimes.map((time, i) =>
                        loading ?
                            <Skeleton variant="rounded" key={i} width={80} height={46}/> :
                            <TimeSlot
                                onClick={() => setSelectedTime(time)}
                                isDisabled={activeHours[time]}
                                isActive={selectedTime === time}
                                key={i}
                                time={time}/>)
                }
            </Box>
            <Box sx={boxTextStyle}>
                <Typography variant="body1">Afternoon</Typography>
            </Box>
            <Box sx={boxStyle}>
                {
                    afternoonTimes.map((time, i) =>
                        loading ?
                            <Skeleton key={i} variant="rounded" width={80} height={46}/> :
                            <TimeSlot
                                onClick={() => setSelectedTime(time)}
                                isDisabled={activeHours[time]}
                                isActive={selectedTime === time}
                                key={i}
                                time={time}/>)
                }
            </Box>
            <Box sx={boxTextStyle}>
                <Typography variant="body1">Evening</Typography>
            </Box>
            <Box sx={boxStyle}>
                {
                    eveningTimes.map((time, i) =>
                        loading ?
                            <Skeleton key={i} variant="rounded" width={80} height={46}/> :
                            <TimeSlot
                                onClick={() => setSelectedTime(time)}
                                isDisabled={activeHours[time]}
                                isActive={selectedTime === time}
                                key={i}
                                time={time}/>)
                }
            </Box>
            <Box sx={boxTextStyle}>
                <Typography variant="body1">Night</Typography>
            </Box>
            <Box sx={boxStyle}>
                {
                    nightTimes.map((time, i) =>
                        loading ?
                            <Skeleton key={i} variant="rounded" width={80} height={46}/> :
                            <TimeSlot
                                onClick={() => setSelectedTime(time)}
                                isDisabled={activeHours[time]}
                                isActive={selectedTime === time}
                                key={i}
                                time={time}/>)
                }
            </Box>
        </Box>
    );
};

export default SchedulePage;
