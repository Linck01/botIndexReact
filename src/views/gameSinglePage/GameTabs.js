import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Tab, Tabs } from '@material-ui/core';

// project imports
import GameInfo from './GameInfo';
import GameMembersList from './GameMembersList';
import BetList from './BetList';
import GameSettings from './GameSettings';
import GameLog from './GameLog';

import MainCard from '../../ui-component/cards/MainCard';
import { gridSpacing } from '../../store/constant';
import { GameProvider } from '../../contexts/GameContext';
import useGame from '../../hooks/useGame';
import GameChat from './GameChat';

// assets
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import LibraryBooksTwoToneIcon from '@material-ui/icons/LibraryBooksTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';

const useStyles = makeStyles((theme) => ({
    accountTab: {
        marginBottom: '24px',
        '& a': {
            minHeight: 'auto',
            minWidth: '10px',
            padding: '12px 8px',
            marginRight: '18px',
            color: theme.palette.grey[600]
        },
        '& a.Mui-selected': {
            color: theme.palette.primary.main
        },
        '& a > span': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        '& a > span > svg': {
            marginBottom: '0px !important',
            marginRight: '10px'
        },
        '& a > span > span + svg': {
            margin: '0px 0px 0px auto !important',
            width: '14px',
            height: '14px'
        }
    }
}));

// tabs panel
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box p={0}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}


//-----------------------|| PROFILE 1 ||-----------------------//

const GameTabs = () => {
    const classes = useStyles();
    const { game, socket } = useGame();
    const [ value, setValue ] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      
  
            <MainCard>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        { game.name }
                    </Grid>
                </Grid>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Tabs
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                            className={classes.accountTab}
                            aria-label="simple tabs example"
                            variant="scrollable"
                        >
                            <Tab key={0} component={Link} to="#" icon={<AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />} label={'Bets'} {...a11yProps(0)} />
                            <Tab key={1} component={Link} to="#" icon={<LibraryBooksTwoToneIcon sx={{ fontSize: '1.3rem' }} />} label={'Members'} {...a11yProps(1)} />
                            <Tab key={2} component={Link} to="#" icon={<LibraryBooksTwoToneIcon sx={{ fontSize: '1.3rem' }} />} label={'Log'} {...a11yProps(2)} />
                            <Tab key={3} component={Link} to="#" icon={<LockTwoToneIcon sx={{ fontSize: '1.3rem' }} />} label={'Info'} {...a11yProps(3)} />
                            <Tab key={4} component={Link} to="#" icon={<MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />} label={'Settings'} {...a11yProps(4)} />

                            
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <BetList />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <GameMembersList />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <GameLog />
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <GameInfo />
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <GameSettings />
                        </TabPanel>
                    </Grid>
                </Grid>
                </MainCard>
         
           
               
       
    );
};

export default GameTabs;
