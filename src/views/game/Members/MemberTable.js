import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow  } from '@material-ui/core';
import GameContext from '../../../contexts/GameContext';
import MemberTableRow from './MemberTableRow';

const useStyles = makeStyles((theme) => ({

}));

export default function MemberTable( props ) {
    const { membersPage } = props;
    const classes = useStyles();
    const { game, privileges } = React.useContext(GameContext);
    //const { user } = useAuth();

    return (
        <>
        <TableContainer>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Title</TableCell>
                        <TableCell align='center'>{game.currencyName}</TableCell>
                        <TableCell align='center'>Playing since</TableCell>
                        {privileges.admin || privileges.mod ? <TableCell align='center'>Ban</TableCell> : ''}
                        {privileges.admin ? <TableCell align='center'>Mod</TableCell> : ''}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {membersPage.items.map((member, index) => (
                        <MemberTableRow member={member} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}
