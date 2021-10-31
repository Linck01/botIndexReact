import * as React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';
import SecondaryAction from '../../../ui-component/cards/CardSecondaryAction';

// table columns
const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
];

// table data
function createData(name, code) {
    return { name, code };
}

const rows = [
    createData('Indiaf', 1324665171354),
    createData('Indiag', 13241556571354),
    createData('Indiah', 1324156671354),
    createData('Indiagf', 132455556171354),
    createData('Indiabcv', 13245556171354),
    createData('Indiacv', 132456171354),
    createData('Indiabv', 1324556556171354),
    createData('Indiasdd', 132554556171354),
    createData('Indiacbv', 1325465171354),
    createData('Indiavbn', 13255456171354),
    createData('Indiagbv', 13254171354),
    createData('India', 1325545171354),
    createData('Indiaxsd', 132546171354),
    createData('Indiaert', 132554671354),
    createData('Indiaz', 1325416571354),
    createData('Indiat5u', 132554176561354),
    createData('Indiaii', 1325541761354),
    createData('Indiao', 13241761354),
    createData('Indiapo', 1325416671354),
    createData('Indiauzt', 1324651671354),
    createData('Indiaew', 13241671354),
];

// style constant
const useStyles = makeStyles({
    root: {
        width: '100%',
        overflow: 'hidden'
    },
    container: {
        
    }
});

//-----------------------|| TABLE - STICKY HEADER ||-----------------------//

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <MainCard
            content={false}
            title="Members"
            secondary={<SecondaryAction link="https://next.material-ui.com/components/tables/" />}
        >
            {/* table */}
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell sx={{ py: 1.5 }} key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow sx={{ py: 1 }} hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                
                </Table>
            </TableContainer>

            {/* table pagination */}
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
}
