import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fct from '../../utils/fct.js';
import { makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

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
    const [stakedIntervals, setStakedIntervals] = React.useState([]);

    useEffect(() => {
        let myTipsInInterval;
        const tmpStakedIntervals = [];
        for (let i = 0; i < bet.scale_answers.length;i++) {
            myTipsInInterval = myTips.filter((t) => {
                const isBigger = parseFloat(t.answerDecimal.$numberDecimal) >= parseFloat(bet.scale_answers[i].from.$numberDecimal);

                if (bet.scale_answers[i+1])
                    return isBigger && parseFloat(t.answerDecimal.$numberDecimal) < parseFloat(bet.scale_answers[i+1].from.$numberDecimal);
                else {
                    return isBigger;
                }
            });
            
            tmpStakedIntervals.push(myTipsInInterval.reduce( function(a, b) {
                return a + parseFloat(b.currency.$numberDecimal);
            }, 0));

            setStakedIntervals(tmpStakedIntervals);
        }
    }, [myTips]);

    return (
        <>
            {/*}<PerfectScrollbar className={classes.ScrollHeight}>{*/}
                
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Interval</TableCell>
                            <TableCell align='center'>Odds</TableCell>
                            <TableCell align='center'>Members</TableCell>
                            <TableCell align='center'>In pot</TableCell>
                            <TableCell align='center'>Staked</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bet.scale_answers.map((interval, index) => (
                            <TableRow hover key={interval._id}>
                                <TableCell align='center'>{'>'} {interval.from.$numberDecimal}</TableCell>
                                <TableCell align='center'>{+parseFloat(fct.getActualOdds(bet)[index]).toFixed(2)}</TableCell>
                                <TableCell align='center'>{interval.memberCount}</TableCell>
                                <TableCell align='center'>{+parseFloat(interval.inPot.$numberDecimal).toFixed(2)}</TableCell>
                                <TableCell align='center'> {+parseFloat(stakedIntervals[index]).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            
            {/*}</PerfectScrollbar>{*/}
        </>
    );
};

export default ScaleAnswerBox;
