import React from 'react';

import GameStatsCards from './GameStatsCards';
import GameMainInfo from './GameMainInfo';
import GameTopMembers from './GameTopMembers';
import GameTopBets from './GameTopBets';
import { SNACKBAR_OPEN } from '../../../store/actions';
import { useDispatch } from 'react-redux';

// material-ui
import { Grid, CircularProgress } from '@material-ui/core';

// project imports
import Avatar from '../../../ui-component/extended/Avatar';
import SubCard from '../../../ui-component/cards/SubCard';
import { gridSpacing } from '../../../store/constant';
import GameContext from '../../../contexts/GameContext';
import fct from '../../../utils/fct.js';
import axios from '../../../utils/axios';
import config from '../../../config';

// assets
import PhonelinkRingTwoToneIcon from '@material-ui/icons/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@material-ui/icons/PinDropTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';

import Avatar3 from '../../../assets/images/users/avatar-3.png';
import { Helmet } from "react-helmet";

//-----------------------|| PROFILE 1 - PROFILE ||-----------------------//

const GameInfo = () => {
    const { game } = React.useContext(GameContext);
    const dispatch = useDispatch();
    const [ isLoading, setIsLoading ] = React.useState(true);
    const [ topMembers, setTopMembers ] = React.useState([]);
    const [ topBets, setTopBets ] = React.useState([]);
    const [ adminUsername, setAdminUsername ] = React.useState('');

    const getTopMembersAndBets = async () => {
        try {
            const responseMembers = await axios.get(config.gameHosts[game.serverId] + '/v1/members/', { params: { gameId: game.id, sortBy: '-currency', limit: 3 , page: 1 } });
            await fct.addUsernamesToArray(responseMembers.data.results);
            setTopMembers(responseMembers.data.results);

            const responseBets = await axios.get(config.gameHosts[game.serverId] + '/v1/bets/', { params: { gameId: game.id, sortBy: '-inPot', limit: 3 , page: 1 } });
            setTopBets(responseBets.data.results);
        } catch (e) {
            console.log(e);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
        }
    }

    const getAdminUsername = async () => {
        try {
            const res = await fct.addUsernamesToArray([{userId: game.userId}]);
            setAdminUsername(res[0].username);
        } catch (e) {
            console.log(e);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
        }
    }

    const init = async () => {
        setIsLoading(true);
        await getTopMembersAndBets();
        await getAdminUsername();
        setIsLoading(false);
    }
    
    React.useEffect(() => {
        init();
    }, []);

    return (
        <>
        <Helmet>
            <title>{game.title} - Info</title>
        </Helmet>

        {isLoading ? (         
            <>
            <br /><br />
            <Grid container justifyContent="center">     
                <CircularProgress color="secondary" size="10em"  /> 
            </Grid>
            </>       
        ) : ''}

        {!isLoading ? (
            <>
            <GameStatsCards />
            <br /><br /> 
            <GameMainInfo adminUsername={adminUsername}/>
            <br /><br />
            <GameTopMembers topMembers={topMembers} />
            <br /><br />
            <GameTopBets topBets={topBets} />
            </>       
        ) : ''}

        </>   
    );
};

export default GameInfo;
