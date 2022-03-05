/**
 *
 * @param {{}} state
 * @param {""} dayName
 * @returns {Array}
 */

export function getAppointmentsForDay(state, dayName) {
  const dayObj = state.days.find((day) => day.name === dayName);
  if (!dayObj || !dayObj.appointments) {
    return [];
  }

  const appointmentsArray = dayObj.appointments;
  const resultArray = appointmentsArray.map(
    (appointment) => state.appointments[appointment]
  );
  return resultArray;
}

/**
 *
 * @param {{}} state
 * @param {{}} interview
 * @returns {{Object}}
 */

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  return {
    ...interview,
    interviewer,
  };
}

/**
 *
 * @param {{}} state
 * @param {""} dayName
 * @returns {Array}
 */
export function getInterviewersForDay(state, dayName) {
  const dayObj = state.days.find((day) => day.name === dayName);
  if (!dayObj || !dayObj.interviewers) {
    return [];
  }

  const interviewerArray = dayObj.interviewers;
  const resultArray = interviewerArray.map(
    (interviewer) => state.interviewers[interviewer]
  );
  return resultArray;
}
