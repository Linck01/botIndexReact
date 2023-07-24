import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Avatar, ButtonBase, Drawer, FormControl, FormControlLabel,
    Grid, Radio, RadioGroup, Tooltip, Typography, Box,
    Checkbox } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SubCard from '../../../../ui-component/cards/SubCard';
import { SET_CUSTOMIZATION } from '../../../../store/actions'; // THEME_RTL
import { gridSpacing } from '../../../../store/constant';
import colors from '../../../../assets/scss/_themes-vars.module.scss';
import theme1 from '../../../../assets/scss/_theme1.module.scss';
import theme2 from '../../../../assets/scss/_theme2.module.scss';
import theme3 from '../../../../assets/scss/_theme3.module.scss';
import theme4 from '../../../../assets/scss/_theme4.module.scss';
import theme5 from '../../../../assets/scss/_theme5.module.scss';
import theme6 from '../../../../assets/scss/_theme6.module.scss';
import { IconChecks, IconMoon2 } from '@tabler/icons';

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
        paddingTop: '7px',
    }
}));

const PresetColor = ({ color, presetColor, setPresetColor }) => {
    return (
        <Grid item>
            <ButtonBase sx={{ borderRadius: '12px' }} onClick={() => setPresetColor(color.id)}>
                <Avatar
                    variant="rounded"
                    color="inherit"
                    sx={{
                        background: 'linear-gradient(135deg, ' + color.primary + ' 50%, ' + color.secondary + ' 50%)',
                        opacity: presetColor === color.id ? 0.6 : 1
                    }}
                >
                    {presetColor === color.id && <IconChecks color="#fff" />}
                </Avatar>
            </ButtonBase>
        </Grid>
    );
};

//-----------------------|| LIVE CUSTOMIZATION ||-----------------------//

const Customization = () => {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();

    const customization = useSelector((state) => state.customization);


    // drawer on/off
    const [open, setOpen] = React.useState(false);
    const handleToggle = () => {
        if (open)
            localStorage.setItem('customization', JSON.stringify(customization));
        setOpen(!open);
    };

    // state - layout type
    /*const [navType, setNavType] = React.useState(customization.navType);
    useEffect(() => {
        dispatch({ type: MENU_TYPE, navType: navType });
    }, [dispatch, navType]);

    // state - preset color
    /*const [presetColor, setPresetColor] = React.useState(customization.presetColor);
    useEffect(() => {
        dispatch({ type: PRESET_COLORS, presetColor: presetColor });
    }, [dispatch, presetColor]);

    // state - border radius
    const [borderRadius, setBorderRadius] = React.useState(customization.borderRadius);
    const handleBorderRadius = (event, newValue) => {
        setBorderRadius(newValue);
    };

    useEffect(() => {
        dispatch({ type: SET_BORDER_RADIUS, borderRadius: borderRadius });
    }, [dispatch, borderRadius]);

    // state - filled with outline textfield
    const [outlinedFilled, setOutlinedFilled] = React.useState(customization.outlinedFilled);
    const handleOutlinedFilled = (event) => {
        setOutlinedFilled(event.target.checked);
    };

    useEffect(() => {
        dispatch({ type: SET_OUTLINED_FILLED, outlinedFilled: outlinedFilled });
    }, [dispatch, outlinedFilled]);
    
    // state - RTL layout
    // const [rtlLayout, setRtlLayout] = React.useState(customization.rtlLayout);
    // const handleRtlLayout = (event) => {
    //     setRtlLayout(event.target.checked);
    // };

    if (customization.rtlLayout) {
        document.querySelector('body').setAttribute('dir', 'rtl');
    }

    // useEffect(() => {
    //     dispatch({ type: THEME_RTL, rtlLayout: rtlLayout });
    // }, [dispatch, rtlLayout]);
    
    let initialFont;
    switch (customization.fontFamily) {
        case `'Inter', sans-serif`:
            initialFont = 'Inter';
            break;
        case `'Poppins', sans-serif`:
            initialFont = 'Poppins';
            break;
        case `'Roboto', sans-serif`:
        default:
            initialFont = 'Roboto';
            break;
    }
    
    // state - font family
    const [fontFamily, setFontFamily] = React.useState(initialFont);
    useEffect(() => {
        let newFont;
        switch (fontFamily) {
            case 'Inter':
                newFont = `'Inter', sans-serif`;
                break;
            case 'Poppins':
                newFont = `'Poppins', sans-serif`;
                break;
            case 'Roboto':
            default:
                newFont = `'Roboto', sans-serif`;
                break;
        }
        dispatch({ type: SET_FONT_FAMILY, fontFamily: newFont });
    }, [dispatch, fontFamily]);
    */
    const colorOptions = [
        {
            id: 'default',
            primary: theme.palette.mode === 'dark' ? colors.darkPrimaryMain : colors.primaryMain,
            secondary: theme.palette.mode === 'dark' ? colors.darkSecondaryMain : colors.secondaryMain
        },
        {
            id: 'theme1',
            primary: theme.palette.mode === 'dark' ? theme1.darkPrimaryMain : theme1.primaryMain,
            secondary: theme.palette.mode === 'dark' ? theme1.darkSecondaryMain : theme1.secondaryMain
        },
        {
            id: 'theme2',
            primary: theme.palette.mode === 'dark' ? theme2.darkPrimaryMain : theme2.primaryMain,
            secondary: theme.palette.mode === 'dark' ? theme2.darkSecondaryMain : theme2.secondaryMain
        },
        {
            id: 'theme3',
            primary: theme.palette.mode === 'dark' ? theme3.darkPrimaryMain : theme3.primaryMain,
            secondary: theme.palette.mode === 'dark' ? theme3.darkSecondaryMain : theme3.secondaryMain
        },
        {
            id: 'theme4',
            primary: theme.palette.mode === 'dark' ? theme4.darkPrimaryMain : theme4.primaryMain,
            secondary: theme.palette.mode === 'dark' ? theme4.darkSecondaryMain : theme4.secondaryMain
        },
        {
            id: 'theme5',
            primary: theme.palette.mode === 'dark' ? theme5.darkPrimaryMain : theme5.primaryMain,
            secondary: theme.palette.mode === 'dark' ? theme5.darkSecondaryMain : theme5.secondaryMain
        },
        {
            id: 'theme6',
            primary: theme.palette.mode === 'dark' ? theme6.darkPrimaryMain : theme6.primaryMain,
            secondary: theme.palette.mode === 'dark' ? theme6.darkSecondaryMain : theme6.secondaryMain
        }
    ];

    useEffect(() => {
        const storedCustomization = JSON.parse(localStorage.getItem('customization'));
        if (storedCustomization)
            dispatch({ type: SET_CUSTOMIZATION, customization: storedCustomization });
    }, []);

    return (
        <React.Fragment>
            {/* toggle button */}

            <Tooltip title="Live Customize" onClick={handleToggle}>
                <Box component="span" className={classes.box} style={{'marginLeft':'1em'}}>
                    <ButtonBase sx={{ borderRadius: '12px' }}>
                        
                        <Avatar
                            variant="rounded"
                            className={classes.headerAvatar}
                            color="inherit" >
                            
                            <IconMoon2 stroke={1.5} size="1.6rem" />
                        </Avatar>
                        
                    </ButtonBase>
                </Box>
            </Tooltip>

            <Drawer
                anchor="right"
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: 280
                    }
                }}>
                <PerfectScrollbar component="div">
                    <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                        <Grid item xs={12}>
                            <SubCard>
                                <FormControl component="fieldset">
                                    
                                    <Typography variant="h4" color="textPrimary">Layout</Typography><br />
                                    <RadioGroup
                                        row
                                        aria-label="layout"
                                        value={customization.navType}
                                        onChange={(e) => dispatch({ type: SET_CUSTOMIZATION, customization: {...customization, navType: e.target.value} }) }
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            value="light"
                                            control={<Radio />}
                                            label={<Typography variant="text">Light</Typography>}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                                '& .MuiFormControlLabel-label': { color: 'grey.900' }
                                            }}
                                        />
                                        <FormControlLabel
                                            value="dark"
                                            control={<Radio />}
                                            label={<Typography variant="text">Dark</Typography>}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                                '& .MuiFormControlLabel-label': { color: 'grey.900' }
                                            }}
                                        />
                                    </RadioGroup>
                                </FormControl>
                                {/* <FormControl component="fieldset" sx={{ mt: 2 }}>
                                    <FormLabel component="legend">Direction</FormLabel>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={rtlLayout}
                                                onChange={handleRtlLayout}
                                                inputProps={{ 'aria-label': 'controlled-direction' }}
                                            />
                                        }
                                        label="RTL"
                                    />
                                </FormControl> */}
                            </SubCard>
                        </Grid>
                        <Grid item xs={12}>
                            {/* Theme Preset Color */}
                            <SubCard >
                                <Typography variant="h4" color="textPrimary">Color Preset</Typography><br />
                                <Grid item container spacing={2} alignItems="center">
                                    {colorOptions.map((color, index) => {
                                        return (
                                            <PresetColor
                                                key={index}
                                                color={color}
                                                presetColor={customization.presetColor}
                                                setPresetColor={ (e) => dispatch({ type: SET_CUSTOMIZATION, customization: {...customization, presetColor: e} })}
                                            />
                                        );
                                    })}
                                </Grid>
                            </SubCard>
                        </Grid>
                        <Grid item xs={12}>
                            <SubCard >
                                <Typography variant="h4" color="textPrimary">Bet Display Options</Typography><br />
                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={customization.showSolvedBets}
                                                onChange={(e) => dispatch({ type: SET_CUSTOMIZATION, customization: {...customization, showSolvedBets: e.target.checked}} )}
                                                name="checked"
                                                color="primary"
                                            />
                                        }
                                        label={<Typography variant="text">Solved Bets</Typography>}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={customization.showAbortedBets}
                                                onChange={(e) => dispatch({ type: SET_CUSTOMIZATION, customization: {...customization, showAbortedBets: e.target.checked}} )}
                                                name="checked"
                                                color="primary"
                                            />
                                        }
                                        label={<Typography variant="text">Aborted Bets</Typography>}
                                    />
                                </FormControl>
                            </SubCard>
                        </Grid>
                        <Grid item xs={12}>
                            {/* font family */}
                            <SubCard >
                                <Typography variant="h4" color="textPrimary">Font Family</Typography><br />
                                <FormControl>
                                    <RadioGroup
                                        aria-label="font-family"
                                        value={customization.fontFamily}
                                        onChange={(e) => dispatch({ type: SET_CUSTOMIZATION, customization: {...customization, fontFamily: e.target.value} }) }
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            value="Roboto"
                                            control={<Radio />}
                                            label={<Typography variant="text">Roboto</Typography>}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                                '& .MuiFormControlLabel-label': { color: 'grey.900' }
                                            }}
                                        />
                                        <FormControlLabel
                                            value="Poppins"
                                            control={<Radio />}
                                            label={<Typography variant="text">Poppins</Typography>}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                                '& .MuiFormControlLabel-label': { color: 'grey.900' }
                                            }}
                                        />
                                        <FormControlLabel
                                            value="Inter"
                                            control={<Radio />}
                                            label={<Typography variant="text">Inter</Typography>}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                                '& .MuiFormControlLabel-label': { color: 'grey.900' }
                                            }}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </SubCard>
                        </Grid>
                        
                        {/*}
                        <Grid item xs={12}>
                            <SubCard title="Border Radius">
                                <Grid item xs={12} container spacing={2} alignItems="center" sx={{ mt: 2.5 }}>
                                    <Grid item>
                                        <Typography variant="h6" color="secondary">
                                            4px
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Slider
                                            value={customization.borderRadius}
                                            onChange={(e, newValue) => dispatch({ type: SET_CUSTOMIZATION, customization: {...customization, borderRadius: newValue} }) }
                                            getAriaValueText={valueText}
                                            valueLabelDisplay="on"
                                            aria-labelledby="discrete-slider-small-steps"
                                            marks
                                            step={2}
                                            min={4}
                                            max={24}
                                            color="secondary"
                                            sx={{
                                                '& .MuiSlider-valueLabel': {
                                                    color: 'secondary.main'
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6" color="secondary">
                                            24px
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                        {*/}
                        {/*}
                        <Grid item xs={12}>
                            <SubCard title="Input Outlined With Filled">
                                <Grid item xs={12} container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Stack spacing={2}>
                                            <Switch
                                                checked={customization.outlinedFilled}
                                                onChange={(e) => dispatch({ type: SET_CUSTOMIZATION, customization: {...customization, outlinedFilled: e.target.checked} }) }
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <TextField
                                                fullWidth
                                                id="outlined-basic"
                                                label={customization.outlinedFilled ? 'With Background' : 'Without Background'}
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                        {*/}
                    </Grid>
                </PerfectScrollbar>
            </Drawer>
        </React.Fragment>
    );
};

export default Customization;
