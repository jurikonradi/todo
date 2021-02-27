import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/esm/FormLabel";
// import ACTIONS from "./App";

function FormTodo({ dispatch }) {
  const [enteredText, setEnteredText] = useState("");

  function handleChange(event) {
    setEnteredText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    enteredText
      ? dispatch({ type: "newTodo", payload: { name: enteredText } })
      : alert("Please enter todo's name");
    setEnteredText("");
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel>Enter new Todo</FormLabel>
      <Form.Control
        type="text"
        value={enteredText}
        onChange={handleChange}
        placeholder="Type here"
      />
    </Form>
  );
}

export default FormTodo;
