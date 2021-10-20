import React from 'react';
import { useParams } from 'react-router-dom';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';

//==============================|| SAMPLE PAGE ||==============================//

const SamplePage = () => {
    let { id } = useParams();
    console.log(id);

    return (
        <MainCard title="Sample Card">
            <Typography variant="body2">
                GameSinglePage {id} 
            </Typography>
        </MainCard>
    );
};

export default SamplePage;
