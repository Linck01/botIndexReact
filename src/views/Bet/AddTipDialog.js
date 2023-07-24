
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider, TextField, Typography, Grid, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { gridSpacing } from '../../store/constant';
import { SNACKBAR_OPEN } from '../../store/actions';
import useAuth from '../../hooks/useAuth';
import axios from '../../utils/axios';
import config from '../../config';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import useColors from '../../hooks/useColors';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',

        backgroundColor: theme.palette.background.paper
    }
}));

const valueText = (value) => {
    return `${value}°C`;
}

//===============================|| UI DIALOG - FORMS ||===============================//

export default function AddTipDialog(props) {
    
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { bet } = props;
    const [amount, setAmount] = useState(0);
    const [answerId, setAnswerId] = useState(-1);
    const customization = useSelector((state) => state.customization);
    const { user, incrementCaptchaTicker } = useAuth();
    const [answerDecimal, setAnswerDecimal] = useState(bet.betType === 'scale' ? bet.scale_options.min : 0);
    const [captchaToken, setCaptchaToken] = useState('');
    const { colors } = useColors();

    const handleCaptchaVerificationSuccess = (token, ekey) => {
        setCaptchaToken(token);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    /*
    const upHandler = ({ key }) => {
        if (key == 'Enter' && open == true) {
            createTip();
        }
    };

    useEffect(() => {
        window.addEventListener("keyup", upHandler);
        return () => {
            window.removeEventListener("keyup", upHandler);
        };
    }, [open,amount,answerId,answerDecimal]);*/

    const createTip = async () => { 
        if (isLoading)
            return;
        
        setIsLoading(true);

        if (!user) {
            setIsLoading(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Please log in to send a tip.',
                variant: 'alert', alertSeverity: 'error', close: true });
        }

        if (amount <= 0) {
            setIsLoading(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Tip amount must be greater than 0.',
                variant: 'alert', alertSeverity: 'error', close: true });
        }
        
        try {
            const req = { betId: bet.id, userId: user.id, gameId: bet.gameId, currency: amount};
            if (captchaToken !== '')
                req.captchaToken = captchaToken;

            if (bet.betType === 'catalogue') req.answerId = answerId;
            if (bet.betType === 'scale') req.answerDecimal = answerDecimal;

            await axios.post(config.apiHost + '/v1/tips/', req);
            incrementCaptchaTicker();

        } catch (e) {
            setIsLoading(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
        }

        handleClose();
        setIsLoading(false);
        
        dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Successfully added Tip', 
                variant: 'alert', alertSeverity: 'success', close: true });
    };

    return (
        <Grid container justifyContent="center">
            <Button style={{width:'100%'}} sx={{ boxShadow: 8 }} color="secondary" variant="contained" onClick={handleClickOpen}>
                Create A New Tip
            </Button>

            <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">
                    <Typography style={{fontSize:'1.7em', fontWeight: 'bold'}}>Create a new tip</Typography>
                </DialogTitle>
                <DialogContent>
                    {/*}<DialogContentText>
                        <Typography variant="body2"></Typography>
                    </DialogContentText>{*/}
                
                   
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={12}>
                            <TextField value={amount} fullWidth id="outlined-basic-size-small" onChange={e => setAmount(e.target.value)}
                                label={'Amount'} type='number' size="small"  inputProps={{ maxLength: 10 }} />
                        </Grid>
                        
                        <Grid item xs={12} lg={12}>
                            { bet.betType === 'catalogue' ? 
                                <Grid item xs={12} lg={12}>
                                    <div className={classes.root}>
                                        <List component="nav" aria-label="main mailbox folders">
                                            {bet.catalogue_answers.map((a, i) => (
                                                <ListItem key={i} button selected={answerId === i} onClick={() => setAnswerId(i)}
                                                    sx={{ borderRadius: customization.borderRadius + 'px' }} >
                                                    <ListItemIcon>
                                                        <HomeTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary={a.title} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </div>
                                </Grid>
                            : ''}
                            
                            { bet.betType === 'scale' ? 
                                <><Typography variant="h3">Answer</Typography>
                                <Grid container spacing={gridSpacing}>
                                    
                                    <Grid item xs={12} container spacing={2} alignItems="center" sx={{ mt: 2.5 }}>
                                        
                                        <Grid item>
                                            <Typography variant="h6" color="primary">
                                                {bet.scale_options.min}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs>
                                        <Slider value={answerDecimal} onChange={e => setAnswerDecimal(parseFloat(e.target.value))} 
                                                key="slider1" getAriaValueText={valueText} valueLabelDisplay="on" 
                                                min={bet.scale_options.min} max={bet.scale_options.max} step={bet.scale_options.step}/>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" color="primary">
                                                {bet.scale_options.max}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                </>
                            : ''}
                        
                        </Grid>
                    </Grid>
                    
                    { user && user.premium < 1 && user.captchaTicker % config.captchaTickerInterval === 0 ? (
                        <Grid container spacing={gridSpacing} justifyContent="center">
                            <Grid item>                         
                                <HCaptcha
                                sitekey={config.hCaptchaSiteKey}
                                onVerify={(token,ekey) => handleCaptchaVerificationSuccess(token, ekey)}
                                />
                            </Grid>
                        </Grid>) 
                    : '' }
                    

                </DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button variant="contained" size="small" onClick={createTip} color="primary">
                        {isLoading ? (<> <CircularProgress color="secondary"  size="1.7em" /></>) : ('Create') }  
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
