import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid } from '@material-ui/core';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent
} from '@material-ui/lab';

import fct from '../../../utils/fct.js';
import GameContext from '../../../contexts/GameContext';
// assets

import useColors from '../../../hooks/useColors.js';
import { IconCalendarStats, IconCalendarOff, IconCheck, IconBell, IconBellOff, IconTrash, IconPlus, IconActivity } from '@tabler/icons';

// style constant
const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '20px',
        boxShadow: 'none',
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
        border: '1px dashed',
        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.primary.dark
    }
}));

//==============================|| UI TIMELINE - CUSTOMIZED ||==============================//

export default function CustomizedTimeline( props ) {
    const { log } = props;
    const classes = useStyles();
    const { game } = React.useContext(GameContext);
    const { colors } = useColors();


    let color, icon;
    if (log.logType == 'betCreated') {
        color = colors.warningDark;
        icon = <IconPlus  />;
    } else if (log.logType == 'betSolved') {
        color = colors.successDark;
        icon = <IconCheck  />;
    } else if (log.logType == 'betAborted') {
        color = colors.errorDark;
        icon = <IconTrash  />;
    } else if (log.logType == 'gameCreated') {
        color = colors.secondaryDark;
        icon = <IconActivity  />;
    }

    return (    
        <>
        <TimelineItem>
            <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                    {fct.formatDateTime(log._createdAt)}
                </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot style={{ backgroundColor: color }}>
                    {icon}
                </TimelineDot>
                {log.logType != 'gameCreated' ? <TimelineConnector /> : ''}
            </TimelineSeparator>
            <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h5" component="h1">
                        {log.title}
                    </Typography>
                    <Typography>{log.desc}</Typography>
                </Paper>
            </TimelineContent>
        </TimelineItem>

        {/*}
        
            <TimelineItem>
                <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                        9:30 am
                    </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="secondary">
                        <FastfoodIcon sx={{ color: '#fff' }} />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h5" component="h1">
                            Eat
                        </Typography>
                        <Typography>Because you need strength</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                        10:00 am
                    </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary">
                        <LaptopMacIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h5" component="h1">
                            Code
                        </Typography>
                        <Typography>Because it&apos;s awesome!</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color="secondary">
                        <HotelIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h5" component="h1">
                            Sleep
                        </Typography>
                        <Typography>Because you need rest</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color="primary">
                        <RepeatIcon />
                    </TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h5" component="h1">
                            Repeat
                        </Typography>
                        <Typography>Because this is the life you love!</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
        {*/}
        </>
    );
}
