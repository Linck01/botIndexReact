import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,  } from '@material-ui/core';

import axios from '../../../utils/axios';
import config from '../../../config';
import { SNACKBAR_OPEN } from '../../../store/actions';
import { useDispatch } from 'react-redux';


import GameContext from '../../../contexts/GameContext';
import useAuth from '../../../hooks/useAuth';
// assets

import fct from '../../../utils/fct.js';
import { IconCrown, IconBan } from '@tabler/icons';

const useStyles = makeStyles((theme) => ({
    aaa: {
       
    }
}));

//==============================|| UI TIMELINE - CUSTOMIZED ||==============================//

export default function MemberTableRow( props ) {
    const { member } = props;
    const classes = useStyles();
    const { game, privileges } = React.useContext(GameContext);
    const theme = useTheme();
    const { user } = useAuth();
    const dispatch = useDispatch();
    const [isModerator, setIsModerator] = React.useState(member.isModerator);
    const [isBanned, setIsBanned] = React.useState(member.isBanned);

    const changeIsBanned = async () => {
        setIsBanned(!isBanned);
        await updateMember({isBanned: !isBanned});
    }

    const changeIsMod = async () => {
        setIsModerator(!isModerator);
        await updateMember({isModerator: !isModerator});
    }

    const updateMember = async (obj) => {
        //setIsLoading(true);

        try {
            const response = await axios.patch(config.apiHost + '/v1/members/' + game.id + '/' + member.userId, obj);
            console.log(response);
            //dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Successfully changed settings', 
            //    variant: 'alert', alertSeverity: 'success', close: true });

            //setIsLoading(false);
        } catch (e) { 
            //setIsLoading(false);
            return dispatch({ type: SNACKBAR_OPEN, open: true, message:  e.response ? e.response.data.message : e.toString(),
                variant: 'alert', alertSeverity: 'error', close: true });
         }
    };

    return (
        <TableRow hover key={member.id}>
            <TableCell align='center'>
                {member.isModerator || (user && game.userId == member.userId) ? <><IconCrown stroke={1.5} size="0.8rem" color={theme.palette.warning.main}/>&nbsp;</> : ''}
                {member.isBanned ? <><IconBan stroke={1.5} size="0.8rem" color={theme.palette.error.main}/>&nbsp;</> : ''}
                {member.username}
                </TableCell>
            <TableCell align='center'>{+parseFloat(member.currency.$numberDecimal).toFixed(2)}</TableCell>
            <TableCell align='center'>{fct.formatDate(member._createdAt)}</TableCell>

            {privileges.admin ?
                (<TableCell align='center'><IconBan stroke={1.5} size="1.5rem" color={isBanned ? theme.palette.error.main : theme.palette.text.primary} onClick={changeIsBanned} /></TableCell>) 
            : ''}
            {(privileges.admin || privileges.mod) ?
                (<TableCell align='center'><IconCrown stroke={1.5} size="1.5rem" color={isModerator ? theme.palette.warning.main : theme.palette.text.primary} onClick={changeIsMod}/></TableCell>)
            : ''}

        </TableRow>
    );
}
