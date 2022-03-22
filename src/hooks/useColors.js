import { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';

const useAnswerColors = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const theme = useTheme();

    const primaryLight = theme.palette.primary.light;
    const primary200 = theme.palette.primary[200];
    const primaryMain = theme.palette.primary.main;
    const primaryDark = theme.palette.primary.dark;
    
    const secondaryLight = theme.palette.secondary.light;
    const secondary200 = theme.palette.secondary[200];
    const secondaryMain = theme.palette.secondary.main;
    const secondaryDark = theme.palette.secondary.dark;

    const darkLight = theme.palette.dark.light;
    const dark800 = theme.palette.dark[800];
    const darkMain = theme.palette.dark.main;
    const darkDark = theme.palette.dark.dark;

    const successLight = theme.palette.success.light;
    const success200 = theme.palette.success[200];
    const successMain = theme.palette.success.main;
    const successDark = theme.palette.success.dark;

    const infoLight = theme.palette.info.light;
    const infoMain = theme.palette.info.main;
    const infoDark = theme.palette.info.dark;

    const orangeLight = theme.palette.orange.light;
    const orangeMain = theme.palette.orange.main;
    const orangeDark = theme.palette.orange.dark;

    const errorLight = theme.palette.error.light;
    const errorMain = theme.palette.error.main;
    const errorDark = theme.palette.error.dark;

    const warningLight = theme.palette.warning.light;
    const warningMain = theme.palette.warning.main;
    const warningDark = theme.palette.warning.dark;

    const success = theme.palette.mode === 'dark' ? successDark : successLight;
    const warning = theme.palette.mode === 'dark' ? warningDark : warningLight;
    const info = theme.palette.mode === 'dark' ? infoDark : infoLight;
    const error = theme.palette.mode === 'dark' ? errorDark : errorLight;

    const answerColors = [
        primaryDark, secondaryDark, successDark, orangeDark, infoDark, warningDark, errorDark, 
        primaryMain, secondaryMain, successMain, orangeMain, infoMain, warningMain, errorMain,
        primary200, secondary200, success200, 
    ]

    const colors = {
        success, warning, info, error,
        primaryLight, secondaryLight, orangeLight, errorLight,
        primaryDark, secondaryDark, successDark, orangeDark, infoDark, warningDark, errorDark, 
        primaryMain, secondaryMain, successMain, orangeMain, infoMain, warningMain, errorMain,
        primary200, secondary200, success200, darkLight, dark800, darkMain, darkDark
    }

    useEffect(() =>{
       
    }, []);

    return { answerColors, colors };
};

export default useAnswerColors;