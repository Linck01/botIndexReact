import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, CssBaseline, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import CookieConsent /*, { Cookies, getCookieConsentValue }*/ from "react-cookie-consent";
import clsx from 'clsx';
import Header from './Header';
import Sidebar from './Sidebar';
import { drawerWidth } from '../../store/constant';
import { SET_MENU } from './../../store/actions';
import useColors from './../../hooks/useColors';
import GameContext from '../../contexts/GameContext';
import MuiTypography from '@material-ui/core/Typography';

//import Breadcrumbs from './../../ui-component/extended/Breadcrumbs';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        backgroundColor: theme.palette.background.default
    },
    appBarWidth: {
        transition: theme.transitions.create('width'),
        backgroundColor: theme.palette.background.default
    },
    content: {
        ...theme.typography.mainContent,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    }
}));

//-----------------------|| MAIN LAYOUT ||-----------------------//

const MainLayout = ({ children }) => {
    const classes = useStyles();
    const theme = useTheme();
    //const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const { colors } = useColors();
    const { game } = React.useContext(GameContext);
    
    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    React.useEffect(() => {
        const openLeftDrawerState = (val) => {
            dispatch({ type: SET_MENU, opened: val });
        };
        //openLeftDrawerState(matchUpMd);

        if (game)
            openLeftDrawerState(true);
        else
            openLeftDrawerState(false);
    }, [dispatch, /*matchUpMd,*/ game]);

    return (
        <div className={classes.root}>
            <CssBaseline />
            {/* header */}
            <AppBar position="fixed" color="inherit" elevation={0} className={leftDrawerOpened ? classes.appBarWidth : classes.appBar} >
                <Toolbar style={{paddingTop: ''}}>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar>

            {/* drawer */}
            <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

            {/* main content */}
            <main
                className={clsx([
                    classes.content,
                    {
                        [classes.contentShift]: leftDrawerOpened
                    }
                ])}
            >
                {/* breadcrumb */}
                { /* }
                <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
                { */ }

                <div>{children}</div>
            </main>
            {/*}<Customization />{*/}
            <CookieConsent
                location="bottom"
                buttonText="Accept"
                cookieName="cookieConsentOne"
                style={{ background: colors.secondary, zIndex: '10000000', fontSize: "1em" }}
                buttonStyle={{ background: colors.success, fontSize: "1em" }}
                declineButtonStyle={{ background: colors.error, fontSize: "1em" }}
                declineButtonText="Decline"
                setDeclineCookie={false}
                expires={150}
                enableDeclineButton
                onDecline={() => {
                    window.location.replace("https://google.com");
                }}
                >
                <Typography variant="body2"> 
                    This website uses cookies to enhance user experience. By using this website you agree to our&nbsp;
                    <Link style={{ color: colors.secondaryInvert, fontSize: "1em" }} to="/termsAndConditions">Terms and Conditions</Link> and&nbsp;
                    <Link style={{ color: colors.secondaryInvert, fontSize: "1em" }} to="/privacyPolicy">Privacy Policy</Link>.
                </Typography>
                {/*}<span style={{ fontSize: "10px" }}>This bit of text is smaller :O</span>{*/}
            </CookieConsent>
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node
};

export default MainLayout;
