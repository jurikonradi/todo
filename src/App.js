import { useReducer, useEffect } from "react";
import "./App.sass";
import "bootstrap/dist/css/bootstrap.min.css";
import { nanoid } from "nanoid";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import FormTodo from "./FormTodo";
import Todo from "./Todo";
import { addTodoToDB, db } from "./db/firebase.js";
import { collectionName } from "./db/firebase.config.js";

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
    case "itializeTodos": {
      const todosFromDB = [...action.payload.todos];
      return todosFromDB;
    }
    default:
      return todos;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    async function getData() {
      const todosFromDB = await db
        .collection(collectionName)
        .get()
        .then((querySnapshot) => {
          let todos = [];
          querySnapshot.forEach((doc) => {
            todos.push({
              id: doc.id,
              name: doc.data().name,
              isCompleted: doc.data().isCompleted,
            });
          });
          return todos;
        })
        .then((todos) => todos);
      dispatch({ type: "itializeTodos", payload: { todos: todosFromDB } });
    }
    getData();
    console.log("This is a side effect");
  }, []);

  return (
    <Container>
      <h1>My To-dos</h1>
      {todos.length === 0 ? (
        <div>Loading from Data Base... </div>
      ) : (
        <>
          <FormTodo dispatch={dispatch} />
          <ListGroup>
            {todos.map((todo) => (
              <Todo todo={todo} key={todo.id} dispatch={dispatch} />
            ))}
          </ListGroup>
        </>
      )}
    </Container>
  );
}

export default App;

// export ACTIONS;
