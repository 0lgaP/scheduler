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
      console.log("ALLZERO",all[0])
      console.log("ALLONE",all[1])
      console.log("ALLTWO",all[2])
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
  // const interviewerArray = getInterviewersForDay(state, state.day)

  const schedule = appointmentArray.map((appointment) => {
    // console.log("APPOINTMENT", appointment)
    const interview = getInterview(state, appointment.interview)
  
    return <Appointment 
    key={appointment.id}
    id={appointment.id}
    time={appointment.time}
    interview={interview}
    interviewers={getInterviewersForDay(state, state.day)}
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
