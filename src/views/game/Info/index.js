import React from 'react';

import GameContext from '../../../contexts/GameContext';

// material-ui
import {
    Box,
    CardContent,
    Chip,
    Divider,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from '@material-ui/core';

// project imports
import Avatar from '../../../ui-component/extended/Avatar';
import SubCard from '../../../ui-component/cards/SubCard';
import { gridSpacing } from '../../../store/constant';

// assets
import PhonelinkRingTwoToneIcon from '@material-ui/icons/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@material-ui/icons/PinDropTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';

import Avatar3 from '../../../assets/images/users/avatar-3.png';


//-----------------------|| PROFILE 1 - PROFILE ||-----------------------//

const GameInfo = () => {
    const {game, socket} = React.useContext(GameContext);
   
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={12} xs={12}>
                <SubCard
                    title={
                        <Grid container spacing={2} alignItems="center">
                            {/*}<Grid item>
                                <Avatar alt="User 1" src={Avatar3} />
                            </Grid>{*/}
                            <Grid item xs zeroMinWidth>
                                <Typography align="left" variant="subtitle1">
                                    {game.name}
                                </Typography>
                                <Typography align="left" variant="subtitle2">
                                    {game.desc}
                                </Typography>
                            </Grid>
                            {/*}<Grid item>
                                <Chip size="small" label="Pro" color="primary" />
                            </Grid>{*/}
                        </Grid>
                    }
                >
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>
                            <ListItemIcon>
                                <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">Email</Typography>} />
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    demo@sample.com
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <PhonelinkRingTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">Phone</Typography>} />
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    (+99) 9999 999 999
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <PinDropTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">Location</Typography>} />
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    Melbourne
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                    <CardContent>
                        <Grid container spacing={0}>
                            <Grid item xs={4}>
                                <Typography align="center" variant="h3">
                                    37
                                </Typography>
                                <Typography align="center" variant="subtitle2">
                                    Mails
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography align="center" variant="h3">
                                    2749
                                </Typography>
                                <Typography align="center" variant="subtitle2">
                                    Followers
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography align="center" variant="h3">
                                    678
                                </Typography>
                                <Typography align="center" variant="subtitle2">
                                    Following
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </SubCard>
            </Grid>
            
        </Grid>
    );
};

export default GameInfo;
