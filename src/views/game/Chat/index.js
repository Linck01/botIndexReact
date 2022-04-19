import React, { useState, useContext, useRef, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import fct from '../../../utils/fct.js';
import config from '../../../config.js';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    CardContent,
    Drawer,
    ClickAwayListener,
    Grid,
    IconButton,
    Popper,
    TextField,
    useMediaQuery,
    Divider,
    MenuItem,
    Menu,
    CircularProgress
} from '@material-ui/core';

import MoreHorizTwoToneIcon from '@material-ui/icons/MoreHorizTwoTone';
import { SNACKBAR_OPEN, NEW_MESSAGES } from '../../../store/actions';
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
        height: 'calc(100vh - 250px)',
        overflowX: 'hidden',
        minHeight: '10px'
    }
}));

//-----------------------|| APPLICATION CHAT ||-----------------------//

const GameChat = ( { openChatDrawer, handleChatDrawerOpen } ) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { game, socket, chatHistory, chat, setChat} = useContext(GameContext);
    const messageInputRef = useRef();
    const scrollBarRef = useRef();
    const customization = useSelector((state) => state.customization);
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [isLoading, setIsLoading] = useState(true);

    const getMessages = async () => {
        setIsLoading(true);

        try {
            const res = await axios.get(config.gameHosts[game.serverId] + '/v1/messages/',
                { params: { gameId: game.id, sortBy: '-_createdAt', limit: 10 , page: 0 } });
            
            setChat({...chat, isInitialized: true, items: res.data.results.reverse()});
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            console.log(e);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
        }  
    };

    useEffect(() => {
        if (socket)
            socket.on('chatMessage', function(newMessage) {    
                const newItems = [...chat.items, newMessage]
                setChat({...chat, items: newItems});
            });

        return function cleanup() {
            if (socket) 
                socket.off('chatMessage');
        };

    }, [socket,chat]);

    useEffect(() => {
        getMessages();     
    }, []);

    // handle new message form

    const handleOnSend = async () => {
        if (!user) {
            return dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Please log in to send a message!',
                variant: 'alert', alertSeverity: 'error', close: true });
        }

        try {
            const res = await axios.post(config.gameHosts[game.serverId] + '/v1/messages/', {
                userId: user.id,
                gameId: game.id,
                message: messageInputRef.current.querySelectorAll('input[type=text]')[0].value
            });

            messageInputRef.current.querySelectorAll('input[type=text]')[0].value = '';

        } catch (e) {
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
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
        messageInputRef.current.querySelectorAll('input[type=text]')[0].value = 
        messageInputRef.current.querySelectorAll('input[type=text]')[0].value + emojiObject.emoji;
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

    const [scrollBarEl, setScrollBarEl] = React.useState(null);
    

    return (
        
       <>

        

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
            <MainCard sx={{
                bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50'
            }}>
            <PerfectScrollbar className={classes.ScrollHeight} containerRef={ref => {setScrollBarEl(ref);}}>
                <CardContent>
                    {console.log('chat',chat)}
                    {isLoading ? (
                        <>
                        <br />
                        <Grid container justifyContent="center">
                            
                            <CircularProgress color="secondary" size="10em"  />
                            
                        </Grid>
                        </>
                    ) : <ChartHistory theme={theme} data={chat.items} scrollBarEl={scrollBarEl} scrollBarRef={scrollBarRef} />} 
                </CardContent>
            </PerfectScrollbar>
            </MainCard>
            <br />
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
                            ref={messageInputRef}
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
            
       </>

    );
};

export default GameChat;
