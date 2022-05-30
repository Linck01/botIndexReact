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
    Divider,
    Chip
} from '@material-ui/core';

import { gridSpacing } from '../../../store/constant';

import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';

import GameContext from '../../../contexts/GameContext';
import fct from '../../../utils/fct.js';
import BetStatusTab from '../../../ui-component/game/BetStatusTab';
import useColors from '../../../hooks/useColors.js';


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
        '&:hover': {
            background: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            color: '#fff'
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

    /*if (bet.betType == 'catalogue') {

    }
    if (bet.betType == 'scale') {

    }*/
    
    return (
        <>
         
            <Grid container spacing={gridSpacing} alignItems="center">
                <Grid item xs={12} md={6}>
                    <BetStatusTab bet={bet} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={4} md={4}>
                            <Typography variant="caption">Members</Typography>
                            <Typography variant="h6">{bet.memberCount}</Typography>
                        </Grid>
                            
                        <Grid item xs={4} md={4}>
                                <Typography variant="caption">In Pot</Typography>
                                <Typography variant="h6">{+parseFloat(bet.inPot.$numberDecimal).toFixed(2)}</Typography>
                            </Grid>

                
                        <Grid item xs={4} md={4}>
                                <Typography variant="caption">Type</Typography>
                                <Typography variant="h6">{fct.capitalizeFirstLetter(bet.betType)}</Typography>
                        </Grid>
                        
                        <Grid item xs={12} md={12}> 
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
                </Grid>
            </Grid>

            <br />
            <Divider className={classes.divider} />
            <br />
          
            
        </>
    );
};

export default BetListItem;
