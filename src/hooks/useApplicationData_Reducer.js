import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  //updateSpots pair: findDay & countSpots

  const findDay = (appointment, days) => {
    for (const day of days) {
      if (day.appointments.includes(appointment.id)) {
        return day;
      }
    }
  };
  const countSpots = (appointments, day) => {
    const todayAppointments = day.appointments.map((id) => appointments[id]);
    const interviewsForTheDay = todayAppointments.map((a) => a.interview);
    const emptyInterviewsForTheDay = interviewsForTheDay.filter(
      (interview) => !interview
    );
    const spots = emptyInterviewsForTheDay.length;
    console.log("spots", spots);
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
        //check if interview is null, if it is don't spread it
        let appointment;
        if (!action.interview) {
          appointment = {
            ...state.appointments[action.id],
            interview: null,
          };
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
        const day = findDay(appointment, state.days);
        // recalculating the number of spots for the day
        const numSpots = countSpots(appointments, day);
        //update peramiter on day object
        day.spots = numSpots;
        //create a copy of state.days array
        const days = [...state.days];
        //overwriting the day we updated
        days[day.id - 1] = day;
        return { ...state, appointments, days };
      }

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

  //Book interview and axios.put (update db)
  async function bookInterview(id, interview) {
    return Promise.resolve(
      axios.put(`/api/appointments/${id}`, { interview })
    ).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview });
    });
  }

  //Cancel interview and axios.delete (update db)
  async function cancelInterview(id) {
    return Promise.resolve(axios.delete(`/api/appointments/${id}`)).then(() => {
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
