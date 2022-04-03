import React from 'react';

// material-ui
import { Typography, Link } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';

//==============================|| SAMPLE PAGE ||==============================//

const SamplePage = () => {
    return (
    <>
        <MainCard title="Community Contact">
            <Typography variant="body2">
                If you need support, have questions or in case you are looking for members, please join our community Discord server via:<br /><br /> 
                
                <Typography
                    variant="body2"
                    color="primary"
                    component={Link}
                    href="https://discord.gg/FwrxrkWgmx"
                    target="_blank"
                    display="block"
                    gutterBottom
                >
                    <strong>https://discord.gg/FwrxrkWgmx</strong>
                </Typography>
            </Typography>
        </MainCard><br />
        <MainCard title="Email Contact">
            <Typography variant="body2">
                Please use our Discord Server for any questions. If you need direct contact you can also use our email (replace the * with the according letter)<br /><br /> 
                <Typography
                    variant="body2"
                    color="primary"
                    component={Link}
                    href="mailto:*etify.gg.0@gmail.com"
                    target="_blank"
                    display="block"
                    gutterBottom
                >
                    <strong>*etify.gg.0@gmail.com</strong>
                </Typography>
            </Typography>
        </MainCard>
        </>
    );
};

export default SamplePage;
