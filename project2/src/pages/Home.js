import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

function Home(){
    const navigate=useNavigate();
    const [data, setData]=useState([]);
    const fetchData=async()=>{
        await axios.get(`http://20.244.56.144:80/train/trains`,{
            headers:{
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI1MTQ1NDIsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiMTRkMzQ1YjAtYWQ1Zi00NjM5LTgyMjQtODU5ZDI2ZjEyOThjIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IkE2MDIwNTYyMjAwMTgifQ._AhB3kbaSTxqi4_gY9A6fAkwr02PsNW5Jlgj2iZwQfU`
            }
        }).then(res=>{
            console.log(res.data);
            if(res && res.data){
                setData(res.data);
            }
        }).catch(err=>{
            alert('Something went wrong');
        })
    }

    useEffect(()=>{
        fetchData();
    },[]);      
    
    const details=(train_number)=>{
        navigate(`/details/${train_number}`)
    }
     
 return(
    <>
    {
        data && data.length ?
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Train Name</TableCell>
              <TableCell align="right">Train Number</TableCell>
              <TableCell align="right">Seat Available</TableCell>
              <TableCell align="right">Prize</TableCell>
              <TableCell align="right">Departure Time</TableCell>
              <TableCell align="right">Delayed By</TableCell>
              <TableCell align="right">
                Details
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.trainName}
                </TableCell>
                <TableCell align="right">{row.trainNumber}</TableCell>
                <TableCell align="right">Sleeper: {row.seatsAvailable.sleeper} AC: {row.seatsAvailable.AC}</TableCell>
                <TableCell align="right">Sleeper: {row.price.sleeper}
                    AC: {row.price.AC}
                </TableCell>
                <TableCell align="right">{row.departureTime.Hours}:{row.departureTime.Minutes}</TableCell>
                <TableCell align="right">{row.delayedBy} minutes</TableCell> 
                <TableCell align="right"><button onClick={()=>{details(row.trainNumber)}}>Details</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      :
      <></>
    }
 </>
 )   
}

export default Home;