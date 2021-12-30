import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import fct from '../../utils/fct.js';
import config from '../../config';
import TipList from './TipList';
import BetInfo from './BetInfo';
import AnswerBox from './AnswerBox';
import AddTipDialog from './AddTipDialog';
import TipChart from './TipChart';
import TipStatsCards from './TipStatsCards';
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
    const { game, socket, amIAdmin, amIMod } = React.useContext(GameContext);
    const { betId, gameId } = useParams();
    const [myTips, setMyTips] = React.useState([]);
    const [bet, setBet] = React.useState(null);
    const [isLoadingBet, setIsLoadingBet] = React.useState(true);
    const { user } = useAuth();

    const getBet = async () => {
        setIsLoadingBet(true);

        try {
            await fct.sleep(1000);
            const responseBet = await axios.get(config.apiHost + '/v1/bets/' + betId);
            
            setBet(responseBet.data);

            if (user) {
                const responseMyTips = await axios.get(config.apiHost + '/v1/tips/', {params: { betId: betId, userId: user.id, limit: 32}});
                setMyTips(responseMyTips.data.results);
            }
        } catch (e) {
            console.log(e);
            
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: e.message,
                variant: 'alert',
                alertSeverity: 'error',
                close: true
            });
        }

        

        setIsLoadingBet(false);
    }
 
    useEffect(() => {
        getBet();
    }, []);

    return (
        <>

        {isLoadingBet ? (
            <>
            <br /><br /><br />
            <Grid container justifyContent="center">
                <CircularProgress color="secondary" size="10em"  />
            </Grid>
            <br />
            </>
        ) : ''} 
        
        {!isLoadingBet && bet ? (
            <> 
            <AddTipDialog bet={bet} getBet={getBet} />
            <br /><br />
            <TipStatsCards bet={bet} />
            <br />
            <Grid container spacing={gridSpacing} >
                <Grid item xs={12} sm={12} md={6}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <BetInfo bet={bet}></BetInfo>
                        </Grid>
                        <Grid item xs={12}>
                            <AnswerBox bet={bet} myTips={myTips}></AnswerBox>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6} >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <TipChart></TipChart>
                        </Grid>
                        <Grid item xs={12}>
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