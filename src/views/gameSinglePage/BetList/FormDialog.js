
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@material-ui/core';

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

//===============================|| UI DIALOG - FORMS ||===============================//

export default function FormDialog({...props}) {
    const [open, setOpen] = React.useState(false);
    const [isLoadingAddBet, setIsLoadingAddBet] = useState(false);
    const dispatch = useDispatch();
    const { getBets } = props;
    const addBetNameRef = useRef(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createBet = async () => {
        let err = null;

        const name = addBetNameRef.current.childNodes[0].value;

        setIsLoadingAddBet(true);
 
        try {
            //const response = await axios.post(config.apiHost + '/v1/games/', { name: addBetNameRef.current.childNodes[0].value });

            await fct.sleep(1000);
            
        } catch (e) {
            err = e.response.data.message;
        }
        
        if(!err) {
            //await botModel.addBot();

            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Successfully added Game',
                variant: 'alert',
                alertSeverity: 'success',
                close: true
            });
            addBetNameRef.current.childNodes[0].value = '';
            
            getBets();
        } else {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: err,
                variant: 'alert',
                alertSeverity: 'error',
                close: true
            });
        }

        setIsLoadingAddBet(false);
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Create a new Bet
            </Button>
            <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">
                    <Typography variant="h4">Create a new Bet</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="body2">
                            Let Google 
                        </Typography>
                    </DialogContentText>
                    <TextField autoFocus ref={addBetNameRef} margin="dense" id="name" label="Title" type="email" fullWidth />
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
