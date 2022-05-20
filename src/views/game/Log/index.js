import React, {useState, useEffect, useRef, useContext} from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Pagination, CircularProgress } from '@material-ui/core';
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
import useAuth from '../../../hooks/useAuth';
import axios from '../../../utils/axios';
import config from '../../../config';
import { useDispatch, useSelector } from 'react-redux';
import { SNACKBAR_OPEN } from '../../../store/actions';
import { Helmet } from "react-helmet";

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
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const getLogsPage = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get(config.gameHosts[game.serverId] + '/v1/loggings/', { params: { gameId: game.id, sortBy: '-_createdAt', limit: 10 , page: logsPage.index } });

            setLogsPage({...logsPage, items: response.data.results,maxIndex: response.data.totalPages});

            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            console.log(e);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
        }
    }

    const handlePageChange = async (a,b,c) => {
        console.log(a,b,c);
        setLogsPage({...logsPage, index: b});
    }

    useEffect(() => {
        getLogsPage();
    }, [logsPage.index]);

    return (
        <>
        <Helmet>
            <title>{game.title} - Log</title>
        </Helmet>
        {isLoading ? (         
            <>
            <br /><br />
            <Grid container justifyContent="center">     
                <CircularProgress color="secondary" size="10em"  /> 
            </Grid>
            </>       
        ) : ''} 

        {!isLoading && logsPage.items.length > 0 ? (
            <>
            <Timeline position="alternate">
                {logsPage.items.map((log,i) => (
                    <LogListItem key={i} log={log} />  
                ))}
            </Timeline>
            <br />
            </>
        ) : ''}


        {!isLoading && logsPage.maxIndex > 1 ? (
            <>
            <Grid container direction="column" spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Pagination page={logsPage.index} onChange={handlePageChange} count={logsPage.maxIndex} color="primary" />
                </Grid>
            </Grid>
            </>
        ) : ''}

        {!isLoading && logsPage.items.length == 0 ? (
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
