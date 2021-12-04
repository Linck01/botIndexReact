import React from 'react';

// material-ui
import { Avatar, Divider, Grid, makeStyles, Typography, Pagination } from '@material-ui/core';
import SubCard from '../../ui-component/cards/SubCard';
import { useTheme } from '@material-ui/core/styles';

// assets
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';

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
    }
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
        <SubCard>
        <div className={classes.root}>
            <Grid container direction="column">
                <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                                User 1
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                        1800 HB
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar variant="rounded" className={classes.avatarSuccess}>
                                        <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography style={{color: theme.palette.success.dark}} variant="subtitle2">
                        Option 3
                    </Typography>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container direction="column">
                <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                                User 2
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                        200 HB
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar variant="rounded" className={classes.avatarError}>
                                        <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" style={{color: theme.palette.error.dark}}>
                        Option 1
                    </Typography>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container direction="column">
                <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                                User 3
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                        100 HB
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar variant="rounded" className={classes.avatarSuccess}>
                                        <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" style={{color: theme.palette.success.dark}}>
                        Option 3 
                    </Typography>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container direction="column">
                <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                                User 4
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                        190 HB
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar variant="rounded" className={classes.avatarError}>
                                        <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" style={{color: theme.palette.info.dark}}>
                        Option 2
                    </Typography>
                </Grid>
            </Grid>
        </div>
        <Grid container direction="column" spacing={2} alignItems="center">
            <Grid item xs={12}>
                <Pagination page={tipPage} onChange={handlePageChange} count={maxTipPage} color="primary" />
            </Grid>
        </Grid>
        </SubCard>
    );
}
