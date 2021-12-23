
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography, Grid, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import React, {useState, useEffect, useRef, useContext} from 'react';
import GameContext from '../../contexts/GameContext';
import fct from '../../utils/fct.js';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
// project imports

import { gridSpacing } from '../../store/constant';
import { SNACKBAR_OPEN } from '../../store/actions';
import useAuth from '../../hooks/useAuth';
import axios from '../../utils/axios';
import config from '../../config';
import SubCard from '../../ui-component/cards/SubCard';
import { IconCirclePlus } from '@tabler/icons';

import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',

        backgroundColor: theme.palette.background.paper
    }
}));

//===============================|| UI DIALOG - FORMS ||===============================//

export default function AddTipDialog(props) {
    const classes = useStyles();
    const { game } = useContext(GameContext);
    const [open, setOpen] = React.useState(false);
    const [isLoadingAddTip, setIsLoadingAddTip] = useState(false);
    const dispatch = useDispatch();
    const { getBet, bet } = props;
    const [amount, setAmount] = React.useState(0);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const customization = useSelector((state) => state.customization);
    const { user } = useAuth();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const handleAmountChange = (event,) => {
        setAmount(event.target.value);
    };

    const createTip = async () => {  
        setIsLoadingAddTip(true);
        let err = null;

        //const title = addTipNameRef.current.querySelectorAll('input')[0].value;

        console.log(amount);
        await fct.sleep(1000);
        
        if (!user) {
            setIsLoadingAddTip(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Please log in to send a tip!',
                variant: 'alert', alertSeverity: 'error', close: true });
        }
        
        try {
            const response = await axios.post(config.apiHost + '/v1/tips/', 
                { betId: bet.id, userId: user.id, gameId: bet.gameId, optionId: selectedIndex, currency: amount});
            
        } catch (e) {
            setIsLoadingAddTip(false);

            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
         }

        setIsLoadingAddTip(false);
        dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Successfully added Tip', 
                variant: 'alert', alertSeverity: 'success', close: true });
    };

    return (
        <Grid container justifyContent="center">
            <Button style={{width:'100%'}} variant="outlined" color="secondary" onClick={handleClickOpen}>
                Create A New Tip
            </Button>

            <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">
                    <Typography variant="h3">Create a new tip</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="body2">
                            
                        </Typography>
                    </DialogContentText>
                
                   
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={12}>
                            <TextField fullWidth id="outlined-basic-size-small" onChange={(event) => handleAmountChange(event)}
                                label={'Amount'} type='number' size="small"  inputProps={{ maxLength: 10 }} />
                        </Grid>
                        <Grid item xs={12} lg={12}>
                        <div className={classes.root}>
                            <List component="nav" aria-label="main mailbox folders">
                                {bet.answers.map((a, i) => (
                                    <ListItem button selected={selectedIndex === i} onClick={(event) => handleListItemClick(event, i)}
                                        sx={{ borderRadius: customization.borderRadius + 'px' }} >
                                        <ListItemIcon>
                                            <HomeTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={a.title} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                        </Grid>
                       
                    </Grid>
                    
                   

                </DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button variant="contained" size="small" onClick={createTip} color="primary">
                        {isLoadingAddTip ? (<> <CircularProgress color="secondary"  size="1.7em" /></>) : ('Create') }  


                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
