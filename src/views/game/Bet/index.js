import React from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { Button, Box, CardMedia, Grid, Stack, Switch, Typography } from '@material-ui/core';
import BlockTwoToneIcon from '@material-ui/icons/BlockTwoTone';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';
import SubCard from '../../../ui-component/cards/SubCard';
import Transitions from '../../../ui-component/extended/Transitions';

// assets
import image from '../../../assets/images/profile/img-profile-bg.png';

//-----------------------|| UTILITIES - ANIMATION ||-----------------------//

const BetDetails = (props) => {
    const customization = useSelector((state) => state.customization);
    const { bet } = props;

    return (
        
                    <Grid container justifyContent="center" spacing={3}>
                       wfewgwergergerg<br />edsfege<br />edsfege<br />edsfege<br />edsfege<br />edsfege<br />
                       <Button variant="outlined" color="primary">
                        Create A New Bet
                        </Button>
                    </Grid>
               
    );
};

export default BetDetails;
