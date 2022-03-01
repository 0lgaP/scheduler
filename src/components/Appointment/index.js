import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );
    
    // console.log("PROPS.INTERVIEWRES ", props.interviewers)
    // console.log("PROPS.INTERVIEW ", props.interview)
    // console.log("PROPS ", props)

  function save(name, interviewer) {
    const id = props.id;
    const interview = {
      student: name,
      interviewer,
    };
    props.bookInterview(id, interview)
    .then(() => {
      console.log("SOMETHING");
      transition(SAVING);
      setTimeout((()=> transition(SHOW)), 500)
    })
    .catch((error)=>console.log(error))

    // console.log(interview)
  }
  // const renderInterview = (props.interview ?
  // <Show student={props.interview.student}
  //       interviewer={props.interview.interviewer.name}/> : <Empty/>);
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === SAVING && (<Status message="Saving"/>)}
    </article>
  );
}
