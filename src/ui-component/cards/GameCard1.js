import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardMedia, Chip, Grid, Typography, Tooltip } from '@material-ui/core';
import useColors from '../../hooks/useColors';
import { IconUsers, IconCertificate } from '@tabler/icons';
import PlayCircleIcon from '@material-ui/icons/PlayCircleOutline';
import fct from '../../utils/fct.js';

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
            marginTop: '2px',
        }
    },
}));

const UserProfileCard = (props) => {
    const { game } = props;
    const { colors } = useColors();
    const classes = useStyles();

    return (
        <Card className={classes.followerBlock} sx={{ boxShadow: 8 }}>
            <CardMedia component="img" image={ game.bannerUrl } title="banner" sx={{ height: '125px' }} />
            <CardContent sx={{ p: 2, pb: '16px !important' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Tooltip title={game.title.length >= 32 ? game.title : ''}>
                                    <Typography className={classes.profileAvatar} variant="h4">{fct.cutString(game.title,32)}</Typography>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} style={{paddingTop: '12px'}}>
                        {game.currencyName}

                        {!game.isEnded ? (
                            <Chip label="Active" size="small" className={classes.active} />
                        ) : (
                            <Chip label="Ended" size="small" className={classes.reject} />
                        )} 
                    </Grid>
                    <Grid item xs={8} alignItems="center">  
                        <Grid container spacing={1}>
                            {/*}<Grid item xs={12} sm={12}>
                                <Typography variant="body2">{game.desc}</Typography>
                            </Grid>{*/}
                            <Grid item xs={6}>
                                <Typography variant="body2" style={{fontSize:'1.6em', color: colors.primaryMain}} className={classes.customerHeadDetails}>
                                    <IconUsers  style={{width: '1em',height: '1em', color: colors.infoDark}} /> {game.memberCount}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" style={{fontSize:'1.6em', color: colors.primaryMain}} className={classes.customerHeadDetails}>
                                    <IconCertificate  style={{width: '1.1em',height: '1.1em', color: colors.warningDark}} /> {game.betCount}
                                </Typography>
                            </Grid><br /><br /><br />
                        </Grid>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Link to={'/game/' + fct.assembleGameOrBetSlug(game) + '/' + game.id}>
                            <Button variant="contained" color="secondary" className={classes.btnProfile} sx={{ boxShadow: 4 }} startIcon={<PlayCircleIcon />}>
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
