import React, {useState, useEffect, useRef} from 'react';
import fct from '../../utils/fct.js';

// material-ui
import { Typography, Grid, Button, InputAdornment, OutlinedInput, CircularProgress } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import BotProfileCard from '../../ui-component/cards/BotProfileCard';
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

//==============================|| SAMPLE PAGE ||==============================//


const HostedGamesPage = () => {
    const [isLoadingHostedGames, setIsLoadingHostedGames] = useState(true);
    const [hostedGames, setHostedGames] = useState([]);
    const [isLoadingAddGame, setIsLoadingAddGame] = useState(false);
    const addGameNameRef = useRef(null);
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

    const createGame = async () => {
        let err = null;

        const name = addGameNameRef.current.childNodes[0].value;

        setIsLoadingAddGame(true);
 
        try {
            const response = await axios.post(config.apiHost + '/v1/games/', { name: addGameNameRef.current.childNodes[0].value });

            await fct.sleep(1000);
            
        } catch (e) {
            err = e.response.data.message;
        }

        
        setIsLoadingAddGame(false);

        if(!err) {
            //await botModel.addBot();

            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Successfully added Game',
                variant: 'alert',
                alertSeverity: 'success',
                close: true
            });
            addGameNameRef.current.childNodes[0].value = '';
            
            getHostedGames();
        } else {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: err,
                variant: 'alert',
                alertSeverity: 'error',
                close: true
            });
        }
    };

    useEffect(() => {
        getHostedGames();
    }, []);

    return (
        <>
        
        <MainCard title="Add a Game">
            <Grid container spacing={gridSpacing}>
                <Grid item xs zeroMinWidth>
                    <Grid container alignItems="center" spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth>
                            <OutlinedInput
                                id="input-search-card-style1"
                                placeholder="Title"
                                fullWidth
                                ref={addGameNameRef}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                size="large"
                                color="success"
                                startIcon={isLoadingAddGame ? (<CircularProgress color="secondary" size="1em" />) : (<AddCircleOutlineOutlinedIcon />)}
                                sx={{ p: '12px 22px' }}
                                onClick={createGame}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>       
            </Grid>
        </MainCard>
        <br />
        <Grid container spacing={gridSpacing}>
            {isLoadingHostedGames ? (
                <>
                    <Grid item xs={12} lg={12} style={{ textAlign: 'center' }}>
                        <br /><br /><br />
                        <CircularProgress color="secondary" size="10em"  />
                    </Grid>
                </>
            ) : ''}

            {!isLoadingHostedGames ? hostedGames.map( (game) => {
                return (
                    <Grid item xs={12} lg={4} key={game.id}>              
                        <BotProfileCard {...game} />     
                    </Grid>
                );
            }) : ''}
            

        </Grid>
        
        
        </>
    );
};

export default HostedGamesPage;
