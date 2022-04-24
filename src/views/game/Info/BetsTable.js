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
// assets
import FastfoodIcon from '@material-ui/icons/FastfoodTwoTone';
import LaptopMacIcon from '@material-ui/icons/LaptopMacTwoTone';
import HotelIcon from '@material-ui/icons/HotelTwoTone';
import RepeatIcon from '@material-ui/icons/RepeatTwoTone';
import fct from '../../../utils/fct.js';

// style constant
const useStyles = makeStyles((theme) => ({
    aaa: {
       
    }
}));

//==============================|| UI TIMELINE - CUSTOMIZED ||==============================//

export default function CustomizedTimeline( props ) {
    const { membersPage } = props;
    const classes = useStyles();
    const { game } = React.useContext(GameContext);
    console.log('AAAAAAAAAAAAA', membersPage);
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
