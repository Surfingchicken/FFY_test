import { eachDayOfInterval, endOfMonth, format, startOfToday, endOfWeek, add, startOfWeek,  isSameDay, setHours, eachHourOfInterval,startOfDay, getDay, isSameMonth } from 'date-fns';
import React from 'react';
import parse from 'date-fns/parse';
import { ReactComponent as LogoNext } from './icons/next-icon.svg';
import { ReactComponent as LogoPrev } from './icons/prev-icon.svg';
import { useState } from 'react';


export default function DayPicker() {
    let colStartClasses= [
        "",
        "col-start-2",
        "col-start-3",
        "col-start-4",
        "col-start-5",
        "col-start-6",
        "col-start-7",
    ]
    let today = startOfToday();
    const [currentMonth, setCurrentMonth] = useState(format(today,'MMMM-yyyy'));
    let firstDayOfCurrMonth = parse(currentMonth, 'MMMM-yyyy', new Date());
    let newDays = eachDayOfInterval({
    start: startOfWeek(firstDayOfCurrMonth),
    end: endOfWeek(endOfMonth(firstDayOfCurrMonth)),
  });

    const nextMonth= () => {
        let firstDayOfNextMonth = add(firstDayOfCurrMonth, {months : 1});
        setCurrentMonth(format(firstDayOfNextMonth,'MMMM-yyyy'));
        //console.log(currentMonth);
    }

    const prevMonth= () => {
        let firstDayOfNextMonth = add(firstDayOfCurrMonth, {months : -1});
        setCurrentMonth(format(firstDayOfNextMonth,'MMMM-yyyy'));
        //console.log(currentMonth);
    }
    
    const [selectedDay, setSelectedDay] = useState(today);
    const [modalD, setModalD] = useState(false);

    const toggleModalD = () => {
        setModalD(!modalD);
    }

    return(
        <div className='DayPicker'>
            <button onClick={toggleModalD}>
                {format(selectedDay,'cccc, MMMM yy')}
            </button>
            
            {modalD && <div className='CalendarContainer'>
                <div className="Calendar ModalCalendar">
                    <div className="MonthTitle ModalMonthTitle">   
                        <h2>{format(selectedDay, 'MMMM yyyy')}</h2>
                        <button type="button" className="PrevMonth" onClick={prevMonth}>
                            <LogoPrev />
                        </button>
                        <button type="button" className="NextMonth" onClick={nextMonth}>
                            <LogoNext />
                        </button>
                    </div>
                    <div className="Month">
                        <div className="DayLetter ModalDayLetter">M</div>
                        <div className="DayLetter ModalDayLetter">T</div>
                        <div className="DayLetter ModalDayLetter">W</div>
                        <div className="DayLetter ModalDayLetter">T</div>
                        <div className="DayLetter ModalDayLetter">F</div>
                        <div className="DayLetter ModalDayLetter">S</div>
                        <div className="DayLetter ModalDayLetter">S</div>

                        {newDays.map((day, dayIdx) => (
                            <div className={`Day ModalDay ${dayIdx === 0 ? colStartClasses[getDay(day)] :''}`} key={day.toString()}>
                                <button type="button" className={`${isSameMonth(day, firstDayOfCurrMonth) ? 'CurrMonth' : 'NotCurrMonth'} ${isSameDay(day, selectedDay) ? 'Selected' : ''} `}
                                onClick={()=>setSelectedDay(day)}>
                                    <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
                                </button>
                        </div>
                        ))}
                    </div>
                </div>
            </div>}
        </div>
        
    );
}