import React from "react";
import {Box} from "@mui/material";
import {IMonthDay} from "@/utils/interfaces/monthDays";
import {lightBorder} from "@/components/BookCounselorDialog";
import {theme} from "@/utils/theme";

type Props = IMonthDay & {
    onClick: () => void;
};

export default function MonthDay(props: Props) {
    return (
        <Box
            sx={{
                ...lightBorder,
                backgroundColor: props.isActive ? 'primary.main' : 'white',
                borderRadius: theme.shape.borderRadius,
                color: props.isActive ? '#fff' : '#000',
                py: 2,
                px: 4,
                mr: 2,
                transition: '200ms all ease',
                display: 'inline-block',
                textAlign: 'center',
                fontSize: '13px',
                cursor: 'pointer'
            }}
            onClick={props.onClick}
        >
            {props.month}
            <b style={{fontSize: 25, display: "block"}}>{props.monthNumber}</b>
            {props.day}
        </Box>
    );
}
