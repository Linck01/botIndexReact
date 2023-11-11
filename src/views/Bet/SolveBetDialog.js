import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider, Typography, Grid, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { gridSpacing } from '../../store/constant';
import { SNACKBAR_OPEN } from '../../store/actions';
import useAuth from '../../hooks/useAuth';
import axios from '../../utils/axios';
import config from '../../config';
import { IconCheck, IconX } from '@tabler/icons';


const valueText = (value) => {
    return `${value}°C`;
}

//===============================|| UI DIALOG - FORMS ||===============================//

export default function SolveBetDialog(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { bet } = props;
    const [answerIds, setAnswerIds] = React.useState([]);
    const customization = useSelector((state) => state.customization);
    const { user } = useAuth();
    const [ answerDecimal, setAnswerDecimal ] = useState(bet.betType === 'scale' ? bet.scale_options.min : 0);
   

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const solveBet = async () => {  
        setIsLoading(true);

        if (!user) {
            setIsLoading(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Please log in to solve your bet!',
                variant: 'alert', alertSeverity: 'error', close: true });
        }
        
        try {
            const req = {};
            if (bet.betType === 'catalogue') req.answerIds = answerIds;
            if (bet.betType === 'scale') req.answerDecimal = answerDecimal;

            await axios.patch(config.apiHost + '/v1/bets/' + bet.id + '/solve', req);
            
        } catch (e) {
            setIsLoading(false);

            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
         }

        setIsLoading(false);
        dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Successfully added Tip', 
                variant: 'alert', alertSeverity: 'success', close: true });
    };

    const toggleAnswerId = (event,id) => {
        let newAnswerIds = [...answerIds];

        if (newAnswerIds.includes(id))
            newAnswerIds.splice(newAnswerIds.indexOf(id),1)
        else 
            newAnswerIds.push(id);

        setAnswerIds(newAnswerIds);
    };

    return (
        <Grid container justifyContent="center">
            <Button style={{width:'100%'}} sx={{ boxShadow: 4 }} variant="contained" color="secondary" onClick={handleClickOpen}>
                Solve Bet
            </Button>

            <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">
                    <Typography style={{fontSize:'1.7em', fontWeight: 'bold'}}>Solve bet</Typography>
                </DialogTitle>
                <DialogContent>
                    {/*}<DialogContentText>
                        <Typography variant="body2">
                        </Typography>
                    </DialogContentText>{*/}
                    { bet.betType === 'catalogue' ? 
                        <Grid container spacing={1}>
                            <Grid item key={0} xs={12}><Typography variant="h3">Select correct answer(s)</Typography></Grid>

                            {bet.catalogue_answers.map((a, i) => (         
                                <Grid item xs={12} key={i}>
                                    <ListItem button selected={answerIds === i} onClick={(e) => toggleAnswerId(e,i)}
                                        sx={{ borderRadius: customization.borderRadius + 'px' }} >
                                        <ListItemIcon>
                                            {answerIds.includes(i) ? 
                                                ( <IconCheck style={{color: theme.palette.success.main}} /> ) :
                                                ( <IconX style={{color: theme.palette.error.main}} /> )
                                            }
                                        </ListItemIcon>
                                        <ListItemText primary={a.title} />
                                    </ListItem>
                                </Grid>
                            ))}
                        </Grid>
                    : '' }
                    
                    { bet.betType === 'scale' ? 
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}><Typography variant="h3">Select correct answer</Typography></Grid>
                            
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
        
                    : ''}
            
                   

                </DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button variant="contained" size="small" onClick={solveBet} color="primary">
                        {isLoading ? (<> <CircularProgress color="secondary"  size="1.7em" /></>) : ('Solve') }  
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
