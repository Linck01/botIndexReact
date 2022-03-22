import React, { useEffect } from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Pagination } from '@material-ui/core';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent
} from '@material-ui/lab';

import GameContext from '../../../contexts/GameContext';
import LogListItem from './LogListItem';
// assets
import FastfoodIcon from '@material-ui/icons/FastfoodTwoTone';
import LaptopMacIcon from '@material-ui/icons/LaptopMacTwoTone';
import HotelIcon from '@material-ui/icons/HotelTwoTone';
import RepeatIcon from '@material-ui/icons/RepeatTwoTone';
import fct from '../../../utils/fct.js';

// style constant
const useStyles = makeStyles((theme) => ({
    aaa: {
        
    }
}));

//==============================|| UI TIMELINE - CUSTOMIZED ||==============================//

const entriesPerPage = 12;

export default function CustomizedTimeline() {
    const classes = useStyles();
    const { game, logsPage, setLogsPage } = React.useContext(GameContext);
    

    const handlePageChange = async (a,b,c) => {
        setLogsPage({...logsPage, index: b});

    }

    React.useEffect(() => {
        setLogsPage({...logsPage, maxIndex: Math.ceil(game.logs.length / entriesPerPage), items: fct.paginate([...game.logs].reverse(),entriesPerPage,logsPage.index)});

    }, [logsPage.index]);

    return (
        <>
        {game.logs.length > 0 ? (
            <>
                <Timeline position="alternate">
                    {logsPage.items.map((log,i) => (
                        <LogListItem key={i} log={log} />  
                    ))}
                </Timeline>
                <br />
                <Grid container direction="column" spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <Pagination page={logsPage.index} onChange={handlePageChange} count={logsPage.maxIndex} color="primary" />
                    </Grid>
                </Grid>
            </>
           
        ) : ''}

        {game.logs.length == 0 ? (
            <>  
                <br />
                <Grid container direction="column" spacing={2} alignItems="center">
                    <Grid item xs={12}>
                       <Typography variant="h3">No logs to show.</Typography>
                    </Grid>
                </Grid>
            </>
           
        ) : ''}
        </>
    );
}
