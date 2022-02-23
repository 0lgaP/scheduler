import React from 'react';
import "components/Appointment/styles.scss";


export default function Appointment(props) {
  const message = (props.time ? `Appointment at ${props.time}` : `No Appointments`)
  return (
    <article className="appointment">
      {message}
    </article>
  );
} 