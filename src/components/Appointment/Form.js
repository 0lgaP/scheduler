import React, {useState} from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';


export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  // console.log("Interviewer:", interviewer)
  const reset = () => {
    setStudent("");
    setInterviewer(null)
  }
  const cancel = () => {
    reset();
    //WHY?? how?? what???????????????????
    props.onCancel();
  }

 return(  
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off"
      >
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder={student}
          onChange={(event) => setStudent(event.target.value)}
          // onCancel={cancel}
        />
      </form>
      <InterviewerList 
        interviewers={props.interviewers}
        value={interviewer}
        // NO!!! onChange={()=> setInterviewer(props.value = props.interviewers.id)}
        onChange={setInterviewer}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={()=>{cancel()}}>Cancel</Button>
        <Button confirm onClick={() => {props.onSave(student, interviewer)}}>Save</Button>
      </section>
    </section>
  </main>
  );
}
// cancel !== cancel()

// cancel() !== ()=>{cancel()}
// how to pass functions with components
// if you invoke function without wrapper it will run the function on the render