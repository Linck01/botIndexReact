import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,  } from '@material-ui/core';

import GameContext from '../../../contexts/GameContext';
//import useAuth from '../../../hooks/useAuth';
// assets
import fct from '../../../utils/fct.js';
import MemberTableRow from './MemberTableRow';

// style constant
const useStyles = makeStyles((theme) => ({
    aaa: {
       
    }
}));

//==============================|| UI TIMELINE - CUSTOMIZED ||==============================//

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
