import React, { Component, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


export default function Details(){
    const {train_number} = useParams();
    const [data, setData] = useState([]);
    const fetchData=async()=>{
        await axios.get(`http://20.244.56.144:80/train/trains/${train_number}`,{
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
    },[])
    return(
        <>
           {
            data ?
            <div>
            <p>Train Name: {data.trainName}</p>
            <p>Train Number: {data.trainNumber}</p>
            <p>Seat Available: <br/> Sleeper: {data.seatsAvailable.sleeper} AC: {data.seatsAvailable.AC}</p>
            <p>Price: <br/>Sleeper: {data.price.sleeper}
                AC: {data.price.AC}</p>
            <p>Departure Time: <br/> {data.departureTime.Hours}:{data.departureTime.Minutes}</p>
            <p>Dealyed By:{data.delayedBy} minutes</p>
        </div>
        :
        <>No data found</>
           }
        </>
    )
}