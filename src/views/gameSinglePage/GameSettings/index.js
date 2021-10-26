import React from 'react';
import useGame from '../../../hooks/useGame';

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

// assets
import PhonelinkRingTwoToneIcon from '@material-ui/icons/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@material-ui/icons/PinDropTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';

import Avatar3 from '../../../assets/images/users/avatar-3.png';


//-----------------------|| PROFILE 1 - PROFILE ||-----------------------//

const GameSettings = () => {
    const {game, socket} = useGame();
   
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={12} xs={12}>
                
            </Grid>
            
        </Grid>
    );
};

export default GameSettings;
