import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { Avatar, Divider, Grid, makeStyles, Typography, Pagination, CircularProgress } from '@material-ui/core';
import SubCard from '../../ui-component/cards/SubCard';
import { gridSpacing } from '../../store/constant';
import fct from '../../utils/fct.js';
import config from '../../config';
import axios from '../../utils/axios';
import TipListItem from './TipListItem';
import { SNACKBAR_OPEN } from '../../store/actions';
import GameContext from '../../contexts/GameContext';


//================================|| UI LIST - CUSTOM ||================================//

export default function CustomList(props) {
    const dispatch = useDispatch();
    const { game, setBetPage, betPage  } = useContext(GameContext);

    const handlePageChange = async (a,b,c) => {
        setBetPage({...betPage, tipListPage: {...betPage.tipListPage,index:b} });
        getTipsPage();
    }

    const getTipsPage = async () => {
        try {
            await fct.sleep(1000);
            let responseTips = (await axios.get(config.apiHost + '/v1/tips/', {params: { betId: betPage.bet.id, sortBy: 'createdAt', limit: 10 , page: betPage.tipListPage.index }}));
 
            await fct.addUsernamesToArray(responseTips.data.results);
            
            setBetPage({...betPage, tipListPage: {...betPage.tipListPage,items:responseTips.data.results,maxIndex:responseTips.data.totalPages,isInitialized:true} });

        } catch (e) {
            console.log(e);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
        }
    }
 
    useEffect(() => {
        getTipsPage();
    }, []);

    return (
        <>
        {!betPage.tipListPage.isInitialized ? (
            <>
            <br /><br /><br />
            <Grid container justifyContent="center">
                <CircularProgress color="secondary" size="10em"  />
            </Grid>
            <br />
            </>
        ) : ''} 

        {betPage.tipListPage.isInitialized && betPage.tipListPage.items.length > 0 ? (
            <>
            <Grid container spacing={gridSpacing} alignItems="center" style={{padding: ' 0 7%'}}>
                {betPage.tipListPage.items.map((tip) => <TipListItem tip={tip} bet={betPage.bet} />)}
            </Grid>
            <Grid container direction="column" spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Pagination page={betPage.tipListPage.index} onChange={handlePageChange} count={betPage.tipListPage.maxIndex} color="primary" />
                </Grid>
            </Grid>
          
            </>
        ) : ''}

        {betPage.tipListPage.isInitialized && betPage.tipListPage.items.length == 0 ? (
            <>
                <Grid container direction="column" spacing={2} alignItems="center">
                    <Grid item xs={12}>
                       <Typography variant="h3">No tips yet. </Typography>
                    </Grid>
                </Grid>
            </>
           
        ) : ''}

        

        </>
    );
}
