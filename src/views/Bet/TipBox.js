import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import fct from '../../utils/fct.js';
import config from '../../config';
import { SNACKBAR_OPEN } from '../../store/actions';
import OptionsSelect from './OptionsSelect';
import SubCard from '../../ui-component/cards/SubCard';
import { Button, Box, CardMedia, Grid, Stack, Switch, Typography, makeStyles, Pagination, CircularProgress, Divider, TextField } from '@material-ui/core';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';
import useAuth from '../../hooks/useAuth';

// material-ui

//-----------------------|| CUSTOM DATETIME ||-----------------------//

const useStyles = makeStyles((theme) => ({
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
    }
}));


const TipBox = ( props ) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { bet } = props;
    const { user } = useAuth();
    const [myTips, setMyTips] = React.useState([]);
    const [isLoadingMyTips, setIsLoadingMyTips] = React.useState(true);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [isLoadingSelectedIndex, setIsLoadingSelectedIndex] = React.useState(true);

    const getMyTips = async () => {
        setIsLoadingMyTips(true);

        try {
            await fct.sleep(1000);
            const response = await axios.get(config.apiHost + '/v1/tips/', {params: { betId: bet.id, userId: user.id, limit: 32}});

            setMyTips(response.data.results);
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

        setIsLoadingMyTips(false);
    }


    useEffect(() => {
        if (user)
            getMyTips();
    }, []);

    return (
        <>
        <SubCard>
            {isLoadingMyTips ? (

            <Grid container justifyContent="center">
                <CircularProgress color="secondary" size="10em"  />
            </Grid>
 
            ) : ''} 

            {!isLoadingMyTips ? (
            <>
                <OptionsSelect selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} answers={bet.answers} myTips={myTips}></OptionsSelect><br />
                <TextField fullWidth id="outlined-basic-size-small" label="Amount" size="small" defaultValue="" /><br /><br />
                <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        className={classes.btnTable}
                        startIcon={<ChatBubbleTwoToneIcon />}>
                        
                        Send Tip
                </Button>
            </>
           
            ) : ''}

            
                
        </SubCard>
        </>
    );
};

export default TipBox;
