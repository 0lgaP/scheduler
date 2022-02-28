/* VARIABLES
const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};

function getInterviewersForDay(state, dayNAME) {
  const dayName = state.days.filter((day) => (day.name === dayNAME) && day.appointments )
  //returns [ { id: 1, name: 'Monday', appointments: [ 1, 2, 3 ] } ]
  if (!dayName.length){
    return [];
  }  
  const appointmentsArray = dayName[0].appointments;
  //returns [ 1, 2, 3 ]
  const appointmentDetailsArray = appointmentsArray.filter( appointment => state.appointments[appointment].interview)
  //returns [ 3 ]
  const uniqueInterviewers = appointmentDetailsArray.map( interviewer => state.appointments[interviewer].interview)
  //returns [ { student: 'Archie Cohen', interviewer: 2 } ]
  const interviewerInfo = uniqueInterviewers.map(interviewer => interviewer.interviewer)
  //returns [ 2 ]
  const resultArray = interviewerInfo.map(person => state.interviewers[person])
  return resultArray;
}  



console.log(getInterviewersForDay(state, "Monday"))
*/


import React from 'react';

/**
 * 
 * @param {{}} state 
 * @param {""} dayName 
 * @returns {Array}
 */

export function getAppointmentsForDay(state, dayName) {
  const dayNames = state.days.filter((day) => day.name === dayName )  
  if (!dayNames.length){
    return [];  
  }
  const appointmentsArray = dayNames[0].appointments;
  const resultArray = appointmentsArray.map( appointment => state.appointments[appointment])
  return resultArray;
}

/**
 * 
 * @param {{}} state 
 * @param {{}} interview 
 * @returns {{Object}}
 */


export function getInterview(state, interview){
  if(!interview) {
    return null;  
  }
  const interviewer = state.interviewers[interview.interviewer]
  return {
    ...interview,  
    interviewer
  };
}

export function getInterviewersForDay(state, dayNAME) {
  const dayName = state.days.filter((day) => day.name === dayNAME )
  if (!dayName.length){
    return [];
  }  
  const appointmentsArray = dayName[0].appointments;
  const noNullArray = appointmentsArray.filter( appointment => state.appointments[appointment].interview)
  const appointmentDetailsArray = noNullArray.map( interviewer => state.appointments[interviewer].interview)
  const interviewerId = appointmentDetailsArray.map(interviewer => interviewer.interviewer)
  const resultArray = interviewerId.map(person => state.interviewers[person])
  return resultArray;
}  


/* getAppointmentsForDay(state, "Monday") RETURNS:
____________________________________________________________________
[
  { id: 1, time: '12pm', interview: null },
  { id: 2, time: '1pm', interview: null },
  {
    id: 3,
    time: '2pm',
    interview: { student: 'Archie Cohen', interviewer: 2 }
  }  
]  
____________________________________________________________________
*/

/* getInterview(state, state.appointments["3"].interview)) RETURNS 
____________________________________________________________________ 
{
  student: 'Archie Cohen',
  interviewer: {
    id: 2,
    name: 'Tori Malcolm',
    avatar: 'https://i.imgur.com/Nmx0Qxo.png'
  }  
}  
____________________________________________________________________
*/

/* getInterviewsForDay(state, "Monday") RETURNS:
____________________________________________________________________
[
  {
    id: 2,
    name: 'Tori Malcolm',
    avatar: 'https://i.imgur.com/Nmx0Qxo.png'
  }
]
____________________________________________________________________

//REFACTORING

--> /** */ //-->> is this!!

/*
BEFORE Refactoring
export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const findByDayName = state.days.filter((each) => each.name === day )
  // returns [ { id: 1, name: 'Monday', appointments: [ 1, 2, 3 ] } ]
  if (findByDayName.length === 0){
    return [];
  }
  const findAllAppointments = {...findByDayName};
  const appointmentsArray = findAllAppointments[0].appointments;
  
  const resultArray = []; 
  appointmentsArray.forEach(element => {
    resultArray.push(state.appointments[element])
  });
  // const noNullsArray = [];
  // resultArray.forEach(obj => obj.interview ? noNullsArray.push(obj) : null)
  return resultArray;
}
AFTER Refactoring
export function getAppointmentsForDay(state, dayName) {
  //... returns an array of appointments for that day
  // name descriptively with nouns and no verbs unless function - bool -"isTrue" "canView"
  const dayNames = state.days.filter((day) => day.name === dayName )
  // returns [ { id: 1, name: 'Monday', appointments: [ 1, 2, 3 ] } ]
  
  //use !bang for opposite
  if (!dayNames.length){
    return [];
  }
  
  const appointmentsArray = dayNames[0].appointments;
  //to loop AND return an array use MAP!!!!!
  const resultArray = appointmentsArray.map( appointment => state.appointments[appointment])
  
  return resultArray;
}
*/
