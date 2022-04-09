import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GameContext from '../../contexts/GameContext';

// material-ui
import { Avatar, Divider, Grid, makeStyles, Typography, Pagination, CircularProgress } from '@material-ui/core';
import SubCard from '../../ui-component/cards/SubCard';
import { useTheme } from '@material-ui/core/styles';
import { gridSpacing } from '../../store/constant';
import fct from '../../utils/fct.js';
import config from '../../config';
import axios from '../../utils/axios';
import { SNACKBAR_OPEN } from '../../store/actions';

// assets
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import Avatar1 from '../../assets/images/users/avatar-1.png';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import WatchLaterTwoToneIcon from '@material-ui/icons/WatchLaterTwoTone';
import useColors from '../../hooks/useColors.js';


// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    },
    divider: {
        marginTop: '12px',
        marginBottom: '12px'
    },
    avatarSuccess: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
        marginLeft: '15px'
    },
    successDark: {
        color: theme.palette.success.dark
    },
    avatarError: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.orange.light,
        color: theme.palette.orange.dark,
        marginLeft: '15px'
    },
    errorDark: {
        color: theme.palette.orange.dark
    },
    textActive: {
        width: '10px',
        height: '10px',
        verticalAlign: 'center',
        color: theme.palette.success.main
    },
    timeIcon: {
        fontSize: '0.875rem',
        marginRight: '4px',
        verticalAlign: 'sub'
    },
}));

//================================|| UI LIST - CUSTOM ||================================//

export default function CustomList(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const { tip, bet } = props;
    const { game } = React.useContext(GameContext);
    const { colors } = useColors();

    let currencyDiffString = '';
    if (bet.isPaid) {
        const diffColor = parseFloat(tip.diff.$numberDecimal) < 0 ? 'error' : 'success';
        currencyDiffString =  (<Typography align="left" style={{color:colors[diffColor],textAlign: 'center',fontSize:'0.7em'}} variant="">({parseFloat(tip.diff.$numberDecimal).toFixed(2)})</Typography>);
    }

    return (
        <>
        <Grid item xs={12}>
            <Grid container spacing={2}>
                <Grid xs={4} item style={{marginTop:'5px'}}>
                    <Typography align="left" component="div" variant="body1" style={{fontSize:'1.5em'}}>
                        {game.currencyName} {tip.currency.$numberDecimal} &nbsp;{currencyDiffString} 
                    </Typography>
                </Grid>
                <Grid xs={4} item >
                    <Typography align="left" component="div" variant="h5">
                        {tip.username}
                    </Typography>
                    <Typography align="left" component="div" variant="subtitle2">
                        <FiberManualRecordIcon className={classes.textActive} /> &nbsp;
                        {bet.betType == 'catalogue' ? bet.catalogue_answers[tip.answerId].title : ''}
                        {bet.betType == 'scale' ? tip.answerDecimal.$numberDecimal : ''}
                    </Typography> 
                </Grid>
            
                <Grid xs={4} item>
                    <Typography align="center" component="div" variant="caption">
                        <WatchLaterTwoToneIcon className={classes.timeIcon} />{fct.timeAgoString(tip._updatedAt)}      
                    </Typography>
                    <Typography align="center" component="div" variant="caption">
                        {fct.formatDateTime(tip._updatedAt)}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
        </>
    );
}
