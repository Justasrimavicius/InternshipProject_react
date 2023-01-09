import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useEffect, useState } from 'react';

interface dataInterface{
  calories: number,
  carbs: number,
  protein: number,
  fats: number,
  date: string,
  goalsAchieved: boolean,
  id: string
}

function ListPage(props: any) {

  const [data, setData] = useState<dataInterface[]>([]);

  useEffect(()=>{
    fetch('http://localhost:5258/api/Record/all')
    .then(result=>{result.json()
      .then(records=>{
        setData(records);
      })
    })
  },[])

  // responsiveness element for the font, in order for mobile view to look decent
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      '@media (max-width:600px)': {
        fontSize: '0.6rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '1.2rem',
      },
    },
    [`&.${tableCellClasses.body}`]: {
      '@media (max-width:600px)': {
        fontSize: '0.6rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '1.2rem',
      },
    },
  }));

  return (
    <>
      {data.length != 0 ? <div>
        <TableContainer component={Paper} style={{maxHeight:'400px'}}>
          <Table aria-label="food tracking table" className='ListPage-table' stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell align="right">Calories</StyledTableCell>
                <StyledTableCell align="right">Id in database</StyledTableCell>
              </TableRow>
            </TableHead>

              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id} onClick={()=>{document.location.href = `details/${row.id}`}} className='ListPage-tableRow'>
                    <StyledTableCell component="th" scope="row">
                        {row.date}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.calories}</StyledTableCell>
                    <StyledTableCell align="right">{row.id}</StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
        </TableContainer>
        <button className='ListPage-addDataBtn' onClick={()=>{document.location.href = 'newRecord'}}>Add data</button>
      </div> : null}
      </>
  );
}

export default ListPage;