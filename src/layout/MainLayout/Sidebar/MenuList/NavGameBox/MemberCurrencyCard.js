import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography, CardHeader } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    socialHoverCard: {
        position: 'relative',
        background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.light,
        color: '#fff',
        '&:hover svg': {
            opacity: '1',
            transform: 'scale(1.1)'
        }
    },
    socialHoverCardHeader: {
        position: 'relative',
        background: theme.palette.mode === 'dark' ? theme.palette.primary.dark.main : theme.palette.primary.light,
        color: '#fff',
        '&:hover svg': {
            opacity: '1',
            transform: 'scale(1.1)'
        }
    },
}));

//===========================|| HOVER SOCIAL CARD ||===========================//

const MemberCurrencyCard = (props) => {
    const classes = useStyles();
    const { member, game } = props;

    return (
        <Card className={classes.socialHoverCard}>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="inherit">
                            {game.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="caption" color="inherit" style={{fontSize: '1.5em'}}>
                            
                        </Typography>
                        <Typography variant="caption" color="inherit" style={{fontSize: '1.5em'}}>
                            {member ? member.currency.$numberDecimal : game.startCurrency.$numberDecimal}
                        </Typography>
                        <Typography variant="caption" color="inherit" style={{fontSize: '1.5em',marginLeft:'5px'}}>
                            {game.currencyName}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

MemberCurrencyCard.propTypes = {
    member: PropTypes.object
};

export default MemberCurrencyCard;
