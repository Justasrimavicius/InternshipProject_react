import React from 'react';
import { useState, useEffect} from 'react';
import { Checkbox, Input, InputLabel, Button } from '@mui/material';

function NewRecordForm() {

    const [errorText, setErrorText] = useState('');
    const [caloriesErr, setCaloriesErr] = useState(false);
    const [proteinErr, setProteinErr] = useState(false);
    const [carbsErr, setCarbsErr] = useState(false);
    const [fatsErr, setFatsErr] = useState(false);
    const [dateErr, setDateErr] = useState(false);

    const [success, setSuccess] = useState('');

    useEffect(()=>{
        if(success != ''){
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        }
    },[success])

    function checkForm(e: any){
        const date = (document.getElementById('date') as HTMLInputElement).value;
        const calories = parseFloat((document.getElementById('calories') as HTMLInputElement).value);
        const protein = parseFloat((document.getElementById('protein') as HTMLInputElement).value);
        const carbs = parseFloat((document.getElementById('carbs') as HTMLInputElement).value);
        const fats = parseFloat((document.getElementById('fats') as HTMLInputElement).value);
        const goalsAchieved = (document.getElementById('goalsAchieved') as HTMLInputElement).checked;
        setCaloriesErr(false);
        setProteinErr(false);
        setCarbsErr(false);
        setFatsErr(false);
        setDateErr(false);
        setErrorText('');

        // date format testing - dont allow year to be more than 10000, dont allow first year number to be 0
        if(!/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(date)){
            setDateErr(true);
            setErrorText(`Date doesn't follow the pattern yyyy-mm-dd`);
            return;
        } else if(date[0] == '0'){
            setDateErr(true);
            setErrorText(`Dates first number can't be a zero`);
            return;
        }

        // for simplicity sake, dont allow any field to have a value of more than 10000
        if(calories > 10000){
            setCaloriesErr(true);
            setErrorText('Too much calories');
            return;
        } else if(protein > 10000){
            setProteinErr(true);
            setErrorText('Too much protein');
            return;
        } else if(carbs > 10000){
            setCarbsErr(true);
            setErrorText('Too much carbs');
            return;
        } else if(fats > 10000){
            setFatsErr(true);
            setErrorText('Too much fats');
            return;
        }

        // dont allow empty fields
        if(!calories && calories != 0){
            setCaloriesErr(true);
            setErrorText(`Can't leave empty fields`)
            return
        } else if(!protein && protein != 0){
            setProteinErr(true);
            setErrorText(`Can't leave empty fields`)
            return
        } else if(!carbs && carbs != 0){
            setCarbsErr(true);
            setErrorText(`Can't leave empty fields`)
            return
        } else if(!fats && fats != 0){
            setFatsErr(true);
            setErrorText(`Can't leave empty fields`);
            return;
        }

        // post request for putting a new record in the database
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `http://localhost:5258/api/Record`, true);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
        xhr.send(JSON.stringify({
            date,
            calories,
            protein,
            carbs,
            fats,
            goalsAchieved
        }));

        xhr.onload = ()=>{
            if(JSON.parse(xhr.responseText).id){ // a successful request will have an id field
                setSuccess('New record added successfully!');
            } else {
                setSuccess('An error has occured.')
            }
        }
    }

    return (
        <div className='NewRecordForm'>
            {success != '' ? <div className='overlay'><p className='successMsg'>{success}</p></div> : null}
            <form id='NewRecordForm-form'>
                <h5>Save your macronutrients of the day</h5>
                <div className='NewRecordForm-inputs'>
                    <p className='NewRecordForm-errorText'>{errorText}</p>
                    <Input placeholder='date(year-month-day)' name='date' id='date' type={'date'} className='input-label' error={dateErr}></Input>

                    <InputLabel htmlFor="calories" className='input-label'>Calories</InputLabel>
                    <Input name='calories' id='calories' type={'number'} className='input-label' error={caloriesErr}></Input>

                    <InputLabel htmlFor="protein" className='input-label'>Protein</InputLabel>
                    <Input name='protein' id='protein' type={'number'} className='input-label' error={proteinErr}></Input>

                    <InputLabel htmlFor="carbs" className='input-label'>Carbs</InputLabel>
                    <Input name='carbs' id='carbs' type={'number'} className='input-label' error={carbsErr}></Input>

                    <InputLabel htmlFor="fats" className='input-label'>Fats</InputLabel>
                    <Input name='fats' id='fats' type={'number'} className='input-label' error={fatsErr}></Input>

                    <InputLabel htmlFor='goalsAchieved'>Macronutrient goals achieved?<Checkbox id='goalsAchieved' name='goalsAchieved'></Checkbox></InputLabel>
                </div>
                <Button type='button' variant='contained' onClick={(e)=>{checkForm(e)}} style={{margin:'10px'}}>Save</Button>
            </form>
            <button className='backToListPageBtn' onClick={()=>{document.location.href = '/'}}>Go back</button>
        </div>
    );
}

export default NewRecordForm;