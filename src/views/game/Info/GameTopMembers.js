import React from 'react';
import { Table, Typography, TableBody, TableCell, TableContainer,
    TableHead, TableRow } from '@material-ui/core';
import fct from '../../../utils/fct.js';
import GameContext from '../../../contexts/GameContext';

const WidgetStatistics = (props) => {
    const { game } = React.useContext(GameContext);
    const { topMembers } = props;

    return (
        <>
        {topMembers.length > 0 ? (
            <>
            <Typography variant="h3">Top Members</Typography><br />
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Title</TableCell>
                            <TableCell align='center'>{game.currencyName}</TableCell>
                            <TableCell align='center'>Playing since</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {topMembers.map((member, index) => (
                            <TableRow hover key={member.id}>
                                <TableCell align='center'>{member.username}</TableCell>
                                <TableCell align='center'>{parseFloat(member.currency.$numberDecimal).toFixed(2)}</TableCell>
                                <TableCell align='center'>{fct.formatDateTime(member._createdAt)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </>
         ) : ''}

        {/*topMembers.length == 0 ? (
            <>  
            <br />
            <Grid container direction="column" spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h3">No Members to show.</Typography>
                </Grid>
            </Grid>
            </>
        ) : ''*/}

         </>
    );
};

export default WidgetStatistics;
