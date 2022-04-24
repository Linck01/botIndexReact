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
    const { topMembers } = props;

    return (
        <>
        {topMembers.length > 0 ? (
            <>
            <Typography variant="h3">Top Members.</Typography><br />
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
