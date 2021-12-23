
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography, Grid } from '@material-ui/core';

import React, {useState, useEffect, useRef, useContext} from 'react';
import GameContext from '../../../contexts/GameContext';
import fct from '../../../utils/fct.js';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useDispatch } from 'react-redux';
// project imports


import { SNACKBAR_OPEN } from '../../../store/actions';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../utils/axios';
import config from '../../../config';
import CustomDateTime from './CustomDateTime';
import SubCard from '../../../ui-component/cards/SubCard';
import { IconCirclePlus } from '@tabler/icons';

//===============================|| UI DIALOG - FORMS ||===============================//

export default function FormDialog({...props}) {
    const { game } = useContext(GameContext);
    const [open, setOpen] = React.useState(false);
    const [isLoadingAddBet, setIsLoadingAddBet] = useState(false);
    const dispatch = useDispatch();
    const { getBets } = props;
    const addBetNameRef = useRef(null);
    const addBetDescRef = useRef(null);
    const [answersCount, setOptionsCount] = React.useState(2);
    const answersRef = useRef(null);
    const [timeLimit, setTimeLimit] = React.useState(new Date());

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addOption = () => {
        setOptionsCount(answersCount < 32 ? answersCount + 1 : 32);
    };

    const createBet = async () => {  
        setIsLoadingAddBet(true);
        let err = null;

        console.log(timeLimit);
        let answers = [];

        let i = 0;
        answersRef.current.querySelectorAll('input').forEach( (input) => {
            if (input.type == 'text')
                answers.push({title: input.value});
            else
                answers[answers.length - 1].odds = input.value;
        });

        const title = addBetNameRef.current.querySelectorAll('input')[0].value;
        const desc = addBetDescRef.current.querySelectorAll('textarea')[0].value;

        try {
            const response = await axios.post(config.apiHost + '/v1/bets/', 
                { gameId: game.id,  title, answers, desc, timeLimit });
            
        } catch (e) { err = e.response.data.message; }

        await fct.sleep(1000);
      
        setIsLoadingAddBet(false);

        if(!err) {
            dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Successfully added Bet', 
                variant: 'alert', alertSeverity: 'success', close: true });
            
            getBets();
            setOpen(false);
        } else {
            dispatch({ type: SNACKBAR_OPEN, open: true, message: err,
                variant: 'alert', alertSeverity: 'error', close: true });
        }
    };

    return (
        <Grid container justifyContent="center">
            <Button style={{width:'100%'}} variant="outlined" color="secondary" onClick={handleClickOpen}>
                Create A New Bet
            </Button>

            <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">
                    <Typography variant="h3">Create a new bet</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="body2">
                            
                        </Typography>
                    </DialogContentText>
                
                   
                    <Grid container spacing={1}>
                        <Grid item xs={12} lg={6}>
                  
                            <TextField fullWidth ref={addBetNameRef} id="outlined-basic" label="Title" />
 
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <CustomDateTime value={timeLimit} setValue={setTimeLimit}></CustomDateTime>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                    ref={addBetDescRef}
                                    fullWidth
                                    id="outlined-multiline-flexible"
                                    label="Description"
                                    multiline
                                    rows={3}
                                    defaultValue=""
                                />
                        </Grid>
                        
                    </Grid>
                    
                    <br /><br />

                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={6}>
                            <Typography variant="h4">
                                Answers 
                            </Typography>
                        </Grid>
                        
                    </Grid>
                    <br />
                    <Grid container spacing={3} ref={answersRef}>
                        {[...Array(answersCount)].map((e, i) => 
                            (<>
                            <Grid item xs={8} lg={10} >
                                
                                <TextField fullWidth id="outlined-basic-size-small" label={'Answer  ' + (i + 1)} size="small" defaultValue="" inputProps={{ maxLength: 64 }}/>
                                
                            </Grid>
                            <Grid item xs={4} lg={2} >
                                
                                <TextField fullWidth id="outlined-basic-size-small" label={'Odds  ' + (i + 1)} type='number' size="small" defaultValue="2" inputProps={{ maxLength: 10 }}/>
                                
                            </Grid>
                            </>)
                        )}
                        
                       
                        <Grid item xs={12} textAlign={'center'}>
                            <Button onClick={addOption}>
                                <IconCirclePlus stroke={1.5} size="3rem" />
                            </Button>
                            
                        </Grid>
                        
                    </Grid>
                    
                  
                </DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button variant="contained" size="small" onClick={createBet} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
