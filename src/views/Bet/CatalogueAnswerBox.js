import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import fct from '../../utils/fct.js';
import config from '../../config';
import { SNACKBAR_OPEN } from '../../store/actions';
import SubCard from '../../ui-component/cards/SubCard';
import { Button, Box, CardMedia, Grid, Stack, Switch, Typography, makeStyles, Pagination, CircularProgress, Divider, TextField, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, 
    CardActions,
    CardContent,
     } from '@material-ui/core';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';
import MainCard from '../../ui-component/cards/MainCard';
import PerfectScrollbar from 'react-perfect-scrollbar';

// material-ui

//-----------------------|| CUSTOM DATETIME ||-----------------------//

const useStyles = makeStyles((theme) => ({
    btnTable: {
        borderRadius: '4px',
        paddingLeft: '4px',
        paddingRight: '4px',
        width: '100%',
        minWidth: '120px',
        '&:hover': {
            background: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            color: '#fff'
        }
    }
}));


const CatalogueAnswerBox = ( props ) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { bet, myTips } = props;

    return (
        <>

                {/*}<PerfectScrollbar className={classes.ScrollHeight}>{*/}
                    <TableContainer >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow >
                                    <TableCell align='center'>Title</TableCell>
                                    
                                    {bet.dynamicOdds ? <TableCell align='center'>Base Odds</TableCell> : <TableCell align='center'>Odds</TableCell>}
                                    {bet.dynamicOdds ? <TableCell align='center'>Dynamic Odds</TableCell> : ''}
                                    <TableCell align='center'>Members</TableCell>
                                    <TableCell align='center'>In pot</TableCell>
                                    <TableCell align='center'>Staked</TableCell>
                                    
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                
                                {bet.catalogue_answers.map((answer, index) => (
                                    <TableRow hover key={answer._id}>
                                        <TableCell align='center'>{answer.title}</TableCell>
                                        {bet.dynamicOdds ? <TableCell align='center'>{+parseFloat(answer.odds.$numberDecimal).toFixed(3)}</TableCell> : ''}
                                        <TableCell align='center'>{+parseFloat(fct.getActualOdds(bet)[index]).toFixed(3)}</TableCell>
                                        <TableCell align='center'>{answer.memberCount}</TableCell>
                                        <TableCell align='center'>{+parseFloat(answer.inPot.$numberDecimal).toFixed(3)}</TableCell>
                                        <TableCell align='center'>
                                            {myTips.filter((t) => t.answerId == index).length == 1 ? +parseFloat(myTips.filter((t) => t.answerId == index)[0].currency.$numberDecimal).toFixed(3) : '0'}
                                        </TableCell>
                                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                {/*}</PerfectScrollbar>{*/}
          
        </>
    );
};

export default CatalogueAnswerBox;
