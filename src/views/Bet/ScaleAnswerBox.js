import React, { useEffect } from 'react';
import fct from '../../utils/fct.js';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';


const ScaleAnswerBox = ( props ) => {
    const { bet, myTips } = props;
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
                            {bet.dynamicOdds ? <TableCell align='center'>Base Odds</TableCell> : <TableCell align='center'>Odds</TableCell>}
                            {bet.dynamicOdds ? <TableCell align='center'>Dynamic Odds</TableCell> : ''}
                            <TableCell align='center'>Members</TableCell>
                            <TableCell align='center'>In pot</TableCell>
                            <TableCell align='center'>Staked</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bet.scale_answers.map((interval, index) => (
                            <TableRow hover key={interval._id}>
                                <TableCell align='center'>{'>'} {interval.from.$numberDecimal}</TableCell>
                                
                                <TableCell align='center'>{+parseFloat(interval.baseOdds.$numberDecimal).toFixed(2)}</TableCell>
                                {bet.dynamicOdds ? <TableCell align='center'>{+parseFloat(interval.currentOdds.$numberDecimal).toFixed(2)}</TableCell> : ''}
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
