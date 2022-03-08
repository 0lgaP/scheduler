import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";


  const findDay = (appointment, days) => {
    for (const day of days) {
      if (day.appointments.includes(appointment.id)){
        return day
      }
    }
  }
  //updateSpots Function
  const countSpots = (appointments, day) => {
    // const currentDay = state.days.find((dayItem) => dayItem.name === day);
    // const appointmentIds = currentDay.appointments;

    const todayAppointments = day.appointments.map((id) => appointments[id])

    console.log("APPS", todayAppointments)

    const interviewsForTheDay = todayAppointments.map(
      (a) => a.interview
    );
  
    const emptyInterviewsForTheDay = interviewsForTheDay.filter((interview) => !interview);
    const spots = emptyInterviewsForTheDay.length;
    console.log("spots", spots)
    return spots;
  };

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day };

      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };

      case SET_INTERVIEW: {
        let appointment;
        if(!action.interview) {
          appointment = {
            ...state.appointments[action.id],
            interview: null 
          }
        } else {
          appointment = {
            ...state.appointments[action.id],
            interview: { ...action.interview },
          };

        }
        const appointments = {
          ...state.appointments,
          [action.id]: appointment,
        };
        //finding the day by the appointment
        const day = findDay(appointment, state.days)
        // recalculating the number of spots for the day
        const numSpots = countSpots(appointments, day)
        //update peramiter on day object
        day.spots = numSpots
        //create a copy of state.days array
        const days = [...state.days]
        //overwriting the day we updated
        days[day.id - 1] = day

        return { ...state, appointments, days};
      }

      // case SET_SPOTS: {
      //   debugger
      //   const spots = countSpots(action.state, action.state.day)
      //   return  {...state, spots: spots}
      // }

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //setState day
  const setDay = (day) => dispatch({ type: SET_DAY, day });

  //updateSpots function to set days state
  const updateSpots = (requestType) => {
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        if (requestType === "book") {
          return { ...day, spots: day.spots - 1 };
        } else {
          return { ...day, spots: day.spots + 1 };
        }
      } else {
        return { ...day };
      }
    });
    return days;
  };


  //Book interview and axios.put (update db)
  async function bookInterview(id, interview) {
    return Promise.resolve(
      axios.put(`/api/appointments/${id}`, { interview })
    ).then(() => {
      // let days;
      // if (state.appointments[id].interview) {
      //   days = state.days;
      // } else {
      //   days = updateSpots("book");
      // }

      dispatch({ type: SET_INTERVIEW, id, interview });
    });
  }

  //Cancel interview and axios.delete (update db)
  async function cancelInterview(id) {
    return Promise.resolve(axios.delete(`/api/appointments/${id}`)).then(() => {
      // dispatch({ type: SET_SPOTS, state, day: [id].name });
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    });
  }
  //request db information and update state
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

  //return all components
  return { state, setDay, bookInterview, cancelInterview };
}
