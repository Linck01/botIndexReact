import React, {useState, useEffect, useRef} from 'react';
import fct from '../../utils/fct.js';

// material-ui
import { Typography, Grid, Button, InputAdornment, OutlinedInput, CircularProgress } from '@material-ui/core';
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
    const [isLoadingHostedGames, setIsLoadingHostedGames] = useState(true);
    const [hostedGames, setHostedGames] = useState([]);
    const auth = useAuth();

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
        setIsLoadingHostedGames(true);

        try {
            const response = await axios.get(config.apiHost + '/v1/games/', { params: { userId: auth.user.id, sortBy: 'createdAt', limit: 10 , page: 0 } });

            await fct.sleep(1000);
            setHostedGames(response.data.results); // [{id:1},{id:2},{id:3}]
        } catch (e) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: e.response.data.message,
                variant: 'alert',
                alertSeverity: 'error',
                close: true
            });
        }

        setIsLoadingHostedGames(false);
    }

    useEffect(() => {
        getHostedGames();
    }, []);

    return (
        <>
            <AddGameDialog getHostedGames={getHostedGames}/>
 
            <br /><br />
      
            {isLoadingHostedGames ? (
                <>
                    
                    <Grid item xs={12} lg={12} style={{ textAlign: 'center' }}>
                        <CircularProgress color="secondary" size="10em"  />
                    </Grid>
                </>
            ) : ''}
            
            <Grid container spacing={gridSpacing}>
            {!isLoadingHostedGames ? hostedGames.map( (game) => {
                return (
                    <Grid item xs={12} lg={4} key={game.id}>              
                        <GameCard1 game={game} />     
                    </Grid>
                );
            }) : ''}
            </Grid>

            {!isLoadingHostedGames && hostedGames.length == 0 ? (
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
