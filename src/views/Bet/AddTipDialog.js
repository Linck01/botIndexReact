
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slider, TextField, Typography, Grid, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import React, {useState, useEffect, useRef, useContext} from 'react';
import GameContext from '../../contexts/GameContext';
import fct from '../../utils/fct.js';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import HCaptcha from '@hcaptcha/react-hcaptcha';
// project imports

import { gridSpacing } from '../../store/constant';
import { SNACKBAR_OPEN } from '../../store/actions';
import useAuth from '../../hooks/useAuth';
import axios from '../../utils/axios';
import config from '../../config';
import SubCard from '../../ui-component/cards/SubCard';
import { IconCirclePlus } from '@tabler/icons';

import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone';


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
    const { game, refreshMember } = useContext(GameContext);
    const [open, setOpen] = React.useState(false);
    const [isLoadingAddTip, setIsLoadingAddTip] = useState(false);
    const dispatch = useDispatch();
    const { getBet, bet } = props;
    const [amount, setAmount] = React.useState(0);
    const [answerId, setAnswerId] = React.useState(-1);
    const customization = useSelector((state) => state.customization);
    const { user, incrementCaptchaTicker } = useAuth();
    const [ answerDecimal, setAnswerDecimal ] = useState(bet.betType == 'scale' ? bet.scale_options.min : 0);
    const [ captchaToken, setCaptchaToken ] = React.useState(null);

    const handleCaptchaVerificationSuccess = (token, ekey) => {
        setCaptchaToken(token);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createTip = async () => {  
        setIsLoadingAddTip(true);

        await fct.sleep(1000);

        if (!user) {
            setIsLoadingAddTip(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Please log in to send a tip.',
                variant: 'alert', alertSeverity: 'error', close: true });
        }

        if (amount <= 0) {
            setIsLoadingAddTip(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Tip amount must be greater than 0.',
                variant: 'alert', alertSeverity: 'error', close: true });
        }
        
        try {
            const req = { betId: bet.id, userId: user.id, gameId: bet.gameId, currency: amount, captchaToken};
            if (bet.betType == 'catalogue') req.answerId = answerId;
            if (bet.betType == 'scale') req.answerDecimal = answerDecimal;

            const response = await axios.post(config.apiHost + '/v1/tips/', req);
            incrementCaptchaTicker();

        } catch (e) {
            setIsLoadingAddTip(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
         }

        setIsLoadingAddTip(false);
        handleClose()
        dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Successfully added Tip', 
                variant: 'alert', alertSeverity: 'success', close: true });
    };

    return (
        <Grid container justifyContent="center">
            <Button style={{width:'100%'}} variant="outlined" color="warning" onClick={handleClickOpen}>
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
                            <TextField fullWidth id="outlined-basic-size-small" onChange={e => setAmount(e.target.value)}
                                label={'Amount'} type='number' size="small"  inputProps={{ maxLength: 10 }} />
                        </Grid>
                        
                        <Grid item xs={12} lg={12}>
                            { bet.betType == 'catalogue' ? 
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
                            
                            { bet.betType == 'scale' ? 
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
                    { user && user.captchaTicker % config.captchaTickerInterval == 0 ? (
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
                        {isLoadingAddTip ? (<> <CircularProgress color="secondary"  size="1.7em" /></>) : ('Create') }  


                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
