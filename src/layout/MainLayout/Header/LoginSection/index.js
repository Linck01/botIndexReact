import React from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Avatar,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Paper,
    Popper,
    Switch,
    Typography,
    Link
} from '@material-ui/core';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from '../../../../ui-component/cards/MainCard';
import Transitions from '../../../../ui-component/extended/Transitions';
import useAuth from '../../../../hooks/useAuth';

// assets
import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons';
import User1 from './../../../../assets/images/users/user-round.svg';

// style const
const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: '100%',
        maxWidth: '350px',
        minWidth: '300px',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            minWidth: '100%'
        }
    },
    headerAvatar: {
        cursor: 'pointer',
        ...theme.typography.mediumAvatar,
        margin: '8px 0 8px 8px !important'
    },
    profileChip: {
        marginLeft: '1em',
        height: '48px',
        alignItems: 'center',
        borderRadius: '27px',
        transition: 'all .2s ease-in-out',
        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
        '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: theme.palette.primary.main + '!important',
            color: theme.palette.primary.light,
            '& svg': {
                stroke: theme.palette.primary.light
            }
        }
    },
    profileLabel: {
        lineHeight: 0,
        padding: '12px'
    },
    listItem: {
        marginTop: '5px'
    },
    cardContent: {
        padding: '16px !important'
    },
    card: {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.primary.light,
        marginBottom: '16px',
        marginTop: '16px'
    },
    searchControl: {
        width: '100%',
        paddingRight: '8px',
        paddingLeft: '16px',
        marginBottom: '16px',
        marginTop: '16px'
    },
    startAdornment: {
        fontSize: '1rem',
        color: theme.palette.grey[500]
    },
    flex: {
        display: 'flex'
    },
    name: {
        marginLeft: '2px',
        fontWeight: 400
    },
    ScrollHeight: {
        height: '100%',
        maxHeight: 'calc(100vh - 250px)',
        overflowX: 'hidden'
    },
    badgeWarning: {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.warning.dark,
        color: '#fff'
    }
}));

//-----------------------|| PROFILE MENU ||-----------------------//

const LoginSection = () => {
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const lastLocation = useLocation();

    const [sdm, setSdm] = React.useState(true);
    const [value, setValue] = React.useState('');
    const [notification, setNotification] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const { logout, user, isLoggedIn } = useAuth();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleLogout = async () => {
        try {
            await logout();
            history.push('/');
        } catch (err) {
            console.error(err);
        }
    };
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        handleClose(event);
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    return (
        <React.Fragment>
            <Link href={'/login?fromLocation=' + lastLocation.pathname}>
            <Chip
                classes={{ label: classes.profileLabel }}
                className={classes.profileChip}
                icon={ <></> /*
                     <Avatar
                        src={User1}
                        className={classes.headerAvatar}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit" />
                    */
                }
                label={<IconUser stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
                variant="outlined"
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={() => {}}
                color="primary"
            />
           </Link>
            
        </React.Fragment>
    );
};

export default LoginSection;
