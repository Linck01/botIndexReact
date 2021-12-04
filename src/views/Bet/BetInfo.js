import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import fct from '../../utils/fct.js';
import config from '../../config';
import { SNACKBAR_OPEN } from '../../store/actions';
import GameContext from '../../contexts/GameContext';

// material-ui
import {
    Box,
    CardContent,
    Chip,
    Divider,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from '@material-ui/core';

// assets
import PhonelinkRingTwoToneIcon from '@material-ui/icons/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@material-ui/icons/PinDropTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';

import SubCard from '../../ui-component/cards/SubCard';
import AnimateButton from '../../ui-component/extended/AnimateButton';
// material-ui

//-----------------------|| CUSTOM DATETIME ||-----------------------//

const BetInfo = (props) => {
    const { bet } = props;
    const { game } = React.useContext(GameContext);

  
    useEffect(() => {
       
    }, []);

    return (
        <>
        
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>
                            <ListItemIcon>
                                <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">Email</Typography>} />
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    demo@sample.com
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <PhonelinkRingTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">Phone</Typography>} />
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    (+99) 9999 999 999
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <PinDropTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">Location</Typography>} />
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    Melbourne
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                    <CardContent>
                        <Grid container spacing={0}>
                            <Grid item xs={4}>
                                <Typography align="center" variant="h3">
                                    37
                                </Typography>
                                <Typography align="center" variant="subtitle2">
                                    Mails
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography align="center" variant="h3">
                                    2749
                                </Typography>
                                <Typography align="center" variant="subtitle2">
                                    Followers
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography align="center" variant="h3">
                                    678
                                </Typography>
                                <Typography align="center" variant="subtitle2">
                                    Following
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
               
        </>
    );
};

export default BetInfo;
