
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, 
    DialogTitle, TextField, Typography, FormControl, FormControlLabel, 
    Grid, Radio, RadioGroup, CircularProgress } from '@material-ui/core';

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
import AnswerCatalogue from './AnswerCatalogue';
import AnswerScale from './AnswerScale';

//===============================|| UI DIALOG - FORMS ||===============================//

export default function AddBetDialog({...props}) {
    const { game } = useContext(GameContext);
    const [ open, setOpen ] = React.useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const dispatch = useDispatch();

    const [ desc, setDesc ] = React.useState('');
    const [ title, setTitle ] = React.useState('');
    const [ timeLimit, setTimeLimit ] = React.useState(new Date());
    const [ betType, setBetType ] = React.useState('catalogue');

    const [ catalogue_answers, setCatalogue_answers ] = React.useState([{title:'',odds:2},{title:'',odds:2}]);
    const [ scale_options, setScale_options ] = React.useState({step: 1, min: 2, max: 10, odds: 2, winRate: 50});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createBet = async () => {  
        setIsLoading(true);

        try {
            const tempDate = new Date(timeLimit);
            tempDate.setSeconds(0);
            const obj = { gameId: game.id, betType, title, desc, timeLimit: tempDate };
            if (betType == 'catalogue') obj.catalogue_answers = catalogue_answers;
            if (betType == 'scale') obj.scale_options = scale_options;

            const response = await axios.post(config.gameHosts[game.serverId] + '/v1/bets/', obj);
            
            dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Successfully added Bet', 
                variant: 'alert', alertSeverity: 'success', close: true });

            setIsLoading(false);
            setOpen(false);
        } catch (e) {
            setIsLoading(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
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
                    <Typography style={{fontSize:'1.7em', fontWeight: 'bold'}}>Create a new bet</Typography>
                </DialogTitle>
                <DialogContent>
                    {/*}<DialogContentText>
                        <Typography variant="body2">
                        </Typography>
                    </DialogContentText>{*/}
                
                   
                    <Grid container spacing={1}>
                        <Grid item xs={12} lg={6}>
                            <TextField fullWidth onChange={(e) => setTitle(e.target.value)} id="outlined-basic" label="Title" />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <CustomDateTime value={timeLimit} setValue={setTimeLimit}></CustomDateTime>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                    fullWidth
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    id="outlined-multiline-flexible"
                                    label="Description"
                                    multiline
                                    rows={3}
                                />
                        </Grid>
                        
                    </Grid>
                    
                    <br /><br /><br />

                    <Grid container justifyContent="center" spacing={3}>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-label="gender"
                                value={betType}
                                onChange={(e) => setBetType(e.target.value)}
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="catalogue" control={<Radio />} label="Catalogue" />
                                <FormControlLabel value="scale" control={<Radio />} label="Scale" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <br />
                    
                    { betType == 'catalogue' ? <AnswerCatalogue catalogue_answers={catalogue_answers} setCatalogue_answers={setCatalogue_answers}/> : ''}
                    { betType == 'scale' ? <AnswerScale scale_options={scale_options} setScale_options={setScale_options}/> : ''}
                    
                </DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button variant="contained" size="small" onClick={createBet} color="primary">
                        {isLoading ? (<> <CircularProgress color="secondary"  size="1.7em" /></>) : ('Create') }  
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
