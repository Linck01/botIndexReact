import React from 'react';
import { Table, Typography, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, } from '@material-ui/core';
import fct from '../../../utils/fct.js';
import GameContext from '../../../contexts/GameContext';

const WidgetStatistics = (props) => {
    const { game } = React.useContext(GameContext);
    const { topBets } = props;

    return (
        <>
        {topBets.length > 0 ? (
            <>
            <Typography variant="h3">Highest Pot Bets</Typography><br />
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
