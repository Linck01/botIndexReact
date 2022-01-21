import React from 'react';
import { Link } from 'react-router-dom';


// material-ui
import {
    AvatarGroup,
    Button,
    Grid,
    LinearProgress,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    ListItem,
    useMediaQuery,
    Divider
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { MENU_OPEN, SET_MENU } from '../../../store/actions';

// project imports
import Avatar from '../../../ui-component/extended/Avatar';
import { gridSpacing } from '../../../store/constant';
import { IconCalendarStats, IconCalendarOff, IconCheck, IconBell, IconBellOff } from '@tabler/icons';

// asset
import Avatar1 from '../../../assets/images/users/avatar-1.png';
import Avatar2 from '../../../assets/images/users/avatar-2.png';
import Avatar3 from '../../../assets/images/users/avatar-3.png';
import Avatar4 from '../../../assets/images/users/avatar-4.png';
import Avatar5 from '../../../assets/images/users/avatar-5.png';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';
import BlockTwoToneIcon from '@material-ui/icons/BlockTwoTone';

import GameContext from '../../../contexts/GameContext';
import fct from '../../../utils/fct.js';


const useStyles = makeStyles((theme) => ({
    successBadge: {
        color: theme.palette.success.dark,
        width: '14px',
        height: '14px'
    },
    iconCalendarOff: {
        width: '60px',
        height: '60px',
        color: theme.palette.mode === 'dark' ? theme.palette.error.dark : theme.palette.error.light
    },
    iconCalendarStats: {
        width: '60px',
        height: '60px',
        color: theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.main
    },
    iconCheck: {
        width: '60px',
        height: '60px',
        color: theme.palette.mode === 'dark' ? theme.palette.info.dark : theme.palette.info.light
    },
    btnTable: {
        width: '100%',
        '&:hover': {
            background: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            color: '#fff'
        }
    },
    tableResponsive: {
        overflowX: 'auto'
    },
    profileTable: {
        '& td': {
            whiteSpace: 'nowrap'
        },
        '& td:first-child': {
            paddingLeft: '0px'
        },
        '& td:last-child': {
            paddingRight: '0px',
            minWidth: '260px'
        },
        '& tbody tr:last-child  td': {
            borderBottom: 'none'
        },
        [theme.breakpoints.down('lg')]: {
            '& tr:not(:last-child)': {
                borderBottom: '1px solid',
                borderBottomColor: theme.palette.mode === 'dark' ? 'rgb(132, 146, 196, .2)' : 'rgba(224, 224, 224, 1)'
            },
            '& td': {
                display: 'inline-block',
                borderBottom: 'none',
                paddingLeft: '0px'
            },
            '& td:first-child': {
                display: 'block'
            }
        }
    },
    tableSubContent: {
        whiteSpace: 'break-spaces'
    },
    divider: {
        opacity: 0.1,
        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.primary.light 
    }
}));



const BetListItem = ({ bet }) => {
    const classes = useStyles();
    const { game, socket, amIAdmin, amIMod } = React.useContext(GameContext);
    //const util = require('util');
    //console.log(util.inspect(bets));
    
    const progress = fct.getBetProgress(bet._createdAt, bet.timeLimit);

    //if (progress == 100 && Math.random() < 0.3) bet.isFinished = true; else bet.isFinished = false;
    //bet.catalogue_options.answers[0].isCorrect = true;

    return (
        <>
            <br />
            <Grid container spacing={gridSpacing} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item color="textError">
                            {!bet.isFinished && progress < 100 ? <IconBell stroke={1} className={classes.iconCalendarStats} /> : ''}       
                            {!bet.isFinished && progress >= 100 ? <IconBellOff stroke={1} className={classes.iconCalendarOff} /> : ''}
                            {bet.isFinished ? <IconCheck stroke={1} className={classes.iconCheck} /> : ''}
                        </Grid>
                        <Grid item sm zeroMinWidth>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography align="left" variant="subtitle1">
                                        {bet.title}{' '}
                                        {bet.badgeStatus === 'active' && <CheckCircleIcon className={classes.successBadge} />}
                                    </Typography>
                                    <Typography align="left" variant="subtitle2" className={classes.tableSubContent}>
                                        {fct.formatDateTime(bet._createdAt)} - {fct.formatDateTime(bet.timeLimit)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography align="left" variant="body2" className={classes.tableSubContent}>
                                        {bet.desc.length > 100 ? bet.desc.substring(0, 100) + ' .. ' : bet.desc}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                
                <Grid item xs={4} md={2}>
                    <Typography variant="caption">Members</Typography>
                    <Typography variant="h6">{bet.memberCount}</Typography>
                </Grid>
                    

        
                <Grid item xs={4} md={2}>
                        <Typography variant="caption">In Pot</Typography>
                        <Typography variant="h6">{bet.inPot.$numberDecimal}</Typography>
                    </Grid>

        
                <Grid item xs={4} md={2}>
                        <Typography variant="caption">Possibilities</Typography>
                        <Typography variant="h6">{bet.catalogue_answers.length}</Typography>
                </Grid>
                
                    
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={gridSpacing} alignItems="center">
                        <Grid item xs={4} sm={3} md={2} textAlign="center">
                            <Typography textAlign="center" variant="caption">{bet.isFinished ? 'Finished' : `Progress ${progress}%`}</Typography>
                        </Grid>
                        <Grid item xs={8} sm={9} md={10} style={{width:'100%'}}>
                            {bet.isFinished ? 'Answer: ' + bet.catalogue_answers.filter(function (a) { return a.isCorrect == true }).map(a => a.title).join(', ') : <LinearProgress variant="determinate" value={progress} color="primary" style={{width: '90%'}} />}
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" component="div">
                                {bet.progressValue}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} style={{marginTop: '-15px'}}> 
                    <Link style={{ textDecoration: 'none' }} to={'/game/' + game.id + '/bet/' + bet.id}>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            className={classes.btnTable}
                            startIcon={<ChatBubbleTwoToneIcon />}>
                            Details
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

            <br />
            <Divider className={classes.divider} />
            <br />
          
            
        </>
    );
};

export default BetListItem;
