import React from 'react'
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SubCard from '../../../ui-component/cards/SubCard';
import SecondaryAction from '../../../ui-component/cards/CardSecondaryAction';

import makeData from './makeData'
const data = makeData(25);


  // style constant
  const useStyles = makeStyles({
    root: {
        width: '100%',
        overflow: 'hidden'
    },
    container: {
        
    }
});



const columns = 
     [
      {
        Header: 'Username',
        columns: [
            {
                Header: 'First Name',
                accessor: 'firstName',
            }
        ]
      },
      {
        Header: 'Honor',
        columns: [
            {
                Header: 'Last Name',
                accessor: 'lastName',
            }
        ]
      },
    ];

function StickyHeadTable({}) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  )

  const classes = useStyles();


  // Render the UI for your table
  return (
    <>
        <SubCard content={false}>
            <TableContainer className={classes.container}>
                <Table  stickyHeader aria-label="sticky table">
                    <TableHead>
                       
                        <TableRow>
                                {columns.map((column) => (
                                    <TableCell sx={{ py: 1.5 }} key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                        {column.Header}
                                    </TableCell>
                                ))}
                        </TableRow>
                      
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            console.log(row);
                            prepareRow(row)
                            return (
                            <TableRow  sx={{ py: 1 }} hover role="checkbox" tabIndex={-1}>
                                {row.cells.map(cell => {
                                    if (cell.value)
                                        return <TableCell>{cell.render('Cell')}</TableCell>
                                })}
                            </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </SubCard>
        <br />
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination" style={{width:'100%', textAlign: 'center'}}>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <br />
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        
        
        {/*}
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
          {*/}
      </div>
    </>
  )
}

export default StickyHeadTable
