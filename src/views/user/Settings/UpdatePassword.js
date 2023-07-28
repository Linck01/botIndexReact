import React from 'react';
import { Grid, Typography, TextField,IconButton } from '@material-ui/core';
import { gridSpacing } from '../../../store/constant';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
//import { strengthColor, strengthIndicator } from '../../../utils/password-strength';
import { SNACKBAR_OPEN } from '../../../store/actions';
import { useDispatch } from 'react-redux';
import axios from '../../../utils/axios';
import config from '../../../config';
import useAuth from '../../../hooks/useAuth';
import { Button, CircularProgress } from '@material-ui/core';

//===========================|| WIDGET STATISTICS ||===========================//

const WidgetStatistics = (props) => {
    const [ showPassword, setShowPassword ] = React.useState(false);
    //const [ passwordMatch, setPasswordMatch ] = React.useState(0);
    //const [strength, setStrength] = React.useState(0);
    //const [level, setLevel] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ newPassword, setNewPassword ] = React.useState('');
    const [ newPasswordConfirm, setNewPasswordConfirm ] = React.useState('');
    const [ isLoading, setIsLoading ] = React.useState(false);
    const { user } = useAuth();
    const dispatch = useDispatch();


    const updateSettings = async () => {
        setIsLoading(true);

        try {
            if (newPassword !== newPasswordConfirm)
                throw Error('Passwords and password confirmation do not match');

            const obj = { password, newPassword };
            await axios.patch(config.apiHost + '/v1/users/' + user.id, obj);

            setPassword('');
            setNewPassword('');
            setNewPasswordConfirm('');

            dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Successfully changed settings', 
                variant: 'alert', alertSeverity: 'success', close: true });

            setIsLoading(false);
        } catch (e) { 
            setIsLoading(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
         }

    };

    

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    
    /*
    const checkPasswordConfirm = (pass1, pass2) => {
        if (passwordMatch !== 0 || pass2.length >= pass1.length) {
            if (pass1 == pass2)
                setPasswordMatch(true);
            else 
                setPasswordMatch(false);
        }   
    };
    
    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };
    */

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Typography variant="h3">
                        Password
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </Typography>
                </Grid>
                
                <Grid item xs={12} md={12}>
                    <TextField
                            type={showPassword ? 'text' : 'password'}
                            style={{width: '100%'}}
                            fullWidth
                            label="Old password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                            type={showPassword ? 'text' : 'password'}
                            style={{width: '100%'}}
                            fullWidth
                            label="New password"
                            variant="outlined"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                            type={showPassword ? 'text' : 'password'}
                            style={{width: '100%'}}
                            fullWidth
                            label="Confirm new password"
                            variant="outlined"
                            value={newPasswordConfirm}
                            onChange={(e) => setNewPasswordConfirm(e.target.value)}
                        />
                </Grid>       
            </Grid>
            <br /><br />
            <Button style={{width:'100%'}} variant="contained" sx={{ boxShadow: 8 }} color="secondary" onClick={updateSettings}>
                { isLoading ? (<> <CircularProgress color="secondary"  size="1.7em" /></>) : ('Change Password') }
            </Button>
            {/*}
            <Grid container spacing={gridSpacing}>      
                <Grid item xs={12}>
                    <Typography variant="h3">Currency</Typography>
                    <br />
                </Grid>
                
                <Grid item xs={12} md={6}>
                    
                </Grid>             
            </Grid>
           {*/}
            
            
        </>
    );
};

export default WidgetStatistics;
