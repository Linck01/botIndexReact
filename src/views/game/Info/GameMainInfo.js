import React from 'react';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import languages from '../../../utils/locales/languages.json';

import { gridSpacing } from '../../../store/constant';

import GameContext from '../../../contexts/GameContext';
// assets


//===========================|| WIDGET STATISTICS ||===========================//

const WidgetStatistics = (props) => {
    const theme = useTheme();
    const { game } = React.useContext(GameContext);
    
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={12}>
                <Typography variant="h1">{game.title}</Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
                {game.desc}
            </Grid>
            <Grid item xs={12} lg={12}>
                <Typography variant="h5">Language:</Typography> {languages[game.language][0]}
            </Grid>
        </Grid>
    );
};

export default WidgetStatistics;
