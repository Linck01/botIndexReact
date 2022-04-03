import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import { gridSpacing } from '../../store/constant';

// assets
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import TwoWheelerTwoToneIcon from '@material-ui/icons/TwoWheelerTwoTone';
import AirportShuttleTwoToneIcon from '@material-ui/icons/AirportShuttleTwoTone';
import DirectionsBoatTwoToneIcon from '@material-ui/icons/DirectionsBoatTwoTone';
import { IconBrandAppleArcade, IconPin, IconSpeakerphone } from '@tabler/icons';
import logoDark from '../../assets/images/large.png';
import logo from '../../assets/images/large.png';

// style constant
const useStyles = makeStyles((theme) => ({
    priceTitle: {
        fontSize: '25px',
        fontWeight: '500',
        position: 'relative',
        marginBottom: '15px',
        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-15px',
            left: 'calc(50% - 25px)',
            width: '50px',
            height: '4px',
            background: theme.palette.primary.main,
            borderRadius: '3px'
        }
    },
    priceAmount: {
        fontSize: '35px',
        fontWeight: '700',
        '& > span': {
            fontSize: '20px',
            fontWeight: '500'
        }
    },
    priceList: {
        margin: 0,
        padding: 0,
        '&> li': {
            padding: '5px 0px',
            '& svg': {
                fill: theme.palette.success.dark
            }
        }
    },
    priceIcon: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        width: '80px',
        height: '80px',
        background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.primary.light,
        color: theme.palette.primary.main,
        '& > svg': {
            width: '35px',
            height: '35px'
        }
    },
    priceListDisable: {
        opacity: '0.4',
        '& >div> svg': {
            fill: theme.palette.secondary.light
        }
    }
}));



//===============================|| PRICING - PRICE 1 ||===============================//

const Price1 = () => {
    const classes = useStyles();
    const theme = useTheme();
    console.log('EEEEEEEEEEEEEEEEE', process.env.NODE_ENV);
    const plans = [
        {
            active: true,
            icon: <IconBrandAppleArcade fontSize="large" color={theme.palette.info.main}/>,
            title: '1. Create a Game',
            description:
                'Create or find a public game with the topics you like.',
            price: 69,
        },
        {
            active: true,
            icon: <IconSpeakerphone fontSize="large" color={theme.palette.warning.main}/>,
            title: '2. Add a Bet',
            description:
                'Add a bet to your game, which you and your friends can bet on.',
            price: 129,
        },
        {
            active: true,
            icon: <IconPin fontSize="large" color={theme.palette.success.main}/>,
            title: '3. Place a Tip',
            description:
                'Place a tip if you feel like you know the outcome of a bet.',
            price: 599,
        }
    ];

    return (
        <>
        <br />
        <br />
        <Grid container spacing={gridSpacing} justifyContent={"center"}>
            <Grid item xs={12} sm={8} md={6}>
                <img src={theme.palette.mode === 'dark' ? logoDark : logoDark} alt="Berry" width="100%" />
            </Grid>
        </Grid>
        <br />
        <br />
        <Grid container spacing={gridSpacing}>
            {plans.map((plan, index) => {
                return (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <MainCard
                            className={classes.price}
                            boxShadow
                            sx={{
                                pt: 1.75,
                                border: plan.active ? '2px solid' : '1px solid',
                                borderColor: plan.active
                                    ? 'secondary.main'
                                    : theme.palette.mode === 'dark'
                                    ? theme.palette.background.default
                                    : theme.palette.primary[200] + 75
                            }}
                        >
                            <Grid container textAlign="center" spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <div className={classes.priceIcon}>{plan.icon}</div>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" className={classes.priceTitle}>
                                        {plan.title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">{plan.description}</Typography>
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <List className={classes.priceList} component="ul">
                                        
                                    </List>
                                </Grid>
                               
                            </Grid>
                        </MainCard>
                    </Grid>
                );
            })}
        </Grid>
        </>
    );
};

export default Price1;
