import React, { useEffect, useContext } from 'react';
import { Grid, Typography, Pagination, CircularProgress } from '@material-ui/core';
import fct from '../../utils/fct.js';
import config from '../../config.js';
import axios from '../../utils/axios.js';
import GameContext from '../../contexts/GameContext.js';
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
  } from "react-share";
  import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon
  } from "react-share";
export default function CustomList(props) {
    const { betPage  } = useContext(GameContext);
 
    useEffect(() => {
        
    }, []);

    return (
        <> 
        <Grid align="center">

        <EmailShareButton url={window.location.href} quote={'Title or jo bhi aapko likhna ho'} hashtag={'#portfolio...'}>
            <EmailIcon size={45} round={true} />
        </EmailShareButton>
        &nbsp;&nbsp;

        <FacebookShareButton url={window.location.href} quote={'Title or jo bhi aapko likhna ho'} hashtag={'#portfolio...'}>
            <FacebookIcon size={45} round={true} />
        </FacebookShareButton>
        &nbsp;&nbsp;

        <RedditShareButton url={window.location.href} quote={'Title or jo bhi aapko likhna ho'} hashtag={'#portfolio...'}>
            <RedditIcon size={45} round={true} />
        </RedditShareButton>
        &nbsp;&nbsp;

        <TwitterShareButton url={window.location.href} quote={'Title or jo bhi aapko likhna ho'} hashtag={'#portfolio...'}>
            <TwitterIcon size={45} round={true} />
        </TwitterShareButton>
        &nbsp;&nbsp;

        <TelegramShareButton url={window.location.href} quote={'Title or jo bhi aapko likhna ho'} hashtag={'#portfolio...'}>
            <TelegramIcon size={45} round={true} />
        </TelegramShareButton>
        &nbsp;&nbsp;

        <WhatsappShareButton url={window.location.href} quote={'Title or jo bhi aapko likhna ho'} hashtag={'#portfolio...'}>
            <WhatsappIcon size={45} round={true} />
        </WhatsappShareButton>

        </Grid>

        <Typography>{}</Typography>
        </>
    );
}