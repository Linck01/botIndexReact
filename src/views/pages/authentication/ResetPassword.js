import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@material-ui/core';
import { Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import Logo from './../../../ui-component/Logo';
import JWTResetPassword from './jwt-forms/JWTResetPassword';
import AuthFooter from './../../../ui-component/cards/AuthFooter';
import { Helmet } from "react-helmet";

// assets

//============================|| AUTH3 - RESET PASSWORD ||============================//

const ResetPassword = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
        <Helmet>
            <title>Reset Password</title>
        </Helmet>
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Logo />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                                            <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                                                Reset password
                                            </Typography>
                                            {/*}<Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                                                
                                            </Typography>{*/}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <JWTResetPassword />
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
        </>
    );
};

export default ResetPassword;
