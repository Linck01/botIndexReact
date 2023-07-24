import * as PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { gridSpacing } from '../../../store/constant';

const ChartHistory = ({ theme, data, scrollBarEl }) => {
    // scroll to bottom when new message is sent or received
    const wrapper = useRef(document.createElement('div'));
    const el = wrapper.current;

    const scrollToBottom = useCallback(() => {
        if (scrollBarEl) scrollBarEl.scrollTop = scrollBarEl.scrollHeight;
    }, [el]);

    useEffect(() => {
        scrollToBottom();
    }, [data.length, scrollBarEl]);

    return (
        <Grid container spacing={gridSpacing} ref={wrapper}>
            {data.map((history, index) => {
                return (
                    <React.Fragment key={index}>
                        <Grid container direction="column" spacing={1}>
                            <Grid item style={{marginBottom: '2px'}}>                
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
