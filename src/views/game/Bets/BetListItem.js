import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, makeStyles, Typography, Divider, Card, CardContent } from '@material-ui/core';
import { gridSpacing } from '../../../store/constant';
import ForwardIcon from '@material-ui/icons/Forward';
import GameContext from '../../../contexts/GameContext';
import fct from '../../../utils/fct.js';
import BetStatusTab from '../../../ui-component/game/BetStatusTab';
import SubCard from './../../../ui-component/cards/SubCard';

const useStyles = makeStyles((theme) => ({
    successBadge: {
        color: theme.palette.success.dark,
        width: '14px',
        height: '14px'
    },
    iconError: {
        width: '60px',
        height: '60px',
        color: theme.palette.mode === 'dark' ? theme.palette.error.dark : theme.palette.error.light
    },
    iconSuccess: {
        width: '60px',
        height: '60px',
        color: theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.main
    },
    iconWarning: {
        width: '60px',
        height: '60px',
        color: theme.palette.mode === 'dark' ? theme.palette.warning.dark : theme.palette.warning.main
    },
    iconInfo: {
        width: '60px',
        height: '60px',
        color: theme.palette.mode === 'dark' ? theme.palette.info.dark : theme.palette.info.light
    },
    btnTable: {
        width: '100%',
        /*'&:hover': {
            background: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            color: '#fff'
        }*/
    },
    tableSubContent: {
        whiteSpace: 'break-spaces'
    },
    divider: {
        opacity: 0.1,
        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.primary.light 
    },
    card: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100],
        marginBottom: '6px',
    },
    cardContent: {
        
    },
    statDigit: {
        fontSize: '1em'
    }
}));

const BetListItem = ({ bet }) => {
    const classes = useStyles();
    const { game } = React.useContext(GameContext);
    //const util = require('util');
    //console.log(util.inspect(bets));

    /*if (bet.betType == 'catalogue') {

    }
    if (bet.betType == 'scale') {

    }*/
    
    return (
        <>
        <Card className={classes.card}>
            <CardContent className={classes.cardContent} style={{paddingTop: '18px',paddingBottom: '18px'}}>
                <Grid container spacing={gridSpacing} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <BetStatusTab bet={bet} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={1}>
                            <Grid item xs={4} md={4}>
                                <Typography variant="h5">Members</Typography>
                                <Typography variant="subtitle2" className={classes.statDigit}>{bet.memberCount}</Typography>
                            </Grid>
                                
                            <Grid item xs={4} md={4}>
                                    <Typography variant="h5">In Pot</Typography>
                                    <Typography variant="subtitle2" className={classes.statDigit}>{+parseFloat(bet.inPot.$numberDecimal).toFixed(2)}</Typography>
                                </Grid>

                    
                            <Grid item xs={4} md={4}>
                                    <Typography variant="h5">Type</Typography>
                                    <Typography variant="subtitle2" className={classes.statDigit}>{fct.capitalizeFirstLetter(bet.betType)}</Typography>
                            </Grid>
                            
                            <Grid item xs={12} md={12}> 
                                <Link style={{ textDecoration: 'none' }} to={'/game/' + fct.assembleGameOrBetUri(game) + '/bet/' + fct.assembleGameOrBetUri(bet)}>
                                    <Button
                                        sx={{ boxShadow: 4 }}
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        className={classes.btnTable}
                                        startIcon={<ForwardIcon />}>
                                        View Bet
                                    </Button>
                                </Link>        
                                      
                                {/*}
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        className={classes.btnTable}
                                        startIcon={<BlockTwoToneIcon />}
                                    >
                                        Block
                                    </Button>
                                </Grid>
                                {*/}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

    
        </>
    );
};

export default BetListItem;
