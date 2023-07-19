import React, { useState, useEffect } from 'react'
import './Details.css';

const Details = () => {
  
    const [records, setRecords] = useState([]);

    //getting data using fetch from api
    const fetchData = () => {
        fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
        .then((response) => {
            
            if(!response.ok) throw new Error(`HTTP error - ${response.status}`);
            return response.json();
        })
        .then((json) => setRecords(json))
        .catch((error) => console.log(error))
    }

    useEffect(()=>{
        fetchData();
    },[])
  
    return (
    <> 
        <div className='container'>
           {
            //checking the length and then using map to go thru array
              records?.["features"]?.length > 0 &&
              records["features"].map((record)=>(
                <div key={record.id} className='blocks'>
                    <h1>{record.properties.title}</h1>
                    <p>{record.properties.type}</p>
                    <iframe src={`https://google.com/maps?q=${record.geometry.coordinates[1]},${record.geometry.coordinates[0]}&hl=es;&output=embed`} 
                            title={record.properties.code} 
                            width="300px" 
                            height="300px"
                            loading='lazy'
                            style={{border: "1px solid black"}}
                            >
                    </iframe>
                </div>
              ))
           }
        </div>
    </>
  )
}

export default Details