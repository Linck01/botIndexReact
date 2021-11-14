import React, {useState, useEffect, useRef, useContext} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GameContext from '../../../contexts/GameContext';
import fct from '../../../utils/fct.js';
import Accordion from './Accordion';
import { Divider, Typography, Pagination, Grid, Button, InputAdornment, OutlinedInput, CircularProgress, Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useDispatch } from 'react-redux';
// project imports
import SubCard from '../../../ui-component/cards/SubCard';
import FormDialog from './FormDialog';

import { gridSpacing } from '../../../store/constant';
import { SNACKBAR_OPEN } from '../../../store/actions';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../utils/axios';
import config from '../../../config';
// project imports
import MainCard from './../../../ui-component/cards/MainCard';
import SecondaryAction from './../../../ui-component/cards/CardSecondaryAction';

// assets
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

//-----------------------|| PROFILE 1 - PROFILE ||-----------------------//


const BetList = () => {
    const { game, socket, amIAdmin, amIMod, betPage, setBetPage } = useContext(GameContext);
    const [isLoadingBets, setIsLoadingBets] = useState(true);
    const { user } = useAuth();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const getBets = async () => {
        setIsLoadingBets(true);

        try {
            const response = await axios.get(config.apiHost + '/v1/bets/', { params: { gameId: game.id, sortBy: 'createdAt', limit: 10 , page: page } });

            //setMaxPage(response.data.totalPages);
            console.log(response);
            await fct.sleep(1000);
            setBetPage(response.data.results);
        } catch (e) {
            console.log(e);
            
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: e.message,
                variant: 'alert',
                alertSeverity: 'error',
                close: true
            });
        }

        setIsLoadingBets(false);
    }

    const handlePageChange = async (a,b,c) => {
        console.log(a,b,c);
        setPage(b);
    }

    useEffect(() => {
        getBets();
    }, [page]);

    return (
        <>
        
          
        {isLoadingBets ? (
            <>
            <br />
            <Grid container justifyContent="center">
                <CircularProgress color="secondary" size="10em"  />
            </Grid>
            <br /><br />
            </>
        ) : ''} 
        
        {!isLoadingBets ? (
            <>
            <Accordion bets={betPage} toggle /><br /><br />
            <Grid container direction="column" spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Pagination page={page} onChange={handlePageChange} count={maxPage} color="primary" />
                </Grid>
            </Grid>
            <br /><br />
            </>
        ) : ''}

        
        {!isLoadingBets ? (
        <>
        
        </>
        ) : ''}
        
        {(amIAdmin || amIMod) ? (
            <>  
                <Grid container justifyContent="center">
                    <FormDialog getBets={getBets}/>
                </Grid>
                <br /><br />
            </>
        ) : ''}    

        </>
    );
};
/*
// style constant
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset'
        }
    }
});

<MainCard content={false} >
<TableContainer>
    <Table aria-label="collapsible table">
        <TableHead>
            <TableRow>
                
                
                <TableCell align="center">Dessert </TableCell>
                <TableCell align="center">Calories</TableCell>
                <TableCell align="right" sx={{ pl: 3 }} />
                
            </TableRow>
        </TableHead>
        <TableBody>
            {!isLoadingBets ? betPage.map((bet) => (
                <Row key={bet.id} bet={bet} />
            )) : ''}
        </TableBody>
    </Table>
</TableContainer>
</MainCard>          


function Row(props) {
    const theme = useTheme();
    const { bet } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow hover className={classes.root} onClick={() => setOpen(!open)}>
                
             
                <TableCell align="center">{bet.title}</TableCell>
                <TableCell align="center">{bet.createdAt}</TableCell>
                <TableCell align="right" sx={{ pl: 3 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <TableContainer>
                                <SubCard
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                    title="History"
                                    content={false}
                                >
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Customer</TableCell>
                                                <TableCell align="right">Amount</TableCell>
                                                <TableCell align="right">Total price ($)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          
                                        </TableBody>
                                    </Table>
                                </SubCard>
                            </TableContainer>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
*/
export default BetList;
