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

  function save(name, interviewer) {
    const id = props.id;
    const interview = {
      student: name,
      interviewer,
    };
    console.log("Saving?")
    transition(SAVING);
    props.bookInterview(id, interview)
    .then(() => {
      console.log("SOMETHING");
      transition(SHOW);
    })
    .catch((error)=>console.log(error))

    // console.log(interview)
  }
  // const renderInterview = (props.interview ?
  // <Show student={props.interview.student}
  //       interviewer={props.interview.interviewer.name}/> : <Empty/>);
  console.log("INTERVIEWRES ARRAY IN INTDEX", props.interviewers)
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
