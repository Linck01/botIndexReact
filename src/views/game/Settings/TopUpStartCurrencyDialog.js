import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Grid, CircularProgress } from '@material-ui/core';
import React, {useState, useContext} from 'react';
import GameContext from '../../../contexts/GameContext';
import { useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from '../../../store/actions';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../utils/axios';
import config from '../../../config';

export default function DeleteGameDialog(props) {
    const { game } = useContext(GameContext);
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { user } = useAuth();

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
            await axios.patch(config.apiHost + '/v1/members/topUpStartCurrency', {gameId: game.id});
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
            <Button style={{width:'100%'}} variant="contained" sx={{ boxShadow: 4 }} color="secondary" onClick={handleClickOpen}>
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
