import React from 'react';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';


import { gridSpacing } from '../../../store/constant';

import GameContext from '../../../contexts/GameContext';
// assets


//===========================|| WIDGET STATISTICS ||===========================//

const WidgetStatistics = (props) => {
    const theme = useTheme();
    const { game } = React.useContext(GameContext);
    const { title, setTitle, desc, setDesc } = props;
    
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={12}>
                {title}
            </Grid>
            <Grid item xs={12} lg={12}>
                {desc}
            </Grid>
        </Grid>
    );
};

export default WidgetStatistics;
