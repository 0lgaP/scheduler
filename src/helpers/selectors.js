/**
 * 
 * @param {{}} state 
 * @param {""} dayName 
 * @returns {Array}
 */

export function getAppointmentsForDay(state, dayName) {
  const dayObj = state.days.find((day) => day.name === dayName )  
  if (!dayObj || !dayObj.appointments){
    return [];  
  }
  const appointmentsArray = dayObj.appointments;
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
  const dayObj = state.days.find((day) => day.name === dayNAME )
  if (!dayObj || !dayObj.interviewers){
    return [];
  } 

    const interviewerArray = dayObj.interviewers;
    const resultArray = interviewerArray.map( interviewer => state.interviewers[interviewer])
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
