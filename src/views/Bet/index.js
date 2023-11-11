import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import fct from '../../utils/fct.js';
import config from '../../config';
import TipList from './TipList';
import BetInfo from './BetInfo';
import CatalogueAnswerBox from './CatalogueAnswerBox';
import ScaleAnswerBox from './ScaleAnswerBox';
import AddTipDialog from './AddTipDialog';
import CatalogueTipChart from './CatalogueTipChart';
import ScaleTipChart from './ScaleTipChart';
import TipStatsCards from './TipStatsCards';
import SettlementBox from './SettlementBox';
import SolveBetDialog from './SolveBetDialog';
import AbortBetDialog from './AbortBetDialog';
import EndBetDialog from './EndBetDialog';
import DeleteBetDialog from './DeleteBetDialog';
import { SNACKBAR_OPEN } from '../../store/actions';
import { gridSpacing } from '../../store/constant';
import { Helmet } from "react-helmet";
import { Grid, CircularProgress} from '@material-ui/core';
import GameContext from '../../contexts/GameContext';
import useAuth from '../../hooks/useAuth';
import SocialMediaShareButtons from './SocialMediaShareButtons';

const BetDetails = () => {
    const dispatch = useDispatch();
    const { betPage, setBetPage, privileges } = React.useContext(GameContext);
    const { betUri } = useParams();
    const betId = fct.disassembleGameOrBetUri(betUri);
    const { user } = useAuth();
    const [ isLoading, setIsLoading ] = useState(false);

    const getBetPage = async () => {
        try {
            setIsLoading(true);

            const responseBet = await axios.get(config.apiHost + '/v1/bets/' + betId);
            console.log('responseBet',responseBet);
            
            let myTips = [];
            if (user) {
                const responseMyTips = await axios.get(config.apiHost + '/v1/tips/', {params: {betId: betId, userId: user.id, limit: 512}});
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

    /*useEffect(() => {
        //betHasEnded = '';
        console.log('JJJJJJJJJJJJJJJJJJJJJJJJJJJJ');
    }, [betPage.bet]);*/

    return (
        <>
       
        {betPage.bet ? (
            <Helmet>
                <title>{betPage.bet.title}</title>
                <meta name='description' content={betPage.bet.desc} />
                <meta name='keywords' content={betPage.bet.title.split(' ').concat(config.genericKeywords).join(',')} />
            </Helmet>
        ) : ''}
    
        {isLoading ? (
            <>
            <br /><br />
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
            
            {!betPage.bet.isSolved && !betPage.bet.isAborted && !fct.hasBetEnded(betPage.bet) ? (
                <>
               <Grid container spacing={gridSpacing}>  
                    <Grid item xs={12}><AddTipDialog bet={betPage.bet} /></Grid>   
                </Grid><br />
                </>
            ) : ''}

            {!betPage.bet.isSolved && !betPage.bet.isAborted && (privileges.admin || privileges.mod) ? (
                <>
                    {!fct.hasBetEnded(betPage.bet) ? (
                        <Grid container spacing={gridSpacing} >
                            <Grid item xs={4}><EndBetDialog bet={betPage.bet} /></Grid>
                            <Grid item xs={4}><SolveBetDialog bet={betPage.bet} /></Grid>
                            <Grid item xs={4}><AbortBetDialog bet={betPage.bet} /></Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={gridSpacing} >
                            <Grid item xs={6}><SolveBetDialog bet={betPage.bet} /></Grid>
                            <Grid item xs={6}><AbortBetDialog bet={betPage.bet} /></Grid>
                        </Grid>
                    )}
                <br />
                </>
            ) : ''}
            
                      
            <Grid container spacing={gridSpacing} >
                <Grid item xs={12} sm={12} md={5}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <BetInfo bet={betPage.bet}></BetInfo>
                        </Grid>
                        <Grid item xs={12}>
                            { betPage.bet.betType === 'catalogue' ? <CatalogueTipChart bet={betPage.bet} /> : '' }
                            { betPage.bet.betType === 'scale' ? <ScaleTipChart bet={betPage.bet} /> : ''}
                           
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={7} >
                    <br />
                    <TipList />              
                </Grid>
            </Grid>
            <br />
            <SocialMediaShareButtons />  
            <br />
       
            <Grid container spacing={gridSpacing} >
                <Grid item xs={12}>
                    { betPage.bet.betType === 'catalogue' ? <CatalogueAnswerBox bet={betPage.bet} myTips={betPage.myTips} /> : ''}
                    { betPage.bet.betType === 'scale' ? <ScaleAnswerBox bet={betPage.bet} myTips={betPage.myTips} /> : ''} 
                </Grid>
            </Grid>
            
            {betPage.bet.isSolved || betPage.bet.isAborted ? (
                <><br /><br />
               <Grid container spacing={gridSpacing} >
                    <Grid item xs={12}><SettlementBox bet={betPage.bet} /></Grid>   
                </Grid><br />
                </>
            ) : ''}
            
            {betPage.bet.isPaid && (privileges.admin || privileges.mod) ? (
                <>
                <Grid container spacing={gridSpacing} >  
                    <Grid item xs={12}><DeleteBetDialog bet={betPage.bet} /></Grid>   
                </Grid><br />
                </>
            ) : ''}
            
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