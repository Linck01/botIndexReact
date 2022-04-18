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
    const { game, socket, privileges, betsPage, setBetsPage  } = useContext(GameContext);
    const { user } = useAuth();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const getBetsPage = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get(config.apiHost + '/v1/bets/', { params: { gameId: game.id, sortBy: '-_createdAt', limit: 5 , page: betsPage.index } });

            setBetsPage({...betsPage, items: response.data.results,maxIndex: response.data.totalPages});
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
        setBetsPage({...betsPage, index: b});
    }

    useEffect(() => {
        getBetsPage();
    }, [betsPage.index]);

    return (
        <>  
        {(privileges.admin || privileges.mod) ? (        
            <>
            <AddBetDialog/>
            <br />
            </>
        ) : ''}    
        
        {isLoading ? (
           
            <>
            <br />
            <Grid container justifyContent="center">
                
                <CircularProgress color="secondary" size="10em"  />
                
            </Grid>
            </>
         
        ) : ''} 
        
        {!isLoading && betsPage.items.length > 0 ? (
            <>
                {betsPage.items.map((bet) => (
                    <BetListItem key={bet.id} bet={bet} />  
                ))}
                <br />
                <Grid container direction="column" spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <Pagination page={betsPage.index} onChange={handlePageChange} count={betsPage.maxIndex} color="primary" />
                    </Grid>
                </Grid>
            </>
           
        ) : ''}

        {!isLoading && betsPage.items.length == 0 ? (
            <>  
                <br />
                <Grid container direction="column" spacing={2} alignItems="center">
                    <Grid item xs={12}>
                       <Typography variant="h3">No bets to show.</Typography>
                    </Grid>
                </Grid>
            </>
           
        ) : ''}

  
        

        </>
    );
};

export default Bets;
