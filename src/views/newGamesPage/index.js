import React from 'react';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';

//==============================|| SAMPLE PAGE ||==============================//

const SamplePage = () => {
    return (
        <MainCard title="Sample Card">
            <Typography variant="body2">
                newGamesPage
            </Typography>
        </MainCard>
    );
};

export default SamplePage;
