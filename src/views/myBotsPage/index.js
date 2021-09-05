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

//==============================|| SAMPLE PAGE ||==============================//


const MyBotsPage = () => {
    const [isLoadingMyBots, setIsLoadingMyBots] = useState(true);
    const [myBots, setMyBots] = useState([]);
    const [isLoadingAddBot, setIsLoadingAddBot] = useState(false);
    const addBotNameRef = useRef(null);
    const auth = useAuth();
    console.log(auth);

    const dispatch = useDispatch();

    const userProfile = {
        id: '#9Card_Madyson',
        avatar: 'user-5.png',
        profile: 'profile-back-9.png',
        name: 'Madyson',
        role: 'Product Tactics Facilitator',
        status: 'Active'
    };

    const getMyBots = async () => {
        setIsLoadingMyBots(true);
        const res = await fetch('google.com');
        //await botModel.getBotsByUser();
        await fct.sleep(1000);
        setMyBots([{id:1},{id:2},{id:3}]);
        setIsLoadingMyBots(false);
    }

    const addBot = async () => {
        let err = null;

        if (!addBotNameRef.current.childNodes[0].value)
            err = 'The name of your new bot is too short.';

        setIsLoadingAddBot(true);
 
        const res = await fetch('google.com');
        await fct.sleep(2000);
        
        setIsLoadingAddBot(false);

        if(!err) {
            //await botModel.addBot();

            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Successfully added Bot',
                variant: 'alert',
                alertSeverity: 'success',
                close: true
            });
            
            getMyBots();
        } else {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: err,
                variant: 'alert',
                alertSeverity: 'error',
                close: true
            });

            addBotNameRef.current.childNodes[0].value = '';
        }
    };

    useEffect(async () => {
        await getMyBots();
    }, []);

    return (
        <>
        
        <MainCard title="Add a Bot">
            <Grid container spacing={gridSpacing}>
                <Grid item xs zeroMinWidth>
                    <Grid container alignItems="center" spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth>
                            <OutlinedInput
                                id="input-search-card-style1"
                                placeholder="Title"
                                fullWidth
                                ref={addBotNameRef}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                size="large"
                                color="success"
                                startIcon={isLoadingAddBot ? (<CircularProgress color="secondary" size="1em" />) : (<AddCircleOutlineOutlinedIcon />)}
                                sx={{ p: '12px 22px' }}
                                onClick={addBot}>
                                Add
                            </Button>
                        </Grid>
                         
                    </Grid>
                </Grid>
                
            </Grid>
        </MainCard>
        <br />
        <Grid container spacing={gridSpacing}>
            {isLoadingMyBots ? (
                <>
                    <Grid item xs={12} lg={12} style={{ textAlign: 'center' }}>
                        <br /><br /><br />
                        <CircularProgress color="secondary" size="10em"  />
                            {/*<MuiTypography variant="h1" gutterBottom>
                                            Loading
                            </MuiTypography>*/}
                    </Grid>
                </>
            ) : ''}

            {!isLoadingMyBots ? myBots.map( (bot) => {
                return (
                    <Grid item xs={12} lg={4} key={bot.id}>
                    
                            <BotProfileCard {...userProfile} />
                        
                    </Grid>
                );
            }) : ''}
            

        </Grid>
        
        
        </>
    );
};

export default MyBotsPage;
