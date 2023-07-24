import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import UserCountCard from '../../../ui-component/cards/UserCountCard';
import { gridSpacing } from '../../../store/constant';
import GameContext from '../../../contexts/GameContext';
import AccountCircleTwoTone from '@material-ui/icons/AccountCircleTwoTone';
import EmojiEventsTwoToneIcon from '@material-ui/icons/EmojiEventsTwoTone';
import useColors from '../../../hooks/useColors';

//===========================|| WIDGET STATISTICS ||===========================//

const WidgetStatistics = (props) => {
    const theme = useTheme();
    const { game } = React.useContext(GameContext);
    const { colors } = useColors();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={6} md={6}>
                <UserCountCard
                    primary="Members"
                    secondary={game.memberCount.toString()}
                    iconPrimary={AccountCircleTwoTone}
                    color={colors.info}
                />
            </Grid>
            {/*}<Grid item xs={6} md={4}>
                <UserCountCard
                    primary="???"
                    secondary={'???'}
                    iconPrimary={DescriptionTwoToneIcon}
                    color={theme.palette.primary.dark}
                />
            </Grid>{*/}
            <Grid item xs={6} md={6}>
                <UserCountCard
                    primary="Bets"
                    secondary={game.betCount.toString()}
                    
                    iconPrimary={EmojiEventsTwoToneIcon}
                    color={colors.info}
                />
            </Grid>

         
        </Grid>
    );
};

export default WidgetStatistics;
