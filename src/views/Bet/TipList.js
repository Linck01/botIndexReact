import React from 'react';

// material-ui
import { Avatar, Divider, Grid, makeStyles, Typography, Pagination } from '@material-ui/core';
import SubCard from '../../ui-component/cards/SubCard';
import { useTheme } from '@material-ui/core/styles';
import { gridSpacing } from '../../store/constant';

// assets
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import Avatar1 from '../../assets/images/users/avatar-1.png';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import WatchLaterTwoToneIcon from '@material-ui/icons/WatchLaterTwoTone';

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    },
    divider: {
        marginTop: '12px',
        marginBottom: '12px'
    },
    avatarSuccess: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
        marginLeft: '15px'
    },
    successDark: {
        color: theme.palette.success.dark
    },
    avatarError: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.orange.light,
        color: theme.palette.orange.dark,
        marginLeft: '15px'
    },
    errorDark: {
        color: theme.palette.orange.dark
    },
    textActive: {
        width: '10px',
        height: '10px',
        verticalAlign: 'center',
        color: theme.palette.success.main
    },
    timeIcon: {
        fontSize: '0.875rem',
        marginRight: '4px',
        verticalAlign: 'sub'
    },
}));

//================================|| UI LIST - CUSTOM ||================================//

export default function CustomList() {
    const classes = useStyles();
    const theme = useTheme();
    const [isLoadingTips, setIsLoadingTips] = React.useState(true);
    const [tips, setTips] = React.useState([]);
    const [tipPage, setTipPage] = React.useState(1);
    const [maxTipPage, setMaxTipPage] = React.useState(1);
    
    const handlePageChange = async (a,b,c) => {
        console.log(a,b,c);
        setTipPage(b);
    }

    return (
        <>
        <Grid container spacing={gridSpacing} alignItems="center">
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Avatar alt="coverimage" src={Avatar1} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Typography align="left" component="div" variant="subtitle1">
                            Alex Thompson
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs zeroMinWidth>
                                <Typography align="left" component="div" variant="subtitle2">
                                    <FiberManualRecordIcon className={classes.textActive} /> Cheers! 
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography align="center" component="div" variant="caption">
                            
                            <WatchLaterTwoToneIcon className={classes.timeIcon} />30 min ago
                                               
                        </Typography>
                        <Typography align="center" component="div" variant="caption">
                            
                            34-34-34 32:324:34
                                               
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </>
    );
}
