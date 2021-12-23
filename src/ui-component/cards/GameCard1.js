import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardMedia, Chip, Grid, Typography, IconButton } from '@material-ui/core';

// project imports
import Avatar from '../extended/Avatar';
import { gridSpacing } from '../../store/constant';
// assets
import { IconCalendar, IconBrandAppleArcade, IconUsers, IconCertificate } from '@tabler/icons';

import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import PublicTwoToneIcon from '@material-ui/icons/PublicTwoTone';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import CampaignIcon from '@material-ui/icons/Campaign';

const avatarImage = require.context('./../../assets/images/profile', true);

// style constant
const useStyles = makeStyles((theme) => ({
    followerBlock: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
        border: theme.palette.mode === 'dark' ? 'none' : '1px solid',
        borderColor: theme.palette.grey[100],
        textAlign: 'center'
    },
    profileAvatar: {
        margin: 'auto auto 0'
    },
    btnProfile: {
        width: '100%',
        borderRadius: '4px',
        transition: 'all .3s ease-in-out',
        '& svg': {
            width: '20px',
            height: '20px',
            margin: '4px 0px',
            transition: 'all .3s ease-in-out'
        }
    },
    active: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.success.light,
        color: theme.palette.success.main
    },
    reject: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.error.light,
        color: theme.palette.error.dark
    },
    customerHeadDetails: {
        '& > svg': {
            width: '15px',
            height: '15px',
            verticalAlign: 'text-top',
            marginRight: '5px',
            marginTop: '2px'
        }
    },
}));

//-----------------------|| USER PROFILE CARD ||-----------------------//

const UserProfileCard = (props) => {
    const { game } = props;
    const classes = useStyles();
    //let avatarProfile = avatar && avatarImage(`./${avatar}`).default;
    //let imageProfile = profile && avatarImage(`./${profile}`).default;


    return (
        <Card className={classes.followerBlock}>
            <CardMedia component="img" image={ game.bannerUrl } title="banner" sx={{ height: '125px' }} />
            <CardContent sx={{ p: 2, pb: '16px !important' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography className={classes.profileAvatar} variant="h4">{game.title} </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {game.currencyName}

                        {!game.isFinished ? (
                            <Chip label="Active" size="small" className={classes.active} />
                        ) : (
                            <Chip label="Finished" size="small" className={classes.reject} />
                        )} 
                    </Grid>
                    <Grid item xs={12} alignItems="center">  
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="body2">{game.desc}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" style={{fontSize:'1.8em'}} className={classes.customerHeadDetails}>
                                    
                                    <IconUsers  style={{width: '1.1em',height: '1.1em'}} /> {game.totalMembers}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" style={{fontSize:'1.8em'}} className={classes.customerHeadDetails}>
                                    <IconCertificate  style={{width: '1.1em',height: '1.1em'}} /> {game.totalBets}
                                </Typography>
                            </Grid><br /><br /><br />
                        </Grid>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Link to={'/game/' + game.id}>
                            <Button variant="outlined" color="secondary" className={classes.btnProfile} startIcon={<ChatBubbleTwoToneIcon />}>
                                Play
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};


export default UserProfileCard;
