import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow } from '@material-ui/core';
import GameContext from '../../../contexts/GameContext';
import fct from '../../../utils/fct.js';

const useStyles = makeStyles((theme) => ({

}));

export default function CustomizedTimeline( props ) {
    const { membersPage } = props;
    const classes = useStyles();
    const { game } = React.useContext(GameContext);

    return (
        <>
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
                    {membersPage.items.map((member, index) => (
                        <TableRow hover key={member.id}>
                            <TableCell align='center'>{member.username}</TableCell>
                            <TableCell align='center'>{member.currency.$numberDecimal}</TableCell>
                            <TableCell align='center'>{fct.formatDateTime(member._createdAt)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}
