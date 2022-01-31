import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
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

// material-ui
import { Grid, makeStyles, CircularProgress} from '@material-ui/core';

import GameContext from '../../contexts/GameContext';
import useAuth from '../../hooks/useAuth';

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
    const { game, socket, betPage, setBetPage, privileges } = React.useContext(GameContext);
    const { betId } = useParams();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const getBetPage = async () => {
        try {
            setIsLoading(true);
            await fct.sleep(1000);
            const responseBet = await axios.get(config.apiHost + '/v1/bets/' + betId);
            console.log('responseBet',responseBet);
            
            await fct.sleep(1000);
            let myTips = [];
            if (user) {
                const responseMyTips = await axios.get(config.apiHost + '/v1/tips/', {params: { betId: betId, userId: user.id, limit: 32}});
                myTips = responseMyTips.data.results;
                //for (let tip of myTips) { tip.currency.$numberDecimal = parseFloat(tip.currency.$numberDecimal);tip.answerDecimal.$numberDecimal = parseFloat(tip.answerDecimal.$numberDecimal) }
            }

            setBetPage({...betPage,bet: responseBet.data, myTips});
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);

            console.log(e);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
        }
    }

    useEffect(() => {
        getBetPage();
        
    }, []);

    return (
        <>

        {isLoading ? (
            <>
            <br /><br /><br />
            <Grid container justifyContent="center">
                <CircularProgress color="secondary" size="10em"  />
            </Grid>
            <br />
            </>
        ) : ''}
        
        {!isLoading && betPage.bet ? (
            <> 
            
            <TipStatsCards bet={betPage.bet} myTips={betPage.myTips}/>
            <br />
            {!betPage.bet.isFinished ? (
                <>
               <Grid container spacing={gridSpacing} >
                    <Grid item xs={12}>
                        <AddTipDialog bet={betPage.bet} />
                    </Grid>
                    {privileges.admin || privileges.mod ? (
                        <Grid item xs={6}><FinalizeBetDialog bet={betPage.bet} /></Grid>   
                    ): ''}

                    {privileges.admin || privileges.mod ? (
                        <Grid item xs={6}><AbortBetDialog bet={betPage.bet} /></Grid>
                    ): ''}
                </Grid>
                <br /><br />     
                </>
            ) : ''}

            
            
            <Grid container spacing={gridSpacing} >
                <Grid item xs={12} sm={12} md={5}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <BetInfo bet={betPage.bet}></BetInfo>
                        </Grid>
                       
                        <Grid item xs={12}>
                            { betPage.bet.betType == 'catalogue' ? <CatalogueTipChart bet={betPage.bet} /> : '' }
                            { betPage.bet.betType == 'scale' ? <ScaleTipChart bet={betPage.bet} /> : ''}

                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={7} >
                   
                    <br />
                    <TipList></TipList>
                        
                </Grid>
            </Grid>
            <br /><br />

            <Grid container spacing={gridSpacing} >
                <Grid item xs={12}>
                    { betPage.bet.betType == 'catalogue' ? <CatalgueAnswerBox bet={betPage.bet} myTips={betPage.myTips} /> : ''}
                    { betPage.bet.betType == 'scale' ? <ScaleAnswerBox bet={betPage.bet} myTips={betPage.myTips} /> : ''} 
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