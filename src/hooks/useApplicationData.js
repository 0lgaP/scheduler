import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData (initial) {

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}

});

//setState day
const setDay = day => setState({...state, day});

//updateSpots function to set days state
const updateSpots = (requestType) => {
  const days = state.days.map(day => {
    if (day.name === state.day){
      if (requestType === "book"){
        return { ...day, spots: day.spots - 1 }
      } else {
        return { ...day, spots: day.spots + 1 }
      }
    } else {
      return { ...day }
    }
  })
  return days
}


//Book interview and axios.put (update db)
async function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  // check if booking or editing & resolve accordingly
  // if "state.appointments[id].interview" exists - we are editing
  if (state.appointments[id].interview){
    return Promise.resolve(axios.put(`/api/appointments/${id}`, { interview }))
  .then(()=> {
    setState(prev => ({ ...prev, appointments}))
  }); 

  } else {
  //"state.appointments[id].interview" is null - we are booking
    return Promise.resolve(axios.put(`/api/appointments/${id}`, { interview }))
    .then(()=> {
      const days = updateSpots("book")
      setState(prev => ({ ...prev, appointments, days }))
    }); 
  }

};
//Cancel interview and axios.delete (update db)
async function cancelInterview(id){
  const appointment = {
    ...state.appointments[id],
    interview: null
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  return Promise.resolve(axios.delete(`/api/appointments/${id}`))
  .then(()=>{
    const days = updateSpots()
    setState({...state, appointments, days})})

  
  
}

useEffect(() => {
  
  Promise.all([
    axios.get("/api/days"),
    axios.get("/api/appointments"),
    axios.get("/api/interviewers")
  ]).then((all)=>{
    setState(prev => ({
      ...prev,
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data
    }));
  });
}, []);

  return {state, setDay, bookInterview, cancelInterview}

}