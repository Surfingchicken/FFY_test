import React from 'react';
import { eachDayOfInterval, endOfMonth, format, startOfToday, endOfWeek, add, startOfWeek,  isSameDay, setHours, eachHourOfInterval,startOfDay, getDay, isSameMonth } from 'date-fns';
import parse from 'date-fns/parse';
import { ReactComponent as LogoNext } from './icons/next-icon.svg';
import { ReactComponent as LogoPrev } from './icons/prev-icon.svg';
import { ReactComponent as IconAdd } from './icons/add-icon.svg';
import { ReactComponent as IconSupp } from './icons/supp-icon.svg';
import { ReactComponent as IconCal } from './icons/calendar-icon.svg';
import { ReactComponent as IconClock} from './icons/clock-icon.svg';
import { useState } from 'react';
import ColorPicker from './ColorPicker';
import DayPicker from './DayPicker';
import HourPicker from './HourPicker';


export default function Month() {
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

    const startOfHours = setHours(startOfDay(selectedDay),9);
    const endOfHours = setHours(startOfDay(selectedDay),20);
    const newHours = eachHourOfInterval({
        start: new Date(startOfHours),
        end : new Date(endOfHours),
    })
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
    setModal(!modal);
  };

    return (
        <div className='GlobalContainer'>
            <div className='SchedulerContainer'>
                <div className='Scheduler'>
                    <div className='Title'>
                        <div>
                            <h2>{format(selectedDay, 'dd MMMM')}</h2>
                        </div>
                        <div>
                            <button onClick={toggleModal}>
                                <IconAdd/>
                            </button>
                        </div>
                    </div>
                    
                    <div className='HoursContainer'>
                        {
                            newHours.map((hours, hoursIdx) => (
                                <div className='Hour' key={hoursIdx.toString()}>
                                    <div className='Timing'>
                                        <time dateTime={format(hours, 'yyyy-MM-dd-hh')}>{format(hours, 'HH:mm')}</time>
                                    </div>
                                     <div className='Meeting'>
                                        <div className='Content'>
                                            <h3>Rendez-vous React</h3>
                                        </div>
                                        <div className='Supp'>
                                            <button>
                                                <IconSupp/>
                                            </button>
                                        </div>
                                    </div> 
                                </div>
                            ))
                        }
                    </div>
                    {modal && (
                            <div className="Modal">
                                <div className='Overlay' onClick={toggleModal}></div>
                                <div className="ModalContent" >
                                    <div className='ModalContentContainer'>
                                        <div className='ModalTitleContainer'>
                                            <input className='MeetingTitle' type='text' key='title' placeholder='Add Title'/>
                                            <ColorPicker/>
                                        </div>
                                        
                                        <div className='MeetingDay'>
                                            <IconCal/>
                                            <DayPicker/>
                                            <DayPicker/>
                                        </div>
                                        <div className='MeetingHour'>
                                            <IconClock/>
                                            <HourPicker/>
                                            <HourPicker/>
                                        </div>
                                        
                                        <input placeholder='comment' className='Commentary' type='text' key='content' />
                                        
                                        <button className='AddMeeting'>Add</button>
                                    </div>

                                </div>
                                    
                            </div>
                        )}
                </div>   
            </div>
            <div className='CalendarContainer'>
                <div className="Calendar">
                    <div className="MonthTitle">
                        <button type="button" className="PrevMonth" onClick={prevMonth}>
                            <LogoPrev />
                        </button>
                        <h2>{format(firstDayOfCurrMonth, 'MMMM yyyy')}</h2>
                        <button type="button" className="NextMonth" onClick={nextMonth}>
                            <LogoNext />
                        </button>
                    </div>

                    <div className="Month">
                        <div className="DayLetter">M</div>
                        <div className="DayLetter">T</div>
                        <div className="DayLetter">W</div>
                        <div className="DayLetter">T</div>
                        <div className="DayLetter">F</div>
                        <div className="DayLetter">S</div>
                        <div className="DayLetter">S</div>

                        {newDays.map((day, dayIdx) => (
                            <div className={`Day ${dayIdx === 0 ? colStartClasses[getDay(day)] :''}`} key={day.toString()}>
                                <button type="button" className={`${isSameMonth(day, firstDayOfCurrMonth) ? 'CurrMonth' : 'NotCurrMonth'} ${isSameDay(day, selectedDay) ? 'Selected' : ''} `}
                                onClick={()=>setSelectedDay(day)}>
                                    <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
                                </button>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>   
    );
}