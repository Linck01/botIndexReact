import React, {useState, useEffect, useRef, useContext} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GameContext from '../../../contexts/GameContext';
import fct from '../../../utils/fct.js';
import BetListItem from './BetListItem';

import { Divider, Typography, CardMedia, Stack, Switch, Pagination, Grid, Button, InputAdornment, OutlinedInput, CircularProgress, Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
// project imports
import SubCard from '../../../ui-component/cards/SubCard';
import AddBetDialog from './AddBetDialog';
import { gridSpacing } from '../../../store/constant';
import { SNACKBAR_OPEN } from '../../../store/actions';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../utils/axios';
import config from '../../../config';
// project imports
import MainCard from './../../../ui-component/cards/MainCard';
import SecondaryAction from './../../../ui-component/cards/CardSecondaryAction';
import Transitions from '../../../ui-component/extended/Transitions';
import image from '../../../assets/images/profile/img-profile-bg.png';

// assets
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

//-----------------------|| PROFILE 1 - PROFILE ||-----------------------//


const Bets = () => {
    const { game, socket, amIAdmin, amIMod  } = useContext(GameContext);
    const [bets, setBets] = useState([]);
    const [isLoadingBets, setIsLoadingBets] = useState(true);
    const { user } = useAuth();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const getBets = async () => {
        setIsLoadingBets(true);

        try {
            const response = await axios.get(config.apiHost + '/v1/bets/', { params: { gameId: game.id, sortBy: 'createdAt', limit: 10 , page: page } });

            //setMaxPage(response.data.totalPages);
            console.log(response);
            await fct.sleep(1000);
            setBets(response.data.results);
        } catch (e) {
            console.log(e);
            
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: e.message,
                variant: 'alert',
                alertSeverity: 'error',
                close: true
            });
        }

        setIsLoadingBets(false);
    }

    const handlePageChange = async (a,b,c) => {
        console.log(a,b,c);
        setPage(b);
    }

    useEffect(() => {
        getBets();
    }, [page]);

    return (
        <>  

        {(amIAdmin || amIMod) ? (        
            <>
            <AddBetDialog getBets={getBets} />
            <br />
            </>
        ) : ''}    
        
        {isLoadingBets ? (
           
            <>
            <br />
            <Grid container justifyContent="center">
                
                <CircularProgress color="secondary" size="10em"  />
                
            </Grid>
            </>
         
        ) : ''} 
        
        {!isLoadingBets && bets.length > 0 ? (
            <>
                {bets.map((bet) => (
                    <BetListItem bet={bet} />  
                ))}
                <br />
                <Grid container direction="column" spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <Pagination page={page} onChange={handlePageChange} count={maxPage} color="primary" />
                    </Grid>
                </Grid>
            </>
           
        ) : ''}

        {!isLoadingBets && bets.length == 0 ? (
            <>
                <Grid container direction="column" spacing={2} alignItems="center">
                    <Grid item xs={12}>
                       <Typography variant="h3">No bets to show.</Typography>
                    </Grid>
                </Grid>
            </>
           
        ) : ''}

        
        {bets ? (<></>) : ''}
        
        

        </>
    );
};

export default Bets;
