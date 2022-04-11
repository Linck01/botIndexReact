import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import config from '../../../../config';
import useAuth from '../../../../hooks/useAuth';
import useColor from '../../../../hooks/useColors';
import useScriptRef from '../../../../hooks/useScriptRef';
import Google from './../../../../assets/images/icons/social-google.svg';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from '../../../../utils/password-strength';
import { SNACKBAR_OPEN } from '../../../../store/actions';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import HCaptcha from '@hcaptcha/react-hcaptcha';


// style constant
const useStyles = makeStyles((theme) => ({
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100],
        color: theme.palette.grey[700],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor:
            theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 + ' !important' : theme.palette.grey[100] + ' !important',
        color: theme.palette.grey[900] + '!important',
        fontWeight: 500
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    loginInput: {
        ...theme.typography.customInput
    }
}));

//===========================|| FIREBASE - REGISTER ||===========================//

const JWTRegister = ({ ...others }) => {
    const classes = useStyles();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    const { colors } = useColor();
    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState('');
    const [passwordMatch, setPasswordMatch] = React.useState(0);
    const [ captchaToken, setCaptchaToken ] = React.useState(null);
    const { register, sendVerificationEmail } = useAuth();
    const dispatch = useDispatch();

    const handleCaptchaVerificationSuccess = (token, ekey) => {
        setCaptchaToken(token);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const checkPasswordConfirm = (pass1, pass2) => {
        if (passwordMatch !== 0 || pass2.length >= pass1.length) {
            if (pass1 == pass2)
                setPasswordMatch(true);
            else 
                setPasswordMatch(false);
        }   
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    return (
        <React.Fragment>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                {/*<Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth={true}
                            className={classes.redButton}
                            onClick={googleHandler}
                            size="large"
                            variant="contained"
                        >
                            <img src={Google} alt="google" width="20px" sx={{ mr: { xs: 1, sm: 2 } }} className={classes.loginIcon} /> Sign
                            up with Google
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                    <Box alignItems="center" display="flex">
                        <Divider className={classes.signDivider} orientation="horizontal" />
                        <AnimateButton>
                            <Button
                                variant="outlined"
                                className={classes.signText}
                                sx={{ borderRadius: customization.borderRadius + 'px' }}
                                disableRipple
                                disabled
                            >
                                OR
                            </Button>
                        </AnimateButton>
                        <Divider className={classes.signDivider} orientation="horizontal" />
                    </Box>
                </Grid>
                */}
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box mb={2}>
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>
                {/*} initialValues={{
                    username: 'aaaaaa',
                    email: 'aaa@aaa.at',
                    password: 'Qayqay123',
                    submit: null
                }} {*/}
            <Formik
                
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    passwordConfirm: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().max(24).required('Username is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                  
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (!checked)
                            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  'T&S need to be accepted.',
                                variant: 'alert', alertSeverity: 'error', close: true });

                        const newUserCredential = await register(values.username, values.email, values.password, captchaToken);

                        //await sendVerificationEmail(values.username, values.email);
                        //await newUserCredential.user.sendEmailVerification();
                        
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.response.data.message || err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.username && errors.username)}
                            className={classes.loginInput}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-email-register">Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="username"
                                value={values.username}
                                name="username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.username && errors.username && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {' '}
                                    {errors.username}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.email && errors.email)}
                            className={classes.loginInput}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {' '}
                                    {errors.email}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            className={classes.loginInput}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                    checkPasswordConfirm(e.target.value, values.passwordConfirm);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {' '}
                                    {errors.password}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>
                        
                        {strength !== 0 && values.password != '' && (
                            <FormControl fullWidth>
                                <Box mb={2}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box width={85} height={8} borderRadius={7} backgroundColor={level.color}></Box>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            className={classes.loginInput}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password confirm</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.passwordConfirm}
                                name="passwordConfirm"
                                label="Password confirm"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    checkPasswordConfirm(values.password, e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {' '}
                                    {errors.password}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {passwordMatch === false && (
                            <FormControl fullWidth>
                                <Box mb={2}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box width={85} height={8} borderRadius={7} backgroundColor={colors.errorDark}></Box>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                Passwords do not match.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        <Grid container alignItems="center" justifyContent="center">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="/termsAndService">
                                                Terms & Condition.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                            <Grid item>                         
                                    <HCaptcha
                                    sitekey={config.hCaptchaSiteKey}
                                    onVerify={(token,ekey) => handleCaptchaVerificationSuccess(token, ekey)}
                                    />
                            </Grid>
                        </Grid>

                        {errors.submit && (
                            <Box mt={3}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box mt={2}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </React.Fragment>
    );
};

export default JWTRegister;
