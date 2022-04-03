import * as React from 'react';

// material-ui
import { InputAdornment, TextField } from '@material-ui/core';
import { LocalizationProvider, DateTimePicker } from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';

// assets
import DateRangeIcon from '@material-ui/icons/DateRange';

//-----------------------|| CUSTOM DATETIME ||-----------------------//

const CustomDateTime = ( { value, setValue } ) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                indicatorColor="primary"
                renderInput={(props) => <TextField fullWidth {...props} helperText="" />}
                label="Time Limit"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                sx={{
                    '& .MuiTabs-flexContainer .MuiTabs-indicator': {
                        bgcolor: 'primary.main'
                    }
                }}          
            />
        </LocalizationProvider>
    );
};

export default CustomDateTime;
