import React from 'react';

import UpdatePassword from './UpdatePassword';
import { SNACKBAR_OPEN } from '../../../store/actions';
import { useDispatch } from 'react-redux';

// project imports
import { gridSpacing } from '../../../store/constant';
import fct from '../../../utils/fct.js';
import axios from '../../../utils/axios';
import config from '../../../config';
import useAuth from '../../../hooks/useAuth';
import { Button, CircularProgress } from '@material-ui/core';
import { Helmet } from "react-helmet";

//-----------------------|| PROFILE 1 - PROFILE ||-----------------------//

const GameSettings = () => {

    const [ isLoading, setIsLoading ] = React.useState(false);

   
    return (
        <>
        
        <UpdatePassword />
        <br /><br />
        {/*}
        <AdvancedSettings currencyName={currencyName} setCurrencyName={setCurrencyName} startCurrency={startCurrency} setStartCurrency={setStartCurrency} password={password} setPassword={setPassword} isPublic={isPublic} setIsPublic={setIsPublic} isEnded={isEnded} setIsEnded={setIsEnded} />
        <br /><br />{*/}
       
        
        </>
        
    );
};

export default GameSettings;
