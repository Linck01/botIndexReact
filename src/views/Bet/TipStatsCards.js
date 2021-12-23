import React from 'react';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';


import UserCountCard from '../../ui-component/cards/UserCountCard';

import { gridSpacing } from '../../store/constant';

// assets

import AccountCircleTwoTone from '@material-ui/icons/AccountCircleTwoTone';

import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import EmojiEventsTwoToneIcon from '@material-ui/icons/EmojiEventsTwoTone';

//===========================|| WIDGET STATISTICS ||===========================//

const WidgetStatistics = () => {
    const theme = useTheme();

    return (
        <Grid container spacing={gridSpacing}>
           

            <Grid item xs={12} lg={4}>
                <UserCountCard
                    primary="Daily user"
                    secondary="1,658"
                    iconPrimary={AccountCircleTwoTone}
                    color={theme.palette.secondary.main}
                />
            </Grid>
            <Grid item xs={12} lg={4} sm={6}>
                <UserCountCard
                    primary="Daily page view"
                    secondary="1K"
                    iconPrimary={DescriptionTwoToneIcon}
                    color={theme.palette.primary.dark}
                />
            </Grid>
            <Grid item xs={12} lg={4} sm={6}>
                <UserCountCard
                    primary="Last month visitor"
                    secondary="5,678"
                    iconPrimary={EmojiEventsTwoToneIcon}
                    color={theme.palette.success.dark}
                />
            </Grid>

         
        </Grid>
    );
};

export default WidgetStatistics;
