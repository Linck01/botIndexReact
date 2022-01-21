
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Slider } from '@material-ui/core';

import React, {useState, useEffect, useRef, useContext} from 'react';
import GameContext from '../../../contexts/GameContext';
import fct from '../../../utils/fct.js';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useDispatch } from 'react-redux';
// project imports
import { gridSpacing } from '../../../store/constant';

import { SNACKBAR_OPEN } from '../../../store/actions';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../utils/axios';
import config from '../../../config';
import CustomDateTime from './CustomDateTime';
import SubCard from '../../../ui-component/cards/SubCard';
import { IconCirclePlus } from '@tabler/icons';

//===============================|| UI DIALOG - FORMS ||===============================//
function valueText(value) {
    return `${value}°C`;
}


export default function FormDialog(props) {
    const { scale_options, setScale_options } = props;  
    const [ currentValue, setCurrentValue ] = useState(0);

    return (
        <>
  
        <Typography variant="h4">
            Scale 
        </Typography>
        <br />

        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth id="outlined-basic-size-small" onChange={e => setScale_options({...scale_options, odds: parseFloat(e.target.value)})}
                    label={'Odds'} type='number' size="small"  inputProps={{ maxLength: 16 }} defaultValue={scale_options.odds}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth id="outlined-basic-size-small" onChange={e => setScale_options({...scale_options, winRate: parseInt(e.target.value)})}
                    label={'Win Percent'} type='number' size="small"  inputProps={{ maxLength: 16 }} defaultValue={scale_options.winRate}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField fullWidth id="outlined-basic-size-small" onChange={e => setScale_options({...scale_options, step: parseFloat(e.target.value)})}
                    label={'Step'} type='number' size="small"  inputProps={{ maxLength: 16 }} defaultValue={scale_options.step}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField fullWidth id="outlined-basic-size-small" onChange={e => setScale_options({...scale_options, min: parseFloat(e.target.value)})}
                    label={'Min'} type='number' size="small"  inputProps={{ maxLength: 16 }} defaultValue={scale_options.min}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField fullWidth id="outlined-basic-size-small" onChange={e => setScale_options({...scale_options, max: parseFloat(e.target.value)})}
                    label={'Max'} type='number' size="small"  inputProps={{ maxLength: 16 }} defaultValue={scale_options.max}/>
            </Grid>
        </Grid>
        <br />

        <Typography variant="h4">
            Preview 
        </Typography>
        <br />

    
            
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} container spacing={2} alignItems="center" sx={{ mt: 2.5 }}>
            
                <Grid item>
                    <Typography variant="h6" color="primary">
                        {scale_options.min}
                    </Typography>
                </Grid>
                <Grid item xs>
                   <Slider value={currentValue} onChange={e => setCurrentValue(parseFloat(e.target.value))} 
                        key="slider1" getAriaValueText={valueText} valueLabelDisplay="on" 
                        min={scale_options.min} max={scale_options.max} step={scale_options.step}/>
                </Grid>
                <Grid item>
                    <Typography variant="h6" color="primary">
                        {scale_options.max}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
              
           

       
    
        </>
    );
}
