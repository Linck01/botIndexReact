import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import fct from '../../utils/fct.js';
import config from '../../config';
import { SNACKBAR_OPEN } from '../../store/actions';

// material-ui
import { Button, Box, CardMedia, Grid, Stack, Switch, Typography, makeStyles, Pagination, CircularProgress } from '@material-ui/core';
import BlockTwoToneIcon from '@material-ui/icons/BlockTwoTone';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import SubCard from '../../ui-component/cards/SubCard';
import Transitions from '../../ui-component/extended/Transitions';
import GameContext from '../../contexts/GameContext';

// assets
import image from '../../../assets/images/profile/img-profile-bg.png';


//-----------------------|| CUSTOM DATETIME ||-----------------------//

const TipList = ( { value, setValue } ) => {
    const dispatch = useDispatch();
    const [isLoadingTips, setIsLoadingTips] = React.useState(true);
    const [tips, setTips] = React.useState([]);
    const [tipPage, setTipPage] = React.useState(1);
    const [maxTipPage, setMaxTipPage] = React.useState(1);
    const { betId } = useParams();

    const getTips = async () => {
        setIsLoadingTips(true);

        try {
            const response = await axios.get(config.apiHost + '/v1/tips/', { params: { betId: betId, sortBy: 'createdAt', limit: 10 , page: tipPage } });

            //setTipMaxPage(response.data.totalPages);
            console.log(response);
            await fct.sleep(1000);
            setTips(response.data.results);
        } catch (e) {
            console.log(e);
            
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: e.message,
                variant: 'alert',
                alertSeverity: 'error',
                close: true
            });
        }

        setIsLoadingTips(false);
    }

    const handlePageChange = async (a,b,c) => {
        console.log(a,b,c);
        setTipPage(b);
    }

    useEffect(() => {
        //getTips();
    }, []);

    return (
        <>
        TipList
        <br /><br />
        <Grid container direction="column" spacing={2} alignItems="center">
            <Grid item xs={12}>
                <Pagination page={tipPage} onChange={handlePageChange} count={maxTipPage} color="primary" />
            </Grid>
        </Grid>
        </>
    );
};

export default TipList;
