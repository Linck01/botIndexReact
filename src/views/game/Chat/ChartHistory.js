import * as PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import useAuth from '../../../hooks/useAuth';
import MuiTypography from '@material-ui/core/Typography';

// material-ui
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

// project imports
import { gridSpacing } from '../../../store/constant';

//-----------------------|| CHAT MESSAGE HISTORY ||-----------------------//

const ChartHistory = ({ theme, data, scrollBarEl }) => {
    // scroll to bottom when new message is sent or received
    const wrapper = useRef(document.createElement('div'));
    const el = wrapper.current;
    const { user } = useAuth();

    const scrollToBottom = useCallback(() => {
        if (scrollBarEl) scrollBarEl.scrollTop = 100;
    }, [el]);

    useEffect(() => {
        scrollToBottom();
    }, [data.length, scrollToBottom]);

    return (
   
            <Grid container spacing={gridSpacing} ref={wrapper}>
                {data.map((history, index) => {
                    return (
                        <React.Fragment key={index}>
                            {/*console.log(JSON.stringify(history))*/}
                           <Grid container direction="column" spacing={1}>
                                <Grid item style={{marginBottom: '2%'}}>                
                                    <Typography variant="title" color="secondary.200" >
                                        {history.user.username + ': '}
                                    </Typography>
                                    <Typography variant="subheading">
                                        {history.message}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    );
                })}
            </Grid>
      
    );
};

ChartHistory.propTypes = {
    theme: PropTypes.object,
    data: PropTypes.array,
    user: PropTypes.object
};

export default ChartHistory;
