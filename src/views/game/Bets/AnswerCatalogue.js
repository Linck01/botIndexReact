
import { Button, TextField, Typography, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { IconCirclePlus } from '@tabler/icons';
import { gridSpacing } from '../../../store/constant';

export default function AnswerCatalogue({...props}) {
    const { catalogue_answers, setCatalogue_answers } = props;
    
    const addAnswer = () => {
        if (catalogue_answers.length > 32)
            return;

        let tmp = [...catalogue_answers];
        tmp.push({title:'',odds:2});
        
        setCatalogue_answers(tmp);
    };

    const updateAnswer = (e,field,index) => {
        let tmp = [...catalogue_answers];
        tmp[index][field] = e.target.value;
        
        setCatalogue_answers(tmp);
    };
    

    useEffect(() => {
    }, []);
    
    return (
        <>
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={6}>
                <Typography variant="h4">
                    Answers 
                </Typography>
            </Grid>
        </Grid>
        <br />
    
        <Grid container spacing={1} >
            {catalogue_answers.map((answer, i) => 
                (<React.Fragment key={i}>
                <Grid item xs={8} lg={10} >
                    <TextField onChange={e => updateAnswer(e,'title', i)} fullWidth id="outlined-basic-size-small" label={'Answer  ' + (i + 1)} size="small" defaultValue="" inputProps={{ maxLength: 64 }}/>     
                </Grid>
                <Grid item xs={4} lg={2} >         
                    <TextField onChange={e => updateAnswer(e,'odds', i)} fullWidth id="outlined-basic-size-small" label={'Odds  ' + (i + 1)} type='number' size="small" defaultValue="2" inputProps={{ maxLength: 10 }}/>          
                </Grid>
                </React.Fragment>)
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
