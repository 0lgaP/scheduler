import { useState, useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData () {

// const [state, setState] = useState({
//   day: "Monday",
//   days: [],
//   appointments: {},
//   interviewers: {}

// });

const[state, dispatch] = useReducer(reducer, null );

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  
  switch (action.type) {
    case SET_DAY:
      return { state.day}
      case SET_APPLICATION_DATA:
        return { state.days, state.appointments}
        case SET_INTERVIEW: {
          return /* insert logic */
        }
        default:
          throw new Error(
            `Tried to reduce with unsupported action type: ${action.type}`
            );
          }
}

function set() {
  const[state, dispatch] = useReducer(reducer, null );

  return (
    dispatch({ type: SET_DAY, day });
    dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
    dispatch({ type: SET_INTERVIEW, id, interview });
    dispatch({ type: SET_INTERVIEW, id, interview: null });
  )
}


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
  }) 


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

//request db information and update state
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

//return all components
  return {state, setDay, bookInterview, cancelInterview}

}