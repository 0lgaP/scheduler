import React from "react";

import { render, cleanup } from "@testing-library/react";

import InterviewerListItem from "components/DayListItem";

afterEach(cleanup);

it("only accepts array in props.interviewers", () => {
  render(<InterviewerListItem interviewers="String" />);
});