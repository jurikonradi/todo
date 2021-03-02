import { useReducer } from "react";
import "./App.sass";
import "bootstrap/dist/css/bootstrap.min.css";
import { nanoid } from "nanoid";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import FormTodo from "./FormTodo";
import Todo from "./Todo";

import firebase from "firebase/app";
import "firebase/firestore";
firebase.initializeApp({
  apiKey: "AIzaSyBuv9zQsAeNzvTFgINl1Nc_AItsrcnsHJM",
  authDomain: "todo-test-c51d0.firebaseapp.com",
  projectId: "todo-test-c51d0",
});
var db = firebase.firestore();

function addTodoToDB(todo) {
  db.collection("todos-test")
    .add({ id: todo.id, name: todo.name, isCompleted: todo.isCompleted })
    .then((docRef) => {
      console.log("Todo written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}
// export const ACTIONS = {
//   NEW_TODO: "newTodo",
// };

function reducer(todos, action) {
  switch (action.type) {
    case "newTodo": {
      const newTodo = {
        id: "todo-" + nanoid(),
        name: action.payload.name,
        isCompleted: false,
      };
      addTodoToDB(newTodo);
      return [...todos, newTodo];
    }
    case "deleteTodo": {
      const filteredTodos = todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      return filteredTodos;
    }
    case "editTodo": {
      const editedTodos = todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, name: action.payload.name };
        }
        return todo;
      });
      return editedTodos;
    }
    default:
      return todos;
  }
}

function App(props) {
  const [todos, dispatch] = useReducer(reducer, props.todos);

  return (
    <Container className="container-sm">
      <h1>My To-dos</h1>

      <FormTodo dispatch={dispatch} />

      <ListGroup>
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} dispatch={dispatch} />
        ))}
      </ListGroup>
    </Container>
  );
}

export default App;

// export ACTIONS;
