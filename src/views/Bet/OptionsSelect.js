import React from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

// assets
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone';

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
}));

//================================|| UI LIST - SELECTED LIST ||================================//

export default function SelectedListItem(props) {
    const classes = useStyles();
    const { bet, myTips, selectedIndex, setSelectedIndex } = props;
    const customization = useSelector((state) => state.customization);
    console.log('BBBB', props);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem
                    button
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                    sx={{ borderRadius: customization.borderRadius + 'px' }}
                >
                    <ListItemIcon>
                        <HomeTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                    </ListItemIcon>
                    <ListItemText primary="Option 1" />
                </ListItem>
                <ListItem
                    button
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                    sx={{ borderRadius: customization.borderRadius + 'px', mt: '5px' }}
                >
                    <ListItemIcon>
                        <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                    </ListItemIcon>
                    <ListItemText primary="Option 2" />
                </ListItem>
                <ListItem
                    button
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                    sx={{ borderRadius: customization.borderRadius + 'px', mt: '5px' }}
                >
                    <ListItemIcon>
                        <ListAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                    </ListItemIcon>
                    <ListItemText primary="Option 3" />
                </ListItem>
                <ListItem
                    button
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                    sx={{ borderRadius: customization.borderRadius + 'px', mt: '5px' }}
                >
                    <ListItemIcon>
                        <ListAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                    </ListItemIcon>
                    <ListItemText primary="Option 4" />
                </ListItem>
                <ListItem
                    button
                    selected={selectedIndex === 4}
                    onClick={(event) => handleListItemClick(event, 4)}
                    sx={{ borderRadius: customization.borderRadius + 'px', mt: '5px' }}
                >
                    <ListItemIcon>
                        <ListAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                    </ListItemIcon>
                    <ListItemText primary="Option 5" />
                </ListItem>
            </List>
        </div>
    );
}
