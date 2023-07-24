
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Grid, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SNACKBAR_OPEN } from '../../store/actions';
import useAuth from '../../hooks/useAuth';
import axios from '../../utils/axios';
import config from '../../config';

export default function DeleteBetDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { bet } = props;
    const history = useHistory();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteBet = async () => {
        setIsLoading(true);

        if (!user) {
            setIsLoading(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Please log in to delete the bet!',
                variant: 'alert', alertSeverity: 'error', close: true });
        }
        
        try {
            await axios.delete(config.apiHost + '/v1/bets/' + bet.id, {});
            history.push('/game/' + bet.gameId);
            //handleClose();
        } catch (e) {
            setIsLoading(false);

            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
         }

         setIsLoading(false);
        dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Successfully deleted bet.', 
                variant: 'alert', alertSeverity: 'success', close: true });
    };

    return (
        <Grid container justifyContent="center">
            <Button style={{width:'100%'}} sx={{ boxShadow: 4 }} variant="contained" color="error" onClick={handleClickOpen}>
                Delete bet
            </Button>

            <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">
                    <Typography style={{fontSize:'1.7em',fontWeight: 'bold'}}>End bet</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the bet? This will <br />
                        - Remove the bet.<br />
                        - Remove all tips associated with the bet.<br />
                        - Not pay back the tips.<br />
                    </DialogContentText>    
      
                </DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button variant="contained" size="small" onClick={deleteBet} color="primary">
                        {isLoading ? (<> <CircularProgress color="secondary"  size="1.7em" /></>) : ('Accept') }  
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
