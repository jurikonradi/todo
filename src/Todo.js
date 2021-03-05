import React, { useState } from "react";
// import "./Todo.sass";

import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Prepend from "react-bootstrap";
import { ReactComponent as IconEdit } from "./assets/icons/pencil-square.svg";
import { ReactComponent as IconDelete } from "./assets/icons/trash-fill.svg";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

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
    <ListGroup horizontal className="justify-content-between">
      <ListGroup horizontal>
        <ListGroupItem className="border-0">
          <Form.Check
            checked={isCompleted}
            onChange={handleCheckboxChange}
            aria-label="Todo is Completed"
          />
        </ListGroupItem>
        <ListGroup.Item className="border-0">{todo.name}</ListGroup.Item>
      </ListGroup>
      <ListGroup horizontal>
        <ListGroup.Item
          action
          as="button"
          className="border-0"
          onClick={() => setIsEditable(true)}
        >
          <IconEdit class="text-primary" alt="Edit" />
        </ListGroup.Item>
        <ListGroup.Item
          action
          as="button"
          className="border-0"
          onClick={() =>
            dispatch({ type: "deleteTodo", payload: { id: todo.id } })
          }
        >
          <IconDelete class="text-danger" alt="Delete" />
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
