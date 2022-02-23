import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import "components/InterviewerList.scss";


export default function InterviewerList(props) {
  // const interviewerClass = classNames("interviewers", {
  //   "interviwers__item--selected": props.selected
  // })
  const parsedInterviewerListItem = props.interviewers.map(interview => <InterviewerListItem 
                                                                        key={interview.id} 
                                                                        {...interview} 
                                                                        setInterviewer={()=>props.setInterviewer(interview.id)} 
                                                                        selected={props.interviewer === interview.id}
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