import React from 'react';
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
function DetailsPage() {
    const date = useParams();


    useEffect(()=>{
        fetch(`http://localhost:5258/details/${date}`)
          .then((response)=>{
            response.json()
              .then((finalData)=>{
                console.log(finalData)
              })
        
          })
    },[])
    return (
        <div className='DetailsPage'>
            <div className='DetailsPage-detailedData'>

            </div>
            <button className='backToListPageBtn' onClick={()=>{document.location.href = '/'}}>Go back</button>
        </div>
    );
}

export default DetailsPage;