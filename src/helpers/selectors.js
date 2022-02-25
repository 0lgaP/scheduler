
import React from 'react';
//--> /** */ -->> is this!!
/**
 * 
 * @param {{}} state 
 * @param {""} dayName 
 * @returns {Array}
 */
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

//Og Before Refactoring
// export function getAppointmentsForDay(state, day) {
//   //... returns an array of appointments for that day
//   const findByDayName = state.days.filter((each) => each.name === day )
//   // returns [ { id: 1, name: 'Monday', appointments: [ 1, 2, 3 ] } ]
//   if (findByDayName.length === 0){
//     return [];
//   }
//   const findAllAppointments = {...findByDayName};
//   const appointmentsArray = findAllAppointments[0].appointments;

//   const resultArray = []; 
//   appointmentsArray.forEach(element => {
//     resultArray.push(state.appointments[element])
//   });
//   // const noNullsArray = [];
//   // resultArray.forEach(obj => obj.interview ? noNullsArray.push(obj) : null)
//   return resultArray;
// }


