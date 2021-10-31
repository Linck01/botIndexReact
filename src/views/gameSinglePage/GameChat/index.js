import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import useGame from '../../../hooks/useGame';
import fct from '../../../utils/fct.js';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    CardContent,
    ClickAwayListener,
    Grid,
    IconButton,
    Popper,
    TextField,
    useMediaQuery,
    Divider,
    MenuItem,
    Menu
} from '@material-ui/core';

import MoreHorizTwoToneIcon from '@material-ui/icons/MoreHorizTwoTone';
import { SNACKBAR_OPEN } from '../../../store/actions';
// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

// project imports
import ChartHistory from './ChartHistory';
import MainCard from '../../../ui-component/cards/MainCard';
import axios from '../../../utils/axios';
import { appDrawerWidth as drawerWidth, gridSpacing } from '../../../store/constant';
import useAuth from '../../../hooks/useAuth';
import GameContext from '../../../contexts/GameContext';

// assets
import AttachmentTwoToneIcon from '@material-ui/icons/AttachmentTwoTone';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import MoodTwoToneIcon from '@material-ui/icons/MoodTwoTone';
import utils from 'util';

const avatarImage = require.context('../../../assets/images/users', true);

// style constant
const useStyles = makeStyles((theme) => ({
    ScrollHeight: {
        width: '100%',
        height: 'calc(100vh - 440px)',
        overflowX: 'hidden',
        minHeight: '400px'
    }
}));

//-----------------------|| APPLICATION CHAT ||-----------------------//

const GameChat = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { game } = useContext(GameContext);
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    // fetch chat history for selected user
    const [data, setData] = React.useState([]);
    const getData = async () => {
        try {
            const res = await axios.get('http://' + game.server + '/v1/messages/', 
                { params: { gameId: game.id, sortBy: 'createdAt', limit: 10 , page: 0 } });
            
            await fct.sleep(1000);

            console.log(res);
            
            setData(res.data.results || []);

        } catch (e) {
            console.log(e);
            
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error while loading the chat.' ,
                variant: 'alert',
                alertSeverity: 'error',
                close: true
            });
        }  
    };

    React.useEffect(() => {
        getData();
    }, []);

    // handle new message form
    const [message, setMessage] = useState('');
    const handleOnSend = async () => {
        try {
            if (!user) {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'You need to be logged in to write messages.' ,
                    variant: 'alert',
                    alertSeverity: 'error',
                    close: true
                });
                return;
            }

            const res = await axios.post('http://' + game.server + '/v1/messages/', {
                userId: user.id,
                gameId: game.id,
                message: message
            });

        } catch (e) {
            console.log(e);
            
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error while sending a message.' ,
                variant: 'alert',
                alertSeverity: 'error',
                close: true
            });
        }
    };

    const handleEnter = (event) => {
        if (event.key !== 'Enter') {
            return;
        }
        handleOnSend();
    };

    // handle emoji
    const onEmojiClick = (event, emojiObject) => {
        setMessage(message + emojiObject.emoji);
    };

    const [anchorElEmoji, setAnchorElEmoji] = React.useState(null);
    const handleOnEmojiButtonClick = (event) => {
        setAnchorElEmoji(anchorElEmoji ? null : event.currentTarget);
    };

    const emojiOpen = Boolean(anchorElEmoji);
    const emojiId = emojiOpen ? 'simple-popper' : undefined;
    const handleCloseEmoji = () => {
        setAnchorElEmoji(null);
    };

    return (
     
        <MainCard sx={{
            bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50'
        }}>

            {/*}<Grid container spacing={0.5}>
                <Grid item xs={12} align='right'>
                    <IconButton onClick={handleClickSort}>
                        <MoreHorizTwoToneIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleCloseSort}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center'
                        }}
                    >
                        <MenuItem onClick={handleCloseSort}>Name</MenuItem>
                        <MenuItem onClick={handleCloseSort}>Date</MenuItem>
                        <MenuItem onClick={handleCloseSort}>Ratting</MenuItem>
                        <MenuItem onClick={handleCloseSort}>Unread</MenuItem>
                    </Menu>
                </Grid>
            </Grid>
            <Divider sx={{ mt: theme.spacing(2) }} />{*/}
            
            <PerfectScrollbar className={classes.ScrollHeight}>
                <CardContent>
                    <ChartHistory theme={theme} data={data} />
                </CardContent>
            </PerfectScrollbar>
            <Grid item xs={12}>
                <Grid container spacing={1} alignItems="center">
                    <Grid item>
                        <IconButton
                            ref={anchorElEmoji}
                            aria-describedby={emojiId}
                            size="small"
                            onClick={handleOnEmojiButtonClick}
                        >
                            <MoodTwoToneIcon />
                        </IconButton>
                        <Popper
                            position="top"
                            id={emojiId}
                            open={emojiOpen}
                            anchorEl={anchorElEmoji}
                            disablePortal
                            popperOptions={{
                                modifiers: [
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [-20, 20]
                                        }
                                    }
                                ]
                            }}
                        >
                            <ClickAwayListener onClickAway={handleCloseEmoji}>
                                <MainCard elevation={8} content={false}>
                                    {' '}
                                    <Picker
                                        onEmojiClick={onEmojiClick}
                                        skinTone={SKIN_TONE_MEDIUM_DARK}
                                        disableAutoFocus={true}
                                    />
                                </MainCard>
                            </ClickAwayListener>
                        </Popper>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <TextField
                            fullWidth
                            label="Type a Message"
                            variant="outlined"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleEnter}
                        />
                    </Grid>
                    <Grid item>
                        <IconButton size="small">
                            <AttachmentTwoToneIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton size="small" color="primary" onClick={handleOnSend}>
                            <SendTwoToneIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            
        </MainCard>
                 
                    
            
            
     
    );
};

export default GameChat;
