import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import fct from '../../utils/fct.js';
import config from '../../config';
import TipList from './TipList';
import BetInfo from './BetInfo';
import CatalgueAnswerBox from './CatalgueAnswerBox';
import ScaleAnswerBox from './ScaleAnswerBox';
import AddTipDialog from './AddTipDialog';
import CatalogueTipChart from './CatalogueTipChart';
import ScaleTipChart from './ScaleTipChart';
import TipStatsCards from './TipStatsCards';
import FinalizeBetDialog from './FinalizeBetDialog';
import AbortBetDialog from './AbortBetDialog';

import { SNACKBAR_OPEN } from '../../store/actions';
import { gridSpacing } from '../../store/constant';
import AnimateButton from '../../ui-component/extended/AnimateButton';

// material-ui
import { Button, Box, CardMedia, Grid, Stack, Switch, Typography, makeStyles, Pagination, CircularProgress, Divider, TextField } from '@material-ui/core';
import BlockTwoToneIcon from '@material-ui/icons/BlockTwoTone';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import SubCard from '../../ui-component/cards/SubCard';
import Transitions from '../../ui-component/extended/Transitions';
import GameContext from '../../contexts/GameContext';
import useAuth from '../../hooks/useAuth';

// assets
import image from '../../assets/images/profile/img-profile-bg.png';
import AttachmentTwoToneIcon from '@material-ui/icons/AttachmentTwoTone';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LayersTwoToneIcon from '@material-ui/icons/LayersTwoTone';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import PublicTwoToneIcon from '@material-ui/icons/PublicTwoTone';
import RecentActorsTwoToneIcon from '@material-ui/icons/RecentActorsTwoTone';

//-----------------------|| UTILITIES - ANIMATION ||-----------------------//

const useStyles = makeStyles((theme) => ({
    btnTable: {
        borderRadius: '4px',
        paddingLeft: '4px',
        paddingRight: '4px',
        width: '100%',
        minWidth: '120px',
        '&:hover': {
            background: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            color: '#fff'
        }
    }
}));

const BetDetails = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { game, socket, amIAdmin, amIMod, betPage, setBetPage } = React.useContext(GameContext);
    const { betId } = useParams();
    const { user } = useAuth();

    const getBet = async () => {
        try {
            await fct.sleep(1000);
            const responseBet = await axios.get(config.apiHost + '/v1/bets/' + betId);
            
            
            await fct.sleep(1000);
            let myTips = [];
            if (user) {
                const responseMyTips = await axios.get(config.apiHost + '/v1/tips/', {params: { betId: betId, userId: user.id, limit: 32}});
                myTips = responseMyTips.data.results;
            }

            setBetPage({...betPage,bet: responseBet.data, myTips, isInitialized: true});
            
        } catch (e) {

            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
        }
    }

    useEffect(() => {
        if (betPage.isInitialized) {
            setBetPage({...betPage,isInitialized: false});
            getBet();
        } else
            getBet();
    
        
    }, []);

    return (
        <>

        {!betPage.isInitialized ? (
            <>
            <br /><br /><br />
            <Grid container justifyContent="center">
                <CircularProgress color="secondary" size="10em"  />
            </Grid>
            <br />
            </>
        ) : ''}
        
        {betPage.isInitialized ? (
            <> 
            <Grid container spacing={gridSpacing} >
                <Grid item xs={12}>
                    <AddTipDialog bet={betPage.bet} getBet={getBet} />
                </Grid>
                <Grid item xs={6}>
                    <FinalizeBetDialog bet={betPage.bet} />
                </Grid>
                <Grid item xs={6}>
                    <AbortBetDialog bet={betPage.bet} />
                </Grid>
            </Grid>
            <br /><br />
            <TipStatsCards bet={betPage.bet} myTips={betPage.myTips}/>
            <br /><br />
            
            <Grid container spacing={gridSpacing} >
                <Grid item xs={12} sm={12} md={4}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <BetInfo bet={betPage.bet}></BetInfo>
                        </Grid>
                       
                        <Grid item xs={12}>
                            { betPage.bet.betType == 'catalogue' ? <CatalogueTipChart bet={betPage.bet} /> : ''}
                            { betPage.bet.betType == 'scale' ? <ScaleTipChart bet={betPage.bet} /> : ''}

                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={8} >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            { betPage.bet.betType == 'catalogue' ? <CatalgueAnswerBox bet={betPage.bet} myTips={betPage.myTips} /> : ''}
                            { betPage.bet.betType == 'scale' ? <ScaleAnswerBox bet={betPage.bet} myTips={betPage.myTips} /> : ''} 
                        </Grid>
                        <Grid item xs={12}>
                            <br />
                            <TipList></TipList>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid container justifyContent="center" spacing={3}>
                
            </Grid>
            <br /><br /><br /><br />
            <Grid container justifyContent="center" spacing={3}>
                
            </Grid>
          
                
              
                <br /><br />
            </>
        ) : ''}

        
        {(amIAdmin || amIMod) ? (
            <>  
               
                <br /><br />
            </>
        ) : ''} 
        </>

        
               
    );
};

export default BetDetails;

/* 
<Link to={'/game/' + gameId}>
                <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    className={classes.btnTable}
                    startIcon={<ChatBubbleTwoToneIcon />}>
                    
                    Place Tip
                </Button>
        </Link>
*/