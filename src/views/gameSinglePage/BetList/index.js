import React, {useState, useEffect, useRef, useContext} from 'react';
import GameContext from '../../../contexts/GameContext';
import fct from '../../../utils/fct.js';
import { Typography, Grid, Button, InputAdornment, OutlinedInput, CircularProgress } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useDispatch } from 'react-redux';
// project imports
import SubCard from '../../../ui-component/cards/SubCard';
import FormDialog from './FormDialog';

import { gridSpacing } from '../../../store/constant';
import { SNACKBAR_OPEN } from '../../../store/actions';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../utils/axios';
import config from '../../../config';


//-----------------------|| PROFILE 1 - PROFILE ||-----------------------//

const BetList = () => {
    const { game, socket, amIAdmin, amIMod } = useContext(GameContext);
    const [isLoadingBets, setIsLoadingBets] = useState(true);
    const [bets, setBets] = useState([]);
    const auth = useAuth();
    const dispatch = useDispatch();
    console.log(amIAdmin,amIMod);
    const getBets = async () => {
        setIsLoadingBets(true);

        try {
            //const response = await axios.get(config.apiHost + '/v1/games/', { params: { userId: auth.user.id, sortBy: 'createdAt', limit: 10 , page: 0 } });

            await fct.sleep(1000);
            //setBets(response.data.results); // [{id:1},{id:2},{id:3}]
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

        setIsLoadingBets(false);
    }

    useEffect(() => {
        getBets();
    }, []);

    return (
        <>
        {(amIAdmin || amIMod) ? (
            <>
                <Grid container justifyContent="center">
                    <FormDialog getBets={getBets}/>
                </Grid>
            </>
        ) : ''}
        

        <Grid container spacing={gridSpacing}>
        <Grid item xs={12} lg={12}></Grid>
        
            {isLoadingBets ? (
                    <>
                        <Grid item xs={12} lg={12} style={{ textAlign: 'center' }}>
                            <br /><br /><br />
                            <CircularProgress color="secondary" size="10em"  />
                        </Grid>
                    </>
                ) : ''}

            {!isLoadingBets ? bets.map( (game) => {
                return (
                    <Grid item xs={12} lg={4} key={game.id}>              
                        
                    </Grid>
                );
            }) : ''}
            
        </Grid>
        </>
    );
};

export default BetList;
