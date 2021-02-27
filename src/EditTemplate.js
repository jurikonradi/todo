import React from "react";
// import FormText from "react-bootstrap/esm/FormText";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function EditTemplate(props) {
  const editingTemplate = (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Edit Todo</Form.Label>
        <Form.Control type="text" placeholder="Enter email" />

        <Button variant="secondary" type="submit">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );

  return <div>{editingTemplate}</div>;
}

export default EditTemplate;
