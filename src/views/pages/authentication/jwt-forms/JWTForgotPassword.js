import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput, CircularProgress, Typography } from '@material-ui/core';

// project imports
import AnimateButton from '../../../../ui-component/extended/AnimateButton';
import useAuth from '../../../../hooks/useAuth';
import useScriptRef from '../../../../hooks/useScriptRef';
import config from '../../../../config';
import axios from '../../../../utils/axios';
import { SNACKBAR_OPEN } from '../../../../store/actions';
import fct from '../../../../utils/fct.js';

// style constant
const useStyles = makeStyles((theme) => ({
    loginInput: {
        ...theme.typography.customInput
    }
}));

//========================|| FIREBASE - FORGOT PASSWORD ||========================//

const FirebaseForgotPassword = ({ ...others }) => {
    const classes = useStyles();
    const scriptedRef = useScriptRef();
    const [email,setEmail] = React.useState('');
    const [isLoading,setIsLoading] = React.useState(false);
    const dispatch = useDispatch();
    const { paramUserId, paramCode } = useParams();

    const sendForgotPassword = async () => {  
        setIsLoading(true);

        try {
            const response = await axios.post(config.apiHost + '/v1/auth/forgot-password', { email });
            console.log(response);

            setIsLoading(false);
            dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Successfully sent email to reset your password.', 
                    variant: 'alert', alertSeverity: 'success', close: true });
        } catch (e) {
            setIsLoading(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
         }   
    };

    useEffect(() => {
        
    }, []);

    return (
        <>
        
        <FormControl fullWidth className={classes.loginInput} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email-forgot">Email Address</InputLabel>
            <OutlinedInput
                id="outlined-adornment-email-forgot"
                type="email"
                value={email}
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                label="Email Address"
            />
        </FormControl>
        <br /><br />
        <Button variant="contained" fullWidth size="large" onClick={sendForgotPassword} color="secondary">
            {isLoading ? (<> <CircularProgress color="primary"  size="1.7em" /></>) : ('Reset') }  
        </Button>
        </>
       
    );
};

export default FirebaseForgotPassword;
