import React from 'react';
import { Grid, LinearProgress, makeStyles, Typography, 
    Chip } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { IconCalendarStats, IconCalendarOff, IconCheck, IconTrash } from '@tabler/icons';
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

const getStatus = (bet) => {
    const start = (new Date(bet._createdAt)).getTime();
    const now = Date.now();
    const end = (new Date(bet.timeLimit)).getTime();

    let progress = 0;

    if (end < now)
        progress = 100;
    else if (now < start)
        progress = 0;
    else
        progress = Math.floor( ((now - start) / (end - start)) * 100 );
    
    let icon,title,color,tag;

    if (bet.isAborted) {
        icon = IconTrash;
        tag = 'aborted';
        title = 'Aborted';
        color = 'errorDark';
    //} else if (bet.isPaid) {
    //    icon = IconCheck;
    //    tag = 'isPaid';
    //    title = 'Solved & Paid';
    //    color = 'successDark';
    } else if (bet.isSolved) {
        icon = IconCheck;
        tag = 'isSolved';
        title = 'Solved';
        color = 'successDark';
    }  else if (progress < 100) {
        icon = IconCalendarStats;
        tag = 'inProgress';
        title = 'In progress';
        color = 'warningDark';
    } else {
        icon = IconCalendarOff;
        tag = 'ended';
        title = 'Ended';
        color = 'infoDark';
    }

    return { progress, icon, title, color, tag };
}


const BetStatusTab = ({ bet }) => {
    const classes = useStyles();
    const { colors } = useColors();
    const [ status,setStatus ] = React.useState(getStatus(bet));

    React.useEffect(() => {
        setStatus(getStatus(bet));
        
        const intervalObj = setInterval(() => {
            setStatus(getStatus(bet));
        }, 1000);
        

        return function cleanup() {
            clearInterval(intervalObj);
        };
    }, [bet]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={3} textAlign="center">
                {<status.icon style={{color: colors[status.color], width: '5em', height: '4em',}}/>} 
                <br/>
                <Typography variant="caption" style={{paddingLeft:'5%'}}>{status.title}</Typography>
            </Grid>
            <Grid item xs={9} align="left">
                <Typography align="left"  variant="h3" style={{marginBottom: '6px', marginTop: '5px'}}> {bet.title} </Typography>
                <Typography align="left" variant="subtitle2" className={classes.tableSubContent} style={{fontSize:'1em'}}>
                    {fct.formatDateTime(bet._createdAt)} - {fct.formatDateTime(bet.timeLimit)}
                </Typography>
                
                {bet.isSolved ? fct.getCorrectAnswerStrings(bet, 15).correctAnswerStrings.map(a => (
                    <React.Fragment key={a}>
                        <Chip label={a} variant="outlined" style={{color: colors.successDark, borderColor: colors.successDark, marginTop: '2px', fontSize: '1.1em', height:'22px'}} /> 
                    </React.Fragment>
                )) : (
                    <Grid container spacing={0}>
                        <Grid item xs={10}>
                            <LinearProgress variant="determinate" value={status.progress} color="primary" style={{width: '90%'}} />
                            <Typography align="left" variant="subtitle2" style={{fontSize: '1.1em' }}>
                                {!fct.hasBetEnded(bet) ? fct.timeLeftString(bet.timeLimit) : ''}
                            </Typography>
                        </Grid>
                      
                    </Grid>
                )}
                
                {bet.isSolved ? (
                    <Typography align="left" variant="caption" color="primary" className={classes.tableSubContent}>
                        &nbsp; {fct.getCorrectAnswerStrings(bet, 15).moreAnswersString}
                    </Typography>
                ) : ''}

            </Grid>
        </Grid>
    );
};

export default BetStatusTab;
