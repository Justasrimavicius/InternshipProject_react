import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function ListPage(props: any) {

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
  
  function createData(date: string, calories: number, protein: number, carbs: number, fat: number){
    return { date, calories, protein, carbs, fat };
  }
  
  const rows = [
    createData('2023-01-05', 4000, 200, 500, 70),
    createData('2023-01-04', 3900, 177, 477, 81),
    createData('2023-01-03', 2620, 160, 440, 60),
    createData('2023-01-02', 3001, 122, 122, 130),
    createData('2023-01-01', 4444, 244, 442, 84),
  ];

  return (
      <div>
          <TableContainer component={Paper}>
          <Table aria-label="food tracking table" className='ListPage-table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell align="right">Calories</StyledTableCell>
                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
              </TableRow>
            </TableHead>

              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.date} onClick={()=>{document.location.href = `details/${row.date}`}} className='ListPage-tableRow'>
                    <StyledTableCell component="th" scope="row">
                        {row.date}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.calories}</StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="right">{row.protein}</StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
          </TableContainer>
          <button className='ListPage-addDataBtn'>Add data</button>
      </div>
  );
}

export default ListPage;