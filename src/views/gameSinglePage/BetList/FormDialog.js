
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
import SubCard from './../../../ui-component/cards/SubCard';
import { IconCirclePlus } from '@tabler/icons';

//===============================|| UI DIALOG - FORMS ||===============================//

export default function FormDialog({...props}) {
    const { game } = useContext(GameContext);
    const [open, setOpen] = React.useState(false);
    const [isLoadingAddBet, setIsLoadingAddBet] = useState(false);
    const dispatch = useDispatch();
    const { getBets } = props;
    const addBetNameRef = useRef(null);
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
        setOptionsCount(answersCount < 10 ? answersCount + 1 : 10);
    };
    const util = require('util')
    const createBet = async () => {

        const title = addBetNameRef.current.childNodes[0].value;
        
        setIsLoadingAddBet(true);
 
        try {
            console.log(timeLimit);
            let answers = [];

            answersRef.current.querySelectorAll('input').forEach( (input) => {
                answers.push(input.value);
            });


            const response = await axios.post(config.apiHost + '/v1/bets/', { 
                gameId: game.id, 
                title: addBetNameRef.current.querySelectorAll('input')[0].value,
                answers: answers,
                timeLimit: timeLimit
            });

            await fct.sleep(1000);
            
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Successfully added bet',
                variant: 'alert',
                alertSeverity: 'success',
                close: true
            });
            addBetNameRef.current.childNodes[0].value = '';

            setOpen(false);
            getBets();
            
        } catch (e) {
            console.log(e);
            
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: e.response.data.message,
                variant: 'alert',
                alertSeverity: 'error',
                close: true
            });
        }
        
        
        setIsLoadingAddBet(false);
        
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Create A New Bet
            </Button>
            <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">
                    <Typography variant="h3">Create a new bet</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="body2">
                            Lorem ipsum
                        </Typography>
                    </DialogContentText>
                
                   
                    <Grid container spacing={1}>
                        <Grid item xs={12} lg={6}>
                  
                            <TextField fullWidth ref={addBetNameRef} id="outlined-basic" label="Outlined" />
 
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <CustomDateTime value={timeLimit} setValue={setTimeLimit}></CustomDateTime>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
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
                                Options 
                            </Typography>
                        </Grid>
                        
                    </Grid>
                    <br />
                    <Grid container spacing={3} ref={answersRef}>
                        {[...Array(answersCount)].map((e, i) => 
                            (<Grid item xs={12} lg={6} >
                                <TextField fullWidth id="outlined-basic-size-small" label={'Option ' + (i + 1)} size="small" defaultValue="" inputProps={{ maxLength: 32 }}/>
                            </Grid>)
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
        </div>
    );
}
