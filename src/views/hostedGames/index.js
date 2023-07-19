import React, {useState, useEffect } from 'react';
import { Typography, Grid, CircularProgress, Pagination } from '@material-ui/core';
import GameCard1 from '../../ui-component/cards/GameCard1';
import { gridSpacing } from '../../store/constant';
import { SNACKBAR_OPEN } from '../../store/actions';
import { useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import axios from '../../utils/axios';
import config from '../../config';
import AddGameDialog from './AddGameDialog';
import { Helmet } from "react-helmet";

const HostedGamesPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [hostedGames, setHostedGames] = useState([]);
    const { user } = useAuth();
    const [page, setPage] = useState({index: 1, maxIndex: 1});

    const dispatch = useDispatch();

    const getHostedGames = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get(config.apiHost + '/v1/games/', { params: { userId: user.id, sortBy: '-_createdAt', limit: 9 , page: page.index } });

            setHostedGames(response.data.results);
            setPage({...page, maxIndex: response.data.totalPages});
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            console.log(e);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
        }
    }

    const handlePageChange = async (a,b,c) => {
        setPage({...page, index: b});
    }

    useEffect(() => {
        getHostedGames();
    }, [page.index]);

    return (
        <>
            <Helmet>
                <title>Hosted Games</title>
                <meta name='description' content='The games hosted by you.' />
                <meta name='keywords' content='hosted,hosted games,own games,my games' />
            </Helmet>

            <AddGameDialog getHostedGames={getHostedGames}/>
 
            {isLoading ? (
                <><br /><br />  
                <Grid item xs={12} lg={12} style={{ textAlign: 'center' }}>
                    <CircularProgress color="secondary" size="10em"  />
                </Grid>
                </>
            ) : ''}
            
            
            {!isLoading && hostedGames.length > 0 ? (
                <><br />
                <Grid container spacing={gridSpacing}>
                    {hostedGames.map( (game) => {
                        return (
                            <Grid item xs={12} lg={4} key={game.id}>              
                                <GameCard1 game={game} />     
                            </Grid>
                        );
                    })}
                </Grid>
                <br />
                <Grid container direction="column" spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <Pagination page={page.index} onChange={handlePageChange} count={page.maxIndex} color="primary" />
                    </Grid>
                </Grid>
                </>)
                : ''}
        

            {!isLoading && hostedGames.length == 0 ? (
                <><br /><br />
                    <Grid container direction="column" spacing={2} alignItems="center">
                        <Grid item xs={12}>
                        <Typography variant="h3">No games to show.</Typography>
                        </Grid>
                    </Grid>
                </>
            ) : ''}
        </>
    );
};

export default HostedGamesPage;
