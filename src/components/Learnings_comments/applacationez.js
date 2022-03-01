import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";  
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application() {
  //THIS IS REPLACED BY:
  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState("Monday");
  //THIS REPLACEMENT:
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });
  //async will ensure that this fucntion is considered async by the code
  async function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState( {...state, appointments})
    //Make the request with the correct endpoint using the appointment id, with the interview data in the body
      console.log("anythin")
      axios.put(`/api/appointments/${id}`, { interview })
      .then((data)=>{console.log("OTTER", data)})
      .catch((error)=> console.log(error))
      setState(prev => ({ ...prev, appointments }));

    // console.log(id, interview)
  };

  const setDay = day => setState({...state, day});
  // const setDays = days => setState(prev => ({ ...prev, days }));
  //THIS IS REPLACED BY:
  // useEffect(() => {
  //   axios.get("/api/days")
  //   .then((response)=>{
    //     console.log(...response.data)
    //     setDays([...response.data])
    //   })
    // }, [])
    //THIS REPLACEMENT:
    useEffect(() => {
      
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all)=>{
      // console.log("ALLZERO",all[0])
      // console.log("ALLONE",all[1])
      // console.log("ALLTWO",all[2])
      setState(prev => ({
      ...prev,
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data
      
      
    }));
  })
}, [])

// const dailyAppointments = [state.days, state.appointments]

// console.log("DAILY APPS", dailyAppointments)

  const appointmentArray = getAppointmentsForDay(state, state.day)
  const interviewerArray = getInterviewersForDay(state, state.day)
  // console.log("APPOINTMENT ARRAY", appointmentArray)
  console.log("INTERVIEWRES ARRAY", interviewerArray)

  const schedule = appointmentArray.map((appointment) => {
    // console.log("APPOINTMENT", appointment)
    const interview = getInterview(state, appointment.interview)
  
    return <Appointment 
    key={appointment.id}
    id={appointment.id}
    time={appointment.time}
    interview={interview}
    interviewers={interviewerArray}
    bookInterview={bookInterview}
    />
    
  })

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  value={state.day}
  setDay={setDay}

/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      {schedule}
      <Appointment key='last' time='5pm' />
      </section>
    </main>
  );
}


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