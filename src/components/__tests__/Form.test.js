
import React from "react";

import { fireEvent } from "@testing-library/react";

import { render, cleanup } from "@testing-library/react";

import Form from "components/Appointment/Form";

/*
What is the difference between getByText and queryByText?
When we use getByText we should be confident that the element exists. 
If it does not exist, then it throws an error instead. 
We can test for the absence of something by using queryByText 
and checking that the value is null.

What sort of value is being passed to the getByText and queryByText functions?
It is a case insensitive regular expression. 
This search is more general than the absolute string "Student name cannot be blank".

What type of value is onSave?
The onSave reference is a mock function that we can pass to the Form component.*/


afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    fireEvent.click(getByText("Save"));

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Cancel"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
// it("calls onSave function when the name is defined", () => {
//   const onSave = jest.fn();
//   const { getByText, queryByText } = render(
//     <Form onSave={onSave} interviewers={interviewers} interviewer={interviewers[0].id} name="Lydia Miller-Jones"/>
//   );
//   fireEvent.click(getByText("Save"));

//   expect(queryByText(/student name cannot be blank/i)).toBeNull();

//   expect(onSave).toHaveBeenCalledTimes(1);
//   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
// });