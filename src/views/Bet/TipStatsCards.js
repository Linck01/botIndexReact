import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import UserCountCard from '../../ui-component/cards/UserCountCard';
import { gridSpacing } from '../../store/constant';
import AccountCircleTwoTone from '@material-ui/icons/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import EmojiEventsTwoToneIcon from '@material-ui/icons/EmojiEventsTwoTone';

const WidgetStatistics = (props) => {
    const theme = useTheme();
    const { bet, myTips } = props;
    
    let staked = 0;
    for (let tip of myTips)
        staked += parseFloat(tip.currency.$numberDecimal);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={4}>
                <UserCountCard
                    primary="Participants"
                    secondary={bet.memberCount.toString()}
                    iconPrimary={AccountCircleTwoTone}
                    color={theme.palette.secondary.main}
                />
            </Grid>
            <Grid item xs={6} md={4}>
                <UserCountCard
                    primary="Staked"
                    secondary={staked.toString()}
                    iconPrimary={DescriptionTwoToneIcon}
                    color={theme.palette.primary.dark}
                />
            </Grid>
            <Grid item xs={6} md={4}>
                <UserCountCard
                    primary="In Pot"
                    secondary={bet.inPot.$numberDecimal}
                    iconPrimary={EmojiEventsTwoToneIcon}
                    color={theme.palette.success.dark}
                />
            </Grid>
        </Grid>
    );
};

export default WidgetStatistics;
