import { Button, Dialog, DialogActions, DialogContent, 
    DialogTitle, TextField, Typography, FormControl, FormControlLabel, 
    Grid, Radio, RadioGroup, CircularProgress, Checkbox, Tooltip,Fab } from '@material-ui/core';
import React, {useState, useEffect, useContext} from 'react';
import GameContext from '../../../contexts/GameContext';
import { useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from '../../../store/actions';
import axios from '../../../utils/axios';
import config from '../../../config';
import CustomDateTime from './CustomDateTime';
import AnswerCatalogue from './AnswerCatalogue';
import AnswerScale from './AnswerScale';
import { makeStyles } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(2)
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3)
    },
    button: {
        margin: theme.spacing(1)
    },
    customWidth: {
        maxWidth: 500
    },
    noMaxWidth: {
        maxWidth: 'none'
    }
}));

const dynamicOddsTooltip = 'Automatically adjust odds depending on an answers pot size. Use the "Dynamic Odds Power" value (1-10) to increase or decrease the magnitude of change.';

export default function AddBetDialog({...props}) {
    const { game } = useContext(GameContext);
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();

    const [desc, setDesc] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [dynamicOdds, setDynamicOdds] = React.useState(false);
    const [dynamicOddsPower, setDynamicOddsPower] = React.useState(5);

    const [timeLimit, setTimeLimit] = React.useState(new Date());
    const [betType, setBetType] = React.useState('catalogue');

    const [catalogue_answers, setCatalogue_answers] = React.useState([{title:'',baseOdds:2},{title:'',baseOdds:2}]);
    const [scale_options, setScale_options] = React.useState({step: 1, min: 2, max: 10, baseOdds: 2, winRate: 50});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createBet = async () => {
        if (isLoading)
            return;

        setIsLoading(true);

        try {
            const tempDate = new Date(timeLimit);
            tempDate.setSeconds(0);
            let obj = {gameId: game.id, betType, title, desc, timeLimit: tempDate, dynamicOdds};
            if (dynamicOdds) 
                obj = {...obj, dynamicOddsPower};

            if (betType === 'catalogue') obj.catalogue_answers = catalogue_answers;
            if (betType === 'scale') obj.scale_options = scale_options;

            await axios.post(config.gameHosts[game.serverId] + '/v1/bets/', obj);
            
            dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Successfully added Bet', 
                variant: 'alert', alertSeverity: 'success', close: true });

            setOpen(false);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
         }
    };

    useEffect(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate()+1);
        setTimeLimit(tomorrow);
    }, []);

    /*
    const upHandler = ({ key }) => {
        if (key == 'Enter' && open == true) {
            createBet();
        }
    };

    useEffect(() => {
        window.addEventListener("keyup", upHandler);
        return () => {
            window.removeEventListener("keyup", upHandler);
        };
    }, [open,title]);*/

    return (
        <Grid container justifyContent="center">
            <Button style={{width:'100%'}} variant="contained" color="secondary" sx={{ boxShadow: 8 }} onClick={handleClickOpen}>
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
                            <TextField value={title} fullWidth onChange={(e) => setTitle(e.target.value)} id="outlined-basic" label="Title" />
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
                        <Grid item xs={7}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={dynamicOdds}
                                        onChange={(event) => setDynamicOdds(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label={<>
                                    <Typography variant="subtitle2">Dynamic Odds <Tooltip title={dynamicOddsTooltip} aria-label="add"><HelpIcon style={{fontSize: '1.3em', marginBottom: '-3px'}}/></Tooltip></Typography>
                                    
                                    </>
                                }
                            />
                        </Grid>
                        {dynamicOdds ? (
                            <Grid item xs={5}>
                                <TextField value={dynamicOddsPower} fullWidth onChange={e => setDynamicOddsPower(e.target.value)}
                                    label={'Dynamic Odds Power'} type='number' size="small" inputProps={{ maxLength: 10 }} />
                            </Grid>
                        ) : ''}
                        <Grid item xs={12}>
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
                    </Grid>

                    <br />
                    
                    { betType === 'catalogue' ? <AnswerCatalogue catalogue_answers={catalogue_answers} setCatalogue_answers={setCatalogue_answers}/> : ''}
                    { betType === 'scale' ? <AnswerScale scale_options={scale_options} setScale_options={setScale_options}/> : ''}
                    
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
