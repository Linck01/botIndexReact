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
    Typography,
    makeStyles
} from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// assets
import PhonelinkRingTwoToneIcon from '@material-ui/icons/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@material-ui/icons/PinDropTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';

import SubCard from '../../ui-component/cards/SubCard';
import AnimateButton from '../../ui-component/extended/AnimateButton';
// material-ui

//-----------------------|| CUSTOM DATETIME ||-----------------------//

const useStyles = makeStyles((theme) => ({
    successBadge: {
        color: theme.palette.success.dark,
        width: '14px',
        height: '14px'
    },
    tableSubContent: {
        whiteSpace: 'break-spaces'
    },
}));


const BetInfo = (props) => {
    const { bet } = props;
    const { game } = React.useContext(GameContext);
    const classes = useStyles();
  
    useEffect(() => {
       
    }, []);

    return (
        <>
        
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography align="left" style={{fontSize:'2em'}} variant="subtitle1">
                        {bet.title}{' '}
                        {bet.badgeStatus === 'active' && <CheckCircleIcon className={classes.successBadge} />}
                    </Typography>
                    <Typography align="left" variant="subtitle2" className={classes.tableSubContent}>
                        {fct.formatDateTime(bet._createdAt)} - {fct.formatDateTime(bet.timeLimit)}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography align="left" variant="body2" className={classes.tableSubContent}>
                        {bet.desc}
                    </Typography>
                </Grid>
            </Grid>
               
        </>
    );
};

export default BetInfo;
