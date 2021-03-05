import { useReducer, useEffect } from "react";
import "./App.sass";
import "bootstrap/dist/css/bootstrap.min.css";
import { nanoid } from "nanoid";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import FormTodo from "./FormTodo";
import Todo from "./Todo";
import {
  addTodoToDB,
  loadTodosFromDB,
  deleteTodoFromDB,
  editTodoInDB,
  toggleCompletedInDB,
} from "./db/firebase.js";
// import { collectionName } from "./db/firebase.config.js";

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
      deleteTodoFromDB(action.payload.id);
      return filteredTodos;
    }
    case "editTodo": {
      const editedTodos = todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, name: action.payload.name };
        }
        return todo;
      });
      editTodoInDB(action.payload.id, action.payload.name);
      return editedTodos;
    }
    case "toggleIsCompleted": {
      let toggledTodoIsCompleted;
      const toggledTodos = todos.map((todo) => {
        if (todo.id === action.payload.id) {
          toggledTodoIsCompleted = !todo.isCompleted;
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
      console.log("toggleIsCompleted reducer", toggledTodos);
      toggleCompletedInDB(action.payload.id, toggledTodoIsCompleted);
      return toggledTodos;
    }
    case "initializeTodos": {
      return [...action.payload.todos];
    }
    default:
      return todos;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    loadTodosFromDB().then((results) => {
      dispatch({ type: "initializeTodos", payload: { todos: results } });
    });
  }, []);

  return (
    <Container className="bg-white shadow-sm p-4">
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
