import React from 'react';
import fct from '../../utils/fct.js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';



const CatalogueAnswerBox = ( props ) => {
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
                                <TableCell align='center'>{+parseFloat(answer.baseOdds.$numberDecimal).toFixed(2)}</TableCell>
                                {bet.dynamicOdds ? <TableCell align='center'>{+parseFloat(answer.currentOdds.$numberDecimal).toFixed(2)}</TableCell> : ''}
                                <TableCell align='center'>{answer.memberCount}</TableCell>
                                <TableCell align='center'>{+parseFloat(answer.inPot.$numberDecimal).toFixed(2)}</TableCell>
                                <TableCell align='center'>
                                    {myTips.filter((t) => t.answerId === index).length === 1 ? +parseFloat(myTips.filter((t) => t.answerId === index)[0].currency.$numberDecimal).toFixed(2) : '0'}
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
