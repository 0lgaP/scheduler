import React, {Fragment} from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';




export default function Appointment(props) {

  const renderInterview = (props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> : <Empty/>);
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {renderInterview}

    </article>
  );
} 