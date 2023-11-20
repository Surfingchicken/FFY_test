import { TextField } from '@mui/material';
import {TimeClock} from '@mui/x-date-pickers';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { format, startOfToday, getHours, getMinutes, setHours, setMinutes } from 'date-fns';
import React from 'react';
import { useState } from 'react';

    
export default function HourPicker() {
    let today = startOfToday();
    const [selectedTime, setSelectedTime] = useState(today);
    const [modalH, setModalH] = useState(false);

    const toggleModalH = () => {
        setModalH(!modalH);
    }
    const hourValue = getHours(selectedTime);
    const minValue = getMinutes(selectedTime)
    return (
        <div className='HourPicker'>
            <button onClick={toggleModalH}>
                {format(selectedTime,'hh:mm')}
            </button>
            
            {modalH && 
            <div className='Clock'>
                <label>SELECT TIME</label>
                <div className='HourInput'>
                    <TimeField
                        label=""
                        className='CentralC'
                        value={hourValue}
                        onChange={(newValue) => setSelectedTime(setHours(selectedTime,newValue))}
                        format="h"
                    />
                    <div className='Separator'>:</div>
                    <TimeField
                        label=""
                        className='CentralC'
                        value={minValue}
                        onChange={(newValue) => setSelectedTime(setMinutes(selectedTime,newValue))}
                        format="mm"
                    />                    
                    <div className='AMPM'>
                        <button>AM</button>
                        <button>PM</button>
                    </div>
                </div>
                <div>
                    <TimeClock 
                    label='TimePicker'
                    rendenerInput={(params)=><TextField {...params}/>}
                    value={selectedTime}
                    onChange={(newValue) => setSelectedTime(newValue)}
                    />
                    <div className='ButtonClock'>
                        <button onClick={toggleModalH}>Cancel</button>
                        <button>ok</button>
                    </div>
                </div>

                
            </div>
                }
        </div>
    )
}