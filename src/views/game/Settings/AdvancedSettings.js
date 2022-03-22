import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Grid, Switch, Typography, useTheme, TextField } from '@material-ui/core';

import GameContext from '../../../contexts/GameContext';
import CurrencyNameSelect from './CurrencyNameSelect';
import { gridSpacing } from '../../../store/constant';

// style constant
const useStyles = makeStyles((theme) => ({
    temp: {

    }
}));

const Settings = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const { game } = React.useContext(GameContext);
    const { startCurrency, setStartCurrency, password, setPassword, isPublic, setIsPublic, currencyName, setCurrencyName, isEnded, setIsEnded} = props;

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Typography variant="h3">Accessibility</Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                    <FormControlLabel
                        control={ <Switch checked={isPublic} onChange={() => setIsPublic(!isPublic)} name="isPublic" color="primary" /> }
                        label="Public"
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <FormControlLabel
                        control={ <Switch checked={isEnded} onChange={() => setIsEnded(!isEnded)} name="isEnded" color="primary" /> }
                        label="Ended"
                    />
                </Grid>
                {/*}
                <Grid item xs={12} md={6}>
                    <TextField
                        style={{width: '100%'}}
                        fullWidth
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setStartCurrency(e.target.value)}
                    />
                </Grid>
                {*/}
            </Grid> 
            <br /><br />
            <Grid container spacing={gridSpacing}>      
                <Grid item xs={12}>
                    <Typography variant="h3">Currency</Typography>
                    <br />
                </Grid>
                
                <Grid item xs={12} md={6}>
                    <CurrencyNameSelect currencyName={currencyName} setCurrencyName={setCurrencyName}/>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Grid item xs={12}>
                        <TextField
                            style={{width: '100%'}}
                            fullWidth
                            label="Start amount"
                            variant="outlined"
                            value={startCurrency}
                            onChange={(e) => setStartCurrency(e.target.value)}
                        />
                    </Grid>   
                </Grid>               
            </Grid>
        </>
    );
};

export default Settings;


