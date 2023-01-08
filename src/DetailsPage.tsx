import React from 'react';
import {useParams} from 'react-router-dom';
import { useEffect } from 'react';
function DetailsPage() {
    const date = useParams();

    useEffect(()=>{
        console.log(date);
    },[])
    return (
        <div className='DetailsPage'>
            <button className='DetailsPage-goBackBtn'></button>
        </div>
    );
}

export default DetailsPage;