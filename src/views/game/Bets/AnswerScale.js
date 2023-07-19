import { TextField, Typography, Grid, Slider } from '@material-ui/core';
import React, { useState } from 'react';
import { gridSpacing } from '../../../store/constant';

function valueText(value) {
    return `${value}°C`;
}

export default function AnswerScale(props) {
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
