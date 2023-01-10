import React from 'react';
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Checkbox } from '@mui/material';

interface fieldInterface{
    calories: number,
    protein: number,
    fats: number,
    carbs: number,
    id: string,
    date: string,
    goalsAchieved: boolean
}

function DetailsPage() {
    const params = useParams();
    const [field, setField] = useState<fieldInterface | null>(null);

    useEffect(()=>{
        fetch(`http://localhost:5258/api/Record/${params.id}`)
          .then((response)=>{
            response.json()
              .then((finalData)=>{
                console.log(`GET(single Record) for id ${params.id} response is:`);
                console.log(finalData);
                setField(finalData);
              })
          })
    },[])
    return (
        <div className='DetailsPage'>
            {field !== null ? 
            <div className='DetailsPage-dataParentDiv'>
                <div className='DetailsPage-dataExplanation'>
                    <strong>Date</strong>
                    <strong>Id in Database</strong>
                    <strong>Calories</strong>
                    <strong>Protein</strong>
                    <strong>Fats</strong>
                    <strong>Carbs</strong>
                    <strong>Was the goal achieved?</strong>
                </div>
                <div className='DetailsPage-detailedData'>
                    <strong>{field.date}</strong>
                    <strong>{field.id}</strong>
                    <strong>{field.calories}</strong>
                    <strong>{field.protein}</strong>
                    <strong>{field.fats}</strong>
                    <strong>{field.carbs}</strong>
                    <Checkbox checked={field.goalsAchieved} disabled style={{padding:'0px'}}/>
                </div> 
            </div>
            : null}
            <button className='backToListPageBtn' onClick={()=>{document.location.href = '/'}}>Go back</button>
        </div>
    );
}

export default DetailsPage;