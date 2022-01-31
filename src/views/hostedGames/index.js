import React, {useState, useEffect, useRef} from 'react';
import fct from '../../utils/fct.js';

// material-ui
import { Typography, Grid, Button, InputAdornment, OutlinedInput, CircularProgress, Pagination } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';


// project imports
import MainCard from '../../ui-component/cards/MainCard';
import GameCard1 from '../../ui-component/cards/GameCard1';
import { IconSearch } from '@tabler/icons';
import SubCard from '../../ui-component/cards/SubCard';
import useFetch from '../../hooks/useFetch';
import { gridSpacing } from '../../store/constant';
import MuiTypography from '@material-ui/core/Typography';
import { SNACKBAR_OPEN } from '../../store/actions';
import { useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import axios from '../../utils/axios';
import config from '../../config';
import AddGameDialog from './AddGameDialog';

//==============================|| SAMPLE PAGE ||==============================//

const HostedGamesPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [hostedGames, setHostedGames] = useState([]);
    const auth = useAuth();
    const [page, setPage] = useState({index: 1, maxIndex: 1});

    const dispatch = useDispatch();

    const userProfile = {
        id: '#9Card_Madyson',
        avatar: 'user-5.png',
        profile: 'profile-back-9.png',
        name: 'Madyson',
        role: 'Product Tactics Facilitator',
        status: 'Active'
    };

    const getHostedGames = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get(config.apiHost + '/v1/games/', { params: { userId: auth.user.id, sortBy: 'createdAt', limit: 9 , page: page.index } });

            await fct.sleep(1000);
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
            <AddGameDialog getHostedGames={getHostedGames}/>
 
            <br /><br />
      
            {isLoading ? (
                <>
                    
                    <Grid item xs={12} lg={12} style={{ textAlign: 'center' }}>
                        <CircularProgress color="secondary" size="10em"  />
                    </Grid>
                </>
            ) : ''}
            
            
            {!isLoading && hostedGames.length > 0 ? (
                <>
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
                <>
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
