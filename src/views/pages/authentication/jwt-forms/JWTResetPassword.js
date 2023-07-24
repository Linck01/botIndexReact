import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
//import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography, Grid } from '@material-ui/core';
//import useScriptRef from '../../../../hooks/useScriptRef';
import config from '../../../../config';
import axios from '../../../../utils/axios';
import { SNACKBAR_OPEN } from '../../../../store/actions';

/*const useStyles = makeStyles((theme) => ({
    loginInput: {
        ...theme.typography.customInput
    }
}));*/

//========================|| FIREBASE - FORGOT PASSWORD ||========================//

const FirebaseForgotPassword = ({ ...others }) => {
    //const classes = useStyles();
    //const scriptedRef = useScriptRef();
    //const [email,setEmail] = React.useState('');
    const [errorMessage,setErrorMessage] = React.useState('');
    const [isLoading,setIsLoading] = React.useState(false);
    const [successfullReset,setSuccessfullReset] = React.useState(false);
    const dispatch = useDispatch();
    //const query = useSearchParams();
    const params = new URLSearchParams(window.location.search)

    const sendResetPassword = async (userId, code) => {  
        setIsLoading(true);

        try {
            await axios.post(config.apiHost + '/v1/auth/reset-password', { userId, code });

            setIsLoading(false);
            setSuccessfullReset(true);
        } catch (e) {
            setIsLoading(false);
            setErrorMessage('Error resetting password.');
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
         }   
    };

    useEffect(() => {
        if (params.has('userId') && params.has('code')) 
            sendResetPassword(params.get('userId'),params.get('code'));
        else
            setErrorMessage('No userId and code found in url parameters.');
    }, []);

    return (
        <>
        
        {isLoading ? (
            <><br /><br />  
                <Grid item xs={12} lg={12} style={{ textAlign: 'center' }}>
                    <CircularProgress color="secondary" size="10em"  />
                </Grid>
            </>
        ) : ''}

        <br /><br />
        {!isLoading && successfullReset ? 
            <Typography align="center" color="secondary" variant="h3">Successfully sent you a new password.</Typography> : ''}

        {!isLoading && errorMessage !== '' ? 
            <Typography align="center" color="error" variant="h3">{errorMessage}</Typography> : ''}
        
        <br />
        </>
       
    );
};

export default FirebaseForgotPassword;
