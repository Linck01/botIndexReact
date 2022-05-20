
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slider, TextField, Typography, Grid, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import React, {useState, useEffect, useRef, useContext} from 'react';
import GameContext from '../../../contexts/GameContext';
import fct from '../../../utils/fct.js';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// project imports
import { useTheme } from '@material-ui/core/styles';

import { gridSpacing } from '../../../store/constant';
import { SNACKBAR_OPEN } from '../../../store/actions';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../utils/axios';
import config from '../../../config';

const useStyles = makeStyles((theme) => ({
    toggleButton: {
        backgroundColor: theme.palette.error.main
    }
}));

const valueText = (value) => {
    return `${value}°C`;
}

//===============================|| UI DIALOG - FORMS ||===============================//

export default function DeleteGameDialog(props) {
    const theme = useTheme();
    const classes = useStyles();
    const { game } = useContext(GameContext);
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { user } = useAuth();
    const history = useHistory();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteGame = async () => {
        setIsLoading(true);

        if (!user) {
            setIsLoading(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Please log in to edit member currency of the game!',
                variant: 'alert', alertSeverity: 'error', close: true });
        }
        
        try {
            const response = await axios.patch(config.apiHost + '/v1/members/topUpStartCurrency', {gameId: game.id});
            handleClose();
        } catch (e) {
            setIsLoading(false);

            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
         }

        setIsLoading(false);
        dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Successfully deleted game.', 
                variant: 'alert', alertSeverity: 'success', close: true });
    };

    return (
        <Grid container justifyContent="center">
            <Button style={{width:'100%'}} variant="outlined" color="warning" onClick={handleClickOpen}>
                Top-up currency of broke members
            </Button>

            <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">
                    <Typography style={{fontSize:'1.7em',fontWeight: 'bold'}}>Top-up currency of broke members</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to reset the currency of members, who currently own less than {game.startCurrency.$numberDecimal + ' ' + game.currencyName} back to {game.startCurrency.$numberDecimal + ' ' + game.currencyName}? Be aware: <br />
                        - Currency that is spent on active bets will not be counted.<br />
                        - Thus you might want to do this only when there is no open unpaid bets.<br />
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button variant="contained" size="small" onClick={deleteGame} color="primary">
                        {isLoading ? (<> <CircularProgress color="secondary"  size="1.7em" /></>) : ('Accept') }  
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
