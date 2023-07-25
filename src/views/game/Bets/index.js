import React, {useState, useEffect, useContext} from 'react';
import GameContext from '../../../contexts/GameContext';
import BetListItem from './BetListItem';
import { Typography,Pagination, Grid, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import AddBetDialog from './AddBetDialog';
import { SNACKBAR_OPEN } from '../../../store/actions';
import axios from '../../../utils/axios';
import config from '../../../config';
import { Helmet } from "react-helmet";

const Bets = () => {
    const { game, privileges, betsPage, setBetsPage  } = useContext(GameContext);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const customization = useSelector((state) => state.customization);

    const getBetsPage = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get(config.apiHost + '/v1/bets/', { params: {
                gameId: game.id, 
                sortBy: '-_createdAt', 
                limit: 5 , 
                page: betsPage.index, 
                isAborted: customization.showAbortedBets,  
                isSolved: customization.showSolvedBets 
            }});

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
        setBetsPage({...betsPage, index: b});
    }

    useEffect(() => {
        getBetsPage();
    }, [betsPage.index, customization.showInProgressBets,customization.showAbortedBets, customization.showEndedBets, customization.showSolvedBets]);

    return (
        <>
        <Helmet>
            <title>{game.title} - Bets</title>
        </Helmet>

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

        {!isLoading && betsPage.items.length === 0 ? (
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
