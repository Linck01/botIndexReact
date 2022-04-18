import React from 'react';

import GameStatsCards from './GameStatsCards';
import GameMainInfo from './GameMainInfo';
import { SNACKBAR_OPEN } from '../../../store/actions';
import { useDispatch } from 'react-redux';

// material-ui
import {
    Box,
    CardContent,
    Chip,
    Divider,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from '@material-ui/core';

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


//-----------------------|| PROFILE 1 - PROFILE ||-----------------------//

const GameInfo = () => {
    const { game } = React.useContext(GameContext);
    const dispatch = useDispatch();
    const [ startCurrency, setStartCurrency ] =  React.useState(game.startCurrency.$numberDecimal);
    const [ password, setPassword ] = React.useState('');
    const [ title, setTitle ] = React.useState(game.title);
    const [ desc, setDesc ] = React.useState(game.desc);
    const [ isLoading, setIsLoading ] = React.useState(true);
    
    const [ switches, setSwitches ] = React.useState({
        isPublic: game.isPublic,
    });

    const updateSettings = async () => {
        setIsLoading(true);

        try {
            const obj = { gameId: game.id, title, desc };
            const response = await axios.post(config.gameHosts[game.serverId] + '/v1/bets/', obj);
            
            dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Successfully changed settings', 
                variant: 'alert', alertSeverity: 'success', close: true });

            setIsLoading(false);
        } catch (e) { 
            setIsLoading(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
         }

    };
   
    return (
        <>
        <GameStatsCards />
        <br /><br />
        <GameMainInfo title={title} setTitle={setTitle} desc={desc} setDesc={setDesc}/>
    
        </>
        
    );
};

export default GameInfo;
