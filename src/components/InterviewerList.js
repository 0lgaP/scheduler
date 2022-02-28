import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import "components/InterviewerList.scss";


export default function InterviewerList(props) {
console.log("THE PROPS",{...props})
  // const interviewerClass = classNames("interviewers", {
  //   "interviwers__item--selected": props.selected
  // })
  const parsedInterviewerListItem = props.interviewers.map(
    interviewer => <InterviewerListItem 
                  key={interviewer.id} 
                  {...interviewer} 
                  setInterviewer={()=>props.onChange(interviewer.id)} 
                  selected={props.value === interviewer.id}
                  />)
  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
    {parsedInterviewerListItem}
    </ul>
  </section>
  );
}