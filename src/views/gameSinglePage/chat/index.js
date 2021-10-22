import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import useGame from '../../../hooks/useGame';
// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    CardContent,
    ClickAwayListener,
    Grid,
    IconButton,
    Popper,
    TextField,
    useMediaQuery
} from '@material-ui/core';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

// project imports
import ChartHistory from './ChartHistory';
import MainCard from './../../../ui-component/cards/MainCard';
import axios from './../../../utils/axios';
import { appDrawerWidth as drawerWidth, gridSpacing } from './../../../store/constant';
import useAuth from '../../../hooks/useAuth';
import GameContext from '../../../contexts/GameContext';

// assets
import AttachmentTwoToneIcon from '@material-ui/icons/AttachmentTwoTone';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import MoodTwoToneIcon from '@material-ui/icons/MoodTwoTone';

const avatarImage = require.context('../../../assets/images/users', true);

// style constant
const useStyles = makeStyles((theme) => ({
    ScrollHeight: {
        width: '100%',
        height: 'calc(100vh - 440px)',
        overflowX: 'hidden',
        minHeight: '525px'
    }
}));

//-----------------------|| APPLICATION CHAT ||-----------------------//

const ChatMainPage = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const game = useGame();
    console.log('DDDD',game);
    //const { game, socket } = useContext(GameContext);
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    // handle right sidebar dropdown menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClickSort = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSort = () => {
        setAnchorEl(null);
    };

    // set chat details page open when user is selected from sidebar
    const [emailDetails, setEmailDetails] = React.useState(false);
    const handleUserChange = (event, newValue) => {
        setEmailDetails((prev) => !prev);
    };

    // toggle sidebar
    const [openChatDrawer, setOpenChatDrawer] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpenChatDrawer((prevState) => !prevState);
    };

    // close sidebar when widow size below 'md' breakpoint
    React.useEffect(() => {
        setOpenChatDrawer(!matchDownSM);
    }, [matchDownSM]);

    
 
    // fetch chat history for selected user
    const [data, setData] = React.useState([]);
    const getData = async (user) => {

        //setData(game.chatHistory || []);
    };

    React.useEffect(() => {
        getData(user);
    }, []);

    // handle new message form
    const [message, setMessage] = useState('');
    const handleOnSend = () => {
        const d = new Date();
        setMessage('');
        const newMessage = {
            from: 'User1',
            to: user.name,
            text: message,
            time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setData((prevState) => [...prevState, newMessage]);
        axios.post('/api/chat/insert', {
            ...newMessage
        });
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
        
            
            
              
                    <Grid item >
                        <MainCard
                            sx={{
                                bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50'
                            }}
                        >
                            <Grid container spacing={gridSpacing}>
                                
                                <PerfectScrollbar className={classes.ScrollHeight}>
                                    <CardContent>
                                        <ChartHistory
                                            theme={theme}
                                            handleUserDetails={handleUserChange}
                                            handleDrawerOpen={handleDrawerOpen}
                                            user={user}
                                            data={data}
                                        />
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
                            </Grid>
                        </MainCard>
                    </Grid>
                    
            
            
     
    );
};

export default ChatMainPage;
