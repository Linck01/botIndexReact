
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography, FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core';

import React, {useState, useEffect, useRef, useContext} from 'react';
import GameContext from '../../../contexts/GameContext';
import fct from '../../../utils/fct.js';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useDispatch } from 'react-redux';
// project imports


import { SNACKBAR_OPEN } from '../../../store/actions';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../utils/axios';
import config from '../../../config';
import CustomDateTime from './CustomDateTime';
import SubCard from '../../../ui-component/cards/SubCard';
import { IconCirclePlus } from '@tabler/icons';

//===============================|| UI DIALOG - FORMS ||===============================//

export default function FormDialog({...props}) {
    const { catalogue_answers, setCatalogue_answers } = props;
    
    const addAnswer = () => {
        if (catalogue_answers.length > 32)
            return;

        let tmp = [...catalogue_answers];
        tmp.push({title:'',odds:2});
        
        setCatalogue_answers(tmp);
    };

    const updateAnswer = (e,field,index) => {
        console.log('GGGGGGG', e,field,index);
        let tmp = [...catalogue_answers];
        tmp[index][field] = e.target.value;
        
        setCatalogue_answers(tmp);
    };
    

    useEffect(() => {
    }, []);
    
    return (
        <>
        <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
                <Typography variant="h4">
                    Answers 
                </Typography>
            </Grid>
        </Grid>
        <br />
    
        <Grid container spacing={3} >
            {catalogue_answers.map((answer, i) => 
                (<>
                <Grid item xs={8} lg={10} >
                    
                    <TextField onChange={e => updateAnswer(e,'title', i)} fullWidth id="outlined-basic-size-small" label={'Answer  ' + (i + 1)} size="small" defaultValue="" inputProps={{ maxLength: 64 }}/>
                    
                </Grid>
                <Grid item xs={4} lg={2} >
                    
                    <TextField onChange={e => updateAnswer(e,'odds', i)} fullWidth id="outlined-basic-size-small" label={'Odds  ' + (i + 1)} type='number' size="small" defaultValue="2" inputProps={{ maxLength: 10 }}/>
                    
                </Grid>
                </>)
            )}
            
            
            <Grid item xs={12} textAlign={'center'}>
                <Button onClick={addAnswer}>
                    <IconCirclePlus stroke={1.5} size="3rem" />
                </Button>
                
            </Grid>
            
        </Grid>
    
        </>
    );
}
