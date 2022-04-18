import PropTypes from 'prop-types';
import React from 'react';
import useColors from '../../../../../hooks/useColors';
import fct from '../../../../../utils/fct.js';
import axios from '../../../../../utils/axios';
import config from '../../../../../config';
import { SNACKBAR_OPEN } from '../../../../../store/actions';
import { useDispatch } from 'react-redux';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography, CardHeader } from '@material-ui/core';
import { IconHeart } from '@tabler/icons';
import GameContext from '../../../../../contexts/GameContext';
import useAuth from '../../../../../hooks/useAuth';


const useStyles = makeStyles((theme) => ({
    socialHoverCard: {
        position: 'relative',
        background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.light,
        color: '#fff',
        '&:hover svg': {
            opacity: '1',
            transform: 'scale(1.1)'
        }
    },
    socialHoverCardHeader: {
        position: 'relative',
        background: theme.palette.mode === 'dark' ? theme.palette.primary.dark.main : theme.palette.primary.light,
        color: '#fff',
        '&:hover svg': {
            opacity: '1',
            transform: 'scale(1.1)'
        }
    },
}));

//===========================|| HOVER SOCIAL CARD ||===========================//

const MemberCurrencyCard = (props) => {
    const classes = useStyles();
    const { game, member } = React.useContext(GameContext);
    const { user } = useAuth();

    const { colors } = useColors();
    const theme = useTheme();
    const [ favorited, setFavorited ] = React.useState(member ? member.isFavoritedGame : false);
    const dispatch = useDispatch();

    const changeIsFavoritedGame = async () => {
        setFavorited(!favorited);
        await updateFavorited();
    }

    React.useEffect(() => {
        if (member)
            setFavorited(member.isFavoritedGame);

    }, [member]);
    
    const updateFavorited = async () => {
        //setIsLoading(true);

        try {
            const obj = { isFavoritedGame: !favorited };
            const response = await axios.patch(config.apiHost + '/v1/members/' + game.id + '/' + user.id, obj);
            console.log(response);
            //dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Successfully changed settings', 
            //    variant: 'alert', alertSeverity: 'success', close: true });

            //setIsLoading(false);
        } catch (e) { 
            //setIsLoading(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
         }
    };

    return (
        <Card className={classes.socialHoverCard}>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <Typography variant="subtitle1" color="inherit">
                            {game.title}
                        </Typography>  
                    </Grid>
                    <Grid item xs={2}>
                        {member ? (<IconHeart onClick={changeIsFavoritedGame} style={{width: '1.9em',height: '1.9em', stroke: colors.errorMain, fill: favorited ? colors.errorMain : 'none'}} />) : ''}
                                                            
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="caption" color="inherit" style={{fontSize: '1.5em'}}>
                        
                        </Typography>
                        <Typography variant="caption" color="inherit" style={{fontSize: '1.5em'}}>
                            {member ? parseFloat(member.currency.$numberDecimal).toFixed(2) : '1000'}
                        </Typography>
                        <Typography variant="caption" color="inherit" style={{fontSize: '1.5em',marginLeft:'5px'}}>
                            {game.currencyName}
                        </Typography>
                        
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

MemberCurrencyCard.propTypes = {
    member: PropTypes.object
};

export default MemberCurrencyCard;
