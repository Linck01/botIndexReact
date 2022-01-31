import React from 'react';

// material-ui
import {
    AvatarGroup,
    Button,
    Grid,
    LinearProgress,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    ListItem,
    useMediaQuery,
    Divider,
    Chip
} from '@material-ui/core';

// asset

import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import GameContext from '../../contexts/GameContext';
import fct from '../../utils/fct.js';
import useColors from '../../hooks/useColors.js';


const useStyles = makeStyles((theme) => ({
    successBadge: {
        color: theme.palette.success.dark,
        width: '14px',
        height: '14px'
    },
    iconError: {
        width: '60px',
        height: '60px',
        color: theme.palette.mode === 'dark' ? theme.palette.error.dark : theme.palette.error.light
    },
    iconSuccess: {
        width: '60px',
        height: '60px',
        color: theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.main
    },
    iconWarning: {
        width: '60px',
        height: '60px',
        color: theme.palette.mode === 'dark' ? theme.palette.warning.dark : theme.palette.warning.main
    },
    iconInfo: {
        width: '60px',
        height: '60px',
        color: theme.palette.mode === 'dark' ? theme.palette.info.dark : theme.palette.info.light
    },
    btnTable: {
        width: '100%',
        '&:hover': {
            background: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            color: '#fff'
        }
    },
    tableSubContent: {
        whiteSpace: 'break-spaces'
    },
    divider: {
        opacity: 0.1,
        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.primary.light 
    }
}));



const BetListItem = ({ bet }) => {
    const classes = useStyles();
    const { game, socket, amIAdmin, amIMod } = React.useContext(GameContext);
    //const util = require('util');
    //console.log(util.inspect(bets));
    const { colors } = useColors();
    const status = fct.getStatus(bet);


    const { correctAnswerStrings, moreAnswersString } = fct.getCorrectAnswerStrings(bet, 40);
    
    return (
        <Grid container spacing={1}>
            <Grid item xs={3} textAlign="center">
                {<status.icon style={{color: colors[status.color], width: '5em', height: '5em',}}/>} 
                <br/>
                <Typography variant="caption" style={{paddingLeft:'5%'}}>{status.title}</Typography>
            </Grid>
            <Grid item xs={9}>
                <Typography align="left" style={{fontSize:'1.6em'}} variant="subtitle1">
                    {bet.title}
                    {bet.badgeStatus === 'active' && <CheckCircleIcon className={classes.successBadge} />}
                </Typography>
                <Typography align="left" variant="subtitle2" className={classes.tableSubContent}>
                    {fct.formatDateTime(bet._createdAt)} - {fct.formatDateTime(bet.timeLimit)}
                </Typography>
                
                {bet.isFinished ? correctAnswerStrings.map(a => (
                    <>
                        <Chip label={a} variant="outlined" style={{color: colors.successDark, borderColor: colors.successDark}} /> 
                        <Typography align="left" variant="caption" color="primary" className={classes.tableSubContent}>{moreAnswersString}</Typography>
                    </>
                )) : (
                    <><br />
                    <Grid container gridSpacing={0}>
                        <Grid item xs={10}>
                        
                            <LinearProgress variant="determinate" value={status.progress} color="primary" style={{width: '90%'}} />
                            <Typography align="left" variant="subtitle1">
                                {fct.timeLeftString(bet.timeLimit)}
                            </Typography>
                            
                        </Grid>
                        <Grid item xs={2}>
                            
                        </Grid>
                    </Grid>
                    </>
                )}
            </Grid>
        </Grid>
    );
};

export default BetListItem;
