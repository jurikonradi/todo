import React, { useState } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Prepend from "react-bootstrap";
import { ReactComponent as IconEdit } from "./assets/icons/pencil-square.svg";
import { ReactComponent as IconDelete } from "./assets/icons/trash-fill.svg";

function Todo({ todo, dispatch }) {
  const [isEditable, setIsEditable] = useState(false);

  const [editedName, setEditedName] = useState("");

  const [isCompleted, setCompleted] = useState(todo.isCompleted);

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "editTodo", payload: { id: todo.id, name: editedName } });
    setIsEditable(false);
  };

  const handleCheckboxChange = () => {
    setCompleted(!isCompleted);
    dispatch({ type: "toggleIsCompleted", payload: { id: todo.id } });
  };

  const viewTemplate = (
    <ListGroup horizontal className="d-flex justify-content-between">
      <Form.Check
        checked={isCompleted}
        onChange={handleCheckboxChange}
        inline
        aria-label="Todo is Completed"
      />
      <ListGroup.Item className="align-items-left border-0">
        {todo.name}
      </ListGroup.Item>
      <ListGroup horizontal>
        <ListGroup.Item
          action
          as="button"
          className="border-0"
          onClick={() => setIsEditable(true)}
        >
          <IconEdit color="blue" alt="Edit" />
        </ListGroup.Item>
        <ListGroup.Item
          action
          as="button"
          className="border-0"
          onClick={() =>
            dispatch({ type: "deleteTodo", payload: { id: todo.id } })
          }
        >
          <IconDelete color="red" alt="Delete" />
        </ListGroup.Item>
      </ListGroup>
    </ListGroup>
  );

  const editTemplate = (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Edit Todo:</Form.Label>
        <Form.Control
          type="text"
          placeholder={todo.name}
          vaue={editedName}
          onChange={handleNameChange}
        />

        <Button
          variant="secondary"
          type="reset"
          onClick={() => setIsEditable(false)}
        >
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );

  return (
    <ListGroup.Item>{isEditable ? editTemplate : viewTemplate}</ListGroup.Item>
  );
}

export default Todo;
