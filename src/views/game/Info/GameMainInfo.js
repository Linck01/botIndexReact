import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Grid, Typography, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,Divider,} from '@material-ui/core';
import languages from '../../../utils/locales/languages.json';
import fct from '../../../utils/fct.js';
import { gridSpacing } from '../../../store/constant';
import GameContext from '../../../contexts/GameContext';
import { IconCrown, IconLanguage, IconCalendar } from '@tabler/icons';

//===========================|| WIDGET STATISTICS ||===========================//

const WidgetStatistics = (props) => {
    const theme = useTheme();
    const { game } = React.useContext(GameContext);
    const { adminUsername } = props;

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={12}>
                <Typography variant="h1">{game.title}</Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
                {game.desc}
            </Grid>
            <Grid item xs={12} lg={12}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button>
                        <ListItemIcon>
                            <IconCrown sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">Admin</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {adminUsername}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon>
                            <IconLanguage sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">Language</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                                {languages[game.language][0]}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider /> 
                    <ListItem button>
                        <ListItemIcon>
                            <IconCalendar sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">Created</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                                {fct.formatDateTime(game._createdAt)}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItem>      
                </List>
            </Grid>
        </Grid>
    );
};

export default WidgetStatistics;
