import React, {useState, useEffect, useRef, useContext} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GameContext from '../../../contexts/GameContext';
import fct from '../../../utils/fct.js';
import MemberTable from './MemberTable';

import { Divider, Typography, CardMedia, Stack, Switch, Pagination, Grid, Button, InputAdornment, OutlinedInput, CircularProgress, Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
// project imports
import SubCard from '../../../ui-component/cards/SubCard';
import { gridSpacing } from '../../../store/constant';
import { SNACKBAR_OPEN } from '../../../store/actions';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../utils/axios';
import config from '../../../config';
import { Helmet } from "react-helmet";
// project imports


//-----------------------|| PROFILE 1 - PROFILE ||-----------------------//





const Members = () => {
    const { game, socket, privileges, membersPage, setMembersPage  } = useContext(GameContext);
    const { user } = useAuth();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const getMembersPage = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get(config.gameHosts[game.serverId] + '/v1/members/', { params: { gameId: game.id, sortBy: '-currency', limit: 10 , page: membersPage.index } });
            await fct.addUsernamesToArray(response.data.results);

            setMembersPage({...membersPage, items: response.data.results,maxIndex: response.data.totalPages});

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
        setMembersPage({...membersPage, index: b});
    }

    useEffect(() => {
        getMembersPage();
    }, [membersPage.index]);

    return (
        <>  
        <Helmet>
            <title>{game.title} - Members</title>
        </Helmet>

        {isLoading ? (         
            <>
            <br />
            <Grid container justifyContent="center">     
                <CircularProgress color="secondary" size="10em"  /> 
            </Grid>
            </>       
        ) : ''} 
        
        {!isLoading && membersPage.items.length > 0 ? (
            <>
            <MemberTable membersPage={membersPage} />  
            <br />
            </>
        ) : ''}

        {!isLoading && membersPage.maxIndex > 1 ? (
            <>
            <Grid container direction="column" spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Pagination page={membersPage.index} onChange={handlePageChange} count={membersPage.maxIndex} color="primary" />
                </Grid>
            </Grid>
            </>
        ) : ''}

        {!isLoading && membersPage.items.length == 0 ? (
            <>  
                <br />
                <Grid container direction="column" spacing={2} alignItems="center">
                    <Grid item xs={12}>
                       <Typography variant="h3">No Members to show.</Typography>
                    </Grid>
                </Grid>
            </>
           
        ) : ''}

  
        

        </>
    );
};

export default Members;
