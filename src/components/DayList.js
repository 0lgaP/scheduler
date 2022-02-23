import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props){

  const days = props.days;
  const parsedDayListItem = days.map(day => <DayListItem 
                                              key={day.id} 
                                              {...day} 
                                              setDay={()=>props.onChange(day.id)} 
                                              selected={props.value === day.name} 
                                              />)
  return (
    <ul>
      {parsedDayListItem}
    </ul>
  );
}