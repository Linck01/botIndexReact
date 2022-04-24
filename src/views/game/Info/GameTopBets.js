import React from 'react';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Grid, Table, Typography,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, } from '@material-ui/core';

import fct from '../../../utils/fct.js';
import UserCountCard from '../../../ui-component/cards/UserCountCard';

import { gridSpacing } from '../../../store/constant';

import GameContext from '../../../contexts/GameContext';
// assets

import AccountCircleTwoTone from '@material-ui/icons/AccountCircleTwoTone';

import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import EmojiEventsTwoToneIcon from '@material-ui/icons/EmojiEventsTwoTone';

//===========================|| WIDGET STATISTICS ||===========================//

const WidgetStatistics = (props) => {
    const theme = useTheme();
    const { game } = React.useContext(GameContext);
    const { topBets } = props;

    return (
        <>
        {topBets.length > 0 ? (
            <>
            <Typography variant="h3">Highest Pot Bets.</Typography><br />
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Title</TableCell>
                            <TableCell align='center'>{game.currencyName} In Pot</TableCell>
                            <TableCell align='center'>Created at</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {topBets.map((bet, index) => (
                            <TableRow hover key={bet.id}>
                                <TableCell align='center'>{bet.title}</TableCell>
                                <TableCell align='center'>{parseFloat(bet.inPot.$numberDecimal).toFixed(2)}</TableCell>
                                <TableCell align='center'>{fct.formatDateTime(bet._createdAt)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> 
            </>     
        ) : ''}

        {/*topBets.length == 0 ? (
            <>  
            <br />
            <Grid container direction="column" spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h3">No Bets to show.</Typography>
                </Grid>
            </Grid>
            </>
        ) : ''*/}
        </>        
            
    );
};

export default WidgetStatistics;
