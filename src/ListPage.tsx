import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Button } from '@mui/material';

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

  const [sortingMenu, showSortingMenu] = useState('');

  useEffect(()=>{
    fetch('http://localhost:5258/api/Record/all')
    .then(result=>{result.json()
      .then(records=>{
        // records.sort((a: dataInterface, b: dataInterface)=>{a.calories - b.calories});
        console.log(records)
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

  function sortData(order: string){
    let temp: dataInterface[];
    if(sortingMenu == 'calories'){
      if(order == 'asc'){
        temp  = data.sort((a: dataInterface, b:dataInterface)=>{return a.calories - b.calories});
        setData(temp.slice(0,1))
        setTimeout(() => {
        setData(temp);
          
        }, 10);
      }
      if(order == 'dsc'){
        temp  = data.sort((a: dataInterface, b:dataInterface)=>{return b.calories - a.calories});
        setData(temp.slice(0,1))
        setTimeout(() => {
        setData(temp);
          
        }, 10);
      }
    } else{
      new Date('2013-05-23');
      if(order == 'asc'){
        temp  = data.sort((a: dataInterface, b:dataInterface)=>{return new Date(a.date).valueOf() - new Date(b.date).valueOf()});
        setData(temp.slice(0,1))
        setTimeout(() => {
        setData(temp);
          
        }, 10);
      }
      if(order == 'dsc'){
        temp  = data.sort((a: dataInterface, b:dataInterface)=>{return new Date(b.date).valueOf() - new Date(a.date).valueOf()});
        setData(temp.slice(0,1))
        setTimeout(() => {
        setData(temp);
          
        }, 10);
      }
    }
    showSortingMenu('');
  }

  return (
    <>
      {data.length != 0 ? <div>
        {sortingMenu!= '' ?
          <div className='sortingMenuOverlay' onClick={(e)=>{if((e.target as HTMLElement).classList.contains('sortingMenuOverlay')){showSortingMenu('')}}}>
            <div className='sortingMenu'>
              <h6>How do you want data to be sorted?</h6>
              <p>Sorting by {sortingMenu}</p>
              <div className='sortingMenu-buttons'>
                <Button onClick={()=>{sortData('asc')}}>Asc</Button>
                <Button onClick={()=>{sortData('dsc')}}>Dsc</Button>
              </div>
            </div>
          </div>
         : null}
        <TableContainer component={Paper} style={{maxHeight:'400px'}}>
          <Table aria-label="food tracking table" className='ListPage-table' stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Date<ArrowRightIcon style={{marginBottom:'-5px'}} onClick={(e)=>{showSortingMenu('date')}}/>
                </StyledTableCell>
                <StyledTableCell align="left">Calories<ArrowRightIcon style={{marginBottom:'-5px'}} onClick={(e)=>{showSortingMenu('calories')}}/>
                </StyledTableCell>
                <StyledTableCell align="right">Id in database</StyledTableCell>
              </TableRow>
            </TableHead>

              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id} onClick={()=>{document.location.href = `details/${row.id}`}} className='ListPage-tableRow'>
                    <StyledTableCell component="th" scope="row">{row.date}</StyledTableCell>
                    <StyledTableCell align="left">{row.calories}</StyledTableCell>
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