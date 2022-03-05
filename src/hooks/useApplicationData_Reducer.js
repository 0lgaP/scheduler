import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

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
        const appointment = {
          ...state.appointments[action.id],
          interview: { ...action.interview },
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment,
        };

        return { ...state, appointments, days: action.days };
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
      let days;
      if (state.appointments[id].interview) {
        days = state.days;
      } else {
        days = updateSpots("book");
      }
      dispatch({ type: SET_INTERVIEW, days, id, interview });
    });
  }

  //Cancel interview and axios.delete (update db)
  async function cancelInterview(id) {
    return Promise.resolve(axios.delete(`/api/appointments/${id}`)).then(() => {
      const days = updateSpots();
      dispatch({ type: SET_INTERVIEW, id, days, interview: null });
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
