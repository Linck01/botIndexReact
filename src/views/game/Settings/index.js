import React from 'react';

import AdvancedSettings from './AdvancedSettings';
import MainSettings from './MainSettings';
import { SNACKBAR_OPEN } from '../../../store/actions';
import { useDispatch } from 'react-redux';

// project imports
import { gridSpacing } from '../../../store/constant';
import GameContext from '../../../contexts/GameContext';
import fct from '../../../utils/fct.js';
import axios from '../../../utils/axios';
import config from '../../../config';
import { Button, CircularProgress } from '@material-ui/core';


//-----------------------|| PROFILE 1 - PROFILE ||-----------------------//

const GameSettings = () => {
    const { game } = React.useContext(GameContext);
    const dispatch = useDispatch();

    const [ startCurrency, setStartCurrency ] =  React.useState(game.startCurrency.$numberDecimal);
    const [ password, setPassword ] = React.useState('');
    const [ title, setTitle ] = React.useState(game.title);
    const [ currencyName, setCurrencyName ] = React.useState(game.currencyName);
    const [ desc, setDesc ] = React.useState(game.desc);
    const [ isPublic, setIsPublic ] = React.useState(game.isPublic);
    const [ isEnded, setIsEnded ] = React.useState(game.isEnded);
    const [ bannerUrl, setBannerUrl ] = React.useState(game.bannerUrl);

    const [ isLoading, setIsLoading ] = React.useState(false);

    const updateSettings = async () => {
        setIsLoading(true);

        await fct.sleep(1000);
        try {
            const obj = { title, desc, isPublic, isEnded, startCurrency, currencyName, bannerUrl };
            const response = await axios.patch(config.apiHost + '/v1/games/' + game.id, obj);
            
            dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Successfully changed settings', 
                variant: 'alert', alertSeverity: 'success', close: true });

            setIsLoading(false);
        } catch (e) { 
            setIsLoading(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
         }

    };
   
    return (
        <>
        <MainSettings title={title} setTitle={setTitle} desc={desc} setDesc={setDesc} bannerUrl={bannerUrl} setBannerUrl={setBannerUrl}/>
        <br /><br />
        <AdvancedSettings currencyName={currencyName} setCurrencyName={setCurrencyName} startCurrency={startCurrency} setStartCurrency={setStartCurrency} password={password} setPassword={setPassword} isPublic={isPublic} setIsPublic={setIsPublic} isEnded={isEnded} setIsEnded={setIsEnded} />
        <br /><br />
        <Button style={{width:'100%'}} variant="outlined" color="secondary" onClick={updateSettings}>
            { isLoading ? (<> <CircularProgress color="secondary"  size="1.7em" /></>) : ('Update') }
        </Button>
        </>
        
    );
};

export default GameSettings;
