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
    useMediaQuery
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { MENU_OPEN, SET_MENU } from '../../../store/actions';

// project imports
import Avatar from '../../../ui-component/extended/Avatar';
import { gridSpacing } from '../../../store/constant';

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

const useStyles = makeStyles((theme) => ({
    successBadge: {
        color: theme.palette.success.dark,
        width: '14px',
        height: '14px'
    },
    tableAvatar: {
        width: '60px',
        height: '60px'
    },
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
    }
}));

const UserCard = (props) => {
    const classes = useStyles();
    const { game, socket, amIAdmin, amIMod } = React.useContext(GameContext);
    const { bets } = props;
    const util = require('util');
    console.log(util.inspect(bets));



    return (
            <Table className={classes.profileTable} style={{ marginTop: '-1%' }}>
                <TableBody > 
                    {bets.map((bet) => (
                        <TableRow key={bet.id}>
                            <TableCell>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Avatar alt="User 1" src={bet.image} className={classes.tableAvatar} />
                                    </Grid>
                                    <Grid item sm zeroMinWidth>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Typography align="left" variant="subtitle1">
                                                    {bet.title}{' '}
                                                    {bet.badgeStatus === 'active' && <CheckCircleIcon className={classes.successBadge} />}
                                                </Typography>
                                                <Typography align="left" variant="subtitle2" className={classes.tableSubContent}>
                                                    {bet._createdAt}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography align="left" variant="body2" className={classes.tableSubContent}>
                                                    {bet.desc}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="caption">Users</Typography>
                                        <Typography variant="h6">{bet.tipCount}</Typography>
                                    </Grid>
                                    
                                </Grid>
                            </TableCell>
                            <TableCell>
                                <Grid container spacing={1}>
                                <Grid item xs={12}>
                                        <Typography variant="caption">In Pot</Typography>
                                        <Typography variant="h6">{bet.inPot}</Typography>
                                    </Grid>
                                    
                                </Grid>
                            </TableCell>
                            <TableCell>
                                <Grid container spacing={1}>
                                <Grid item xs={12}>
                                        <Typography variant="caption">In Pot</Typography>
                                        <Typography variant="h6">{bet.inPot}</Typography>
                                    </Grid>
                                    
                                </Grid>
                            </TableCell>
                            <TableCell>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" spacing={gridSpacing}>
                                            <Grid item>
                                                <Typography variant="caption">Time left</Typography>
                                            </Grid>
                                            <Grid item sm zeroMinWidth>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={56}
                                                    color="primary"
                                                    style={{ minWidth: '30px' }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h6" component="div">
                                                    {bet.progressValue}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}  spacing={1}>
                                        <Link style={{width:'100%'}} to={'/game/' + game.id + '/bet/' + bet.id}>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                style={{width:'100%'}}
                                                className={classes.btnTable}
                                                startIcon={<ChatBubbleTwoToneIcon />}>
                                                
                                                Bet
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
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
       
    );
};

export default UserCard;
