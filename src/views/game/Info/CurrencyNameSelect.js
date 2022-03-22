import React from 'react';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { ClickAwayListener, Grid, IconButton, Popper, TextField } from '@material-ui/core';

import { gridSpacing } from '../../../store/constant';

import MoodTwoToneIcon from '@material-ui/icons/MoodTwoTone';
import GameContext from '../../../contexts/GameContext';
import MainCard from './../../../ui-component/cards/MainCard';
import AttachmentTwoToneIcon from '@material-ui/icons/AttachmentTwoTone';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';

//===========================|| WIDGET STATISTICS ||===========================//

const CurrencyNameSelect = (props) => {
    const theme = useTheme();
    const { game } = React.useContext(GameContext);
    
    // handle new message form
    const [message, setMessage] = React.useState(game.currencyName);
    
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
        <Grid container spacing={gridSpacing} alignItems="center">
            <Grid item xs={1}>
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
            <Grid item xs={9}>
                <TextField
                    style={{width: '100%'}}
                    fullWidth
                    label="Name/Symbol"
                    variant="outlined"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </Grid>
        </Grid>
    );
};

export default CurrencyNameSelect;
