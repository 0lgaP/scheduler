import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
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
    transition(SAVING);
    Promise.resolve(props.bookInterview(id, interview))
    .then(() => {
      console.log("SOMETHING");
      transition(SHOW)
    })
    .catch(error => transition(ERROR_SAVE, true))
  }

  function destroy(){
    
    transition(DELETE, true);
    
    Promise.resolve(props.cancelInterview(props.id))
    .then(()=> transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true))
    
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
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={()=>transition(CONFIRM)}
          onEdit={()=>transition(EDIT)}
        />
      )}
      {mode === ERROR_SAVE && (<Error message="Error while saving your changes" onClose={()=>transition(EMPTY)}/>)}
      {mode === ERROR_DELETE && (<Error message="Error while deleting your interview" onClose={()=>transition(SHOW)}/>)}

      {mode === SAVING && (<Status message="Saving"/>)}
      {mode === DELETE && (<Status message="Deleting"/>)}
      {mode === CONFIRM && ( <Confirm message="You sure hun?" onConfirm={destroy} onCancel={() => back()}/>)}
    </article>
  );
}
