import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";  
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
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
    // setState( {...state, appointments})
      axios.put(`/api/appointments/${id}`, { interview })
      .catch((error)=> console.log(error))
      setState(prev => ({ ...prev, appointments }));
  };

  async function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    axios.delete(`/api/appointments/${id}`)
    .then(()=>setState({...state, appointments}))
    .catch(error=>console.log(error))
    
  }

  const setDay = day => setState({...state, day});
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
  })
}, [])


  const appointmentArray = getAppointmentsForDay(state, state.day)
  const interviewerArray = getInterviewersForDay(state, state.day)

  const schedule = appointmentArray.map((appointment) => {
    const interview = getInterview(state, appointment.interview)
  
    return <Appointment 
    key={appointment.id}
    id={appointment.id}
    time={appointment.time}
    interview={interview}
    interviewers={interviewerArray}
    bookInterview={bookInterview}
    cancelInterview={cancelInterview}
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
