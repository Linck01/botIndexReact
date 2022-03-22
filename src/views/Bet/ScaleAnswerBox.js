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
    },
    ScrollHeight: {
        maxHeight: '400px',
    }
}));


const ScaleAnswerBox = ( props ) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { bet, myTips } = props;
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [isLoadingSelectedIndex, setIsLoadingSelectedIndex] = React.useState(true);
    
    const stakedIntervals = [];
    let myTipsInInterval;
    for (let i = 0; i < bet.scale_answers.length;i++) {
        myTipsInInterval = myTips.filter((t) => {
            const isBigger = parseFloat(t.answerDecimal.$numberDecimal) >= parseFloat(bet.scale_answers[i].from.$numberDecimal);

            if (bet.scale_answers[i+1])
                return isBigger && parseFloat(t.answerDecimal.$numberDecimal) < parseFloat(bet.scale_answers[i+1].from.$numberDecimal);
            else {
                return isBigger;
            }
        });
        
        stakedIntervals.push(myTipsInInterval.reduce( function(a, b) {
            return a + parseFloat(b.currency.$numberDecimal);
        }, 0));
    }

    return (
        <>
               {/*}<PerfectScrollbar className={classes.ScrollHeight}>{*/}
                   
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>Interval</TableCell>
                                    <TableCell align='center'>Members</TableCell>
                                    <TableCell align='center'>In pot</TableCell>
                                    <TableCell align='center'>Staked</TableCell>
                                    
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bet.scale_answers.map((interval, index) => (
                                    <TableRow hover key={interval._id}>
                                        <TableCell align='center'>{'>'} {interval.from.$numberDecimal}</TableCell> 
                                        <TableCell align='center'>{interval.memberCount}</TableCell>
                                        <TableCell align='center'>{interval.inPot.$numberDecimal}</TableCell>
                                        <TableCell align='center'> {stakedIntervals[index]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                
                {/*}</PerfectScrollbar>{*/}
            

        </>
    );
};

export default ScaleAnswerBox;
