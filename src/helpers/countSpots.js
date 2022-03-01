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

function getAppointmentsForDay(state, dayName) {
  const dayNames = state.days.filter((day) => day.name === dayName )  
  if (!dayNames.length){
    return [];  
  }
  const appointmentsArray = dayNames[0].appointments;
  const resultArray = appointmentsArray.map( appointment => state.appointments[appointment])
  return resultArray;
}

const countSpots = (state, day) => {
  const currentDay = state.days.find((dayItem) => dayItem.name === day);
  const appointmentIds = currentDay.appointments;

  const interviewsForTheDay = appointmentIds.map(
    (id) => state.appointments[id].interview
  );

  const emptyInterviewsForTheDay = interviewsForTheDay.filter((interview) => !interview);
  const spots = emptyInterviewsForTheDay.length;

  return spots;
};

console.log(getAppointmentsForDay(state, "Monday"))
console.log(countSpots(state, "Monday"))