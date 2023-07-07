import {Box, Button} from "@mui/material";

const AppointmentButton = (props: { content: string, itemSelected: string, selectThisItem: Function }) => {
    return (
        <Box sx={{width: 'fit-content', display: 'inline-block'}}>
            {
                props.itemSelected === props.content ? <Button variant="contained" sx={{margin: '5px 5px 5px 0'}}
                                                               onClick={() => props.selectThisItem(props.content)}>
                        {props.content}
                    </Button>
                    :
                    <Button variant="outlined" sx={{margin: '5px 5px 5px 0'}}
                            onClick={() => props.selectThisItem(props.content)}>
                        {props.content}
                    </Button>
            }
        </Box>
    );
};

export default AppointmentButton;
