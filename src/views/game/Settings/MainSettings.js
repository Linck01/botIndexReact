import React from 'react';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Grid, Typography, TextField } from '@material-ui/core';

import { gridSpacing } from '../../../store/constant';

import GameContext from '../../../contexts/GameContext';
// assets


//===========================|| WIDGET STATISTICS ||===========================//

const WidgetStatistics = (props) => {
    const theme = useTheme();
    const { game } = React.useContext(GameContext);
    const { title, setTitle, desc, setDesc, bannerUrl, setBannerUrl } = props;
    
    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Typography variant="h3">
                        Main
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                            style={{width: '100%'}}
                            fullWidth
                            label="Title"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                            style={{width: '100%'}}
                            fullWidth
                            label="Description"
                            variant="outlined"
                            minRows="3"
                            multiline
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                            style={{width: '100%'}}
                            fullWidth
                            label="Banner Url"
                            variant="outlined"
                            value={bannerUrl}
                            onChange={(e) => setBannerUrl(e.target.value)}
                        />
                </Grid>
               
            </Grid> 
        
            {/*}
            <Grid container spacing={gridSpacing}>      
                <Grid item xs={12}>
                    <Typography variant="h3">Currency</Typography>
                    <br />
                </Grid>
                
                <Grid item xs={12} md={6}>
                    
                </Grid>             
            </Grid>
           {*/}
            
            
        </>
    );
};

export default WidgetStatistics;
