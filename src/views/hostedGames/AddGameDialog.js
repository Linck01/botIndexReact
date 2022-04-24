
// material-ui
import { Button, Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, TextField, Typography, 
    Grid, CircularProgress } from '@material-ui/core';

import React, {useState, useEffect, useRef, useContext} from 'react';
import GameContext from '../../contexts/GameContext';
import fct from '../../utils/fct.js';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useDispatch } from 'react-redux';
// project imports


import { SNACKBAR_OPEN } from '../../store/actions';
import useAuth from '../../hooks/useAuth';
import axios from '../../utils/axios';
import config from '../../config';

import SubCard from '../../ui-component/cards/SubCard';
import { IconCirclePlus } from '@tabler/icons';

//===============================|| UI DIALOG - FORMS ||===============================//

export default function FormDialog({...props}) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const { getHostedGames } = props;
    const addGameTitleRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setIsLoading(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createGame = async () => {
        if (isLoading)
            return;

        setIsLoading(true);

        const title = addGameTitleRef.current.querySelectorAll('input')[0].value;
        
        try {
            const response = await axios.post(config.apiHost + '/v1/games/', { title });
            setIsLoading(true);

            dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Successfully added Game', 
                variant: 'alert', alertSeverity: 'success', close: true });
            
            
            getHostedGames();
            handleClose();
        
        } catch (e) {
            setIsLoading(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
        }
    };

    const upHandler = ({ key }) => {
        if (key == 'Enter' && open == true) {
            createGame();
        }
    };

    useEffect(() => {
        window.addEventListener("keyup", upHandler);
        return () => {
            window.removeEventListener("keyup", upHandler);
        };
    }, [open]);

    return (
        <Grid container justifyContent="center">
        
            <Button style={{width:'100%'}} variant="outlined" color="secondary" onClick={handleClickOpen}>
                Create A New Game
            </Button>
               
            <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">
                    <Typography style={{fontSize:'1.7em', fontWeight: 'bold'}}>Create a new Game</Typography>
                </DialogTitle>
                <DialogContent>
                    {/*}<DialogContentText>
                        <Typography variant="body2">
                            
                        </Typography>
                    </DialogContentText>{*/}
                
                   
                    <Grid container spacing={1}>
                        <Grid item xs={12} lg={12}>
                            <TextField fullWidth ref={addGameTitleRef} id="outlined-basic" label="Title" />
                        </Grid>                    
                    </Grid>
  
                </DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button variant="contained" size="small" onClick={createGame} color="primary">
                        {isLoading ? (<> <CircularProgress color="secondary"  size="1.7em" /></>) : ('Create') }  
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
