import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";  
import { getAppointmentsForDay } from "helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];
export default function Application() {
  //THIS IS REPLACED BY:
  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState("Monday");
  //THIS REPLACEMENT:
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
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

const dailyAppointments = [state.days, state.appointments]

console.log("DAILY APPS", dailyAppointments)

  const appointmentArray = getAppointmentsForDay(state, state.day)
  console.log("GETEM", appointmentArray)
  const schedule = appointmentArray.map((appointment) => {
    console.log("APPOINTMENT", appointment)
    return <Appointment key={appointment.id}
    {...appointment} />
    
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
