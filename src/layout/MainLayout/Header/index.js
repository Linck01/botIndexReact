import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Box, ButtonBase, Typography } from '@material-ui/core';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import LocalizationSection from './LocalizationSection';
import MobileSection from './MobileSection';
import LoginSection from './LoginSection';
import Customization from './Customization';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import useAuth from '../../../hooks/useAuth';

// assets
import { IconMenu2, IconSettings, IconLogin, IconBrandDiscord, IconPlus } from '@tabler/icons';

// style constant
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    headerAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        transition: 'all .2s ease-in-out',
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
        color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
        '&:hover': {
            background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
            color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
        }
    },
    boxContainer: {
        width: '228px',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            width: 'auto'
        },

    },
    box: {
      
    }
}));

//-----------------------|| MAIN NAVBAR / HEADER ||-----------------------//

const Header = ({ handleLeftDrawerToggle }) => {
    const classes = useStyles();
    const { isLoggedIn } = useAuth();

    return (
        <React.Fragment>
            {/* logo & toggler button */}
            <div className={classes.boxContainer}>
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar variant="rounded" className={classes.headerAvatar} onClick={handleLeftDrawerToggle} color="inherit">
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </div>

            <Box component="span" className={classes.box} style={{'marginLeft':'1em'}}>
                <ButtonBase sx={{ borderRadius: '12px' }} href="/games/hosted"> 
                    <Avatar
                        variant="rounded"
                        className={classes.headerAvatar}
                        color="inherit" >
                        
                        <IconPlus stroke={1.5} size="1.6rem" />
                    </Avatar> 
                    &nbsp;&nbsp;
                    <Typography
                            style={{paddingTop: '4px'}}
                            variant="body2"
                            color="primary"
                            
                            display="block"
                            gutterBottom
                        >
                        <strong>Create Game</strong>
                    </Typography>
                </ButtonBase>
            </Box>

            <Box component="span" className={classes.box} style={{'marginLeft':'1em'}}>
                <ButtonBase sx={{ borderRadius: '12px' }} href="https://discord.gg/FwrxrkWgmx"> 
                    <Avatar
                        variant="rounded"
                        className={classes.headerAvatar}
                        color="inherit" >
                        
                        <IconBrandDiscord stroke={1.5} size="1.6rem" />
                    </Avatar> 
                    &nbsp;&nbsp;
                    <Typography
                            style={{paddingTop: '4px'}}
                            variant="body2"
                            color="primary"
                            
                            display="block"
                            gutterBottom
                        >
                        <strong>Join Discord</strong>
                    </Typography>
                </ButtonBase>
            </Box>

            

            {/* header search */}
            {/*}<SearchSection theme="light" />{*/}
            <div className={classes.grow} />
            <div className={classes.grow} />

            {/* live customization & localization */}
            {/*}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <LocalizationSection />
            </Box>
            {*/}
            <Customization />

            {!isLoggedIn ? <><LoginSection /></> : <></>}
            
            {/* notification & profile */}
            {isLoggedIn ? <>{/*}<NotificationSection />{*/}<ProfileSection /></> : <></>}

            {/* mobile header */}
            {/*}<Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>{*/}
        </React.Fragment>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
