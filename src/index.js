import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { loadTodosFromDB } from "./db/firebase.js";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

//    <App todos={TODOS_INITIAL} />

// const TODOS_INITIAL = [
//   { id: "todo-0", name: "Do The Dishes", isCompleted: false },
//   { id: "todo-1", name: "Take Out The Trash" },
//   { id: "todo-2", name: "Finish Doing Loundry" },
// ];

// const TODOS_INITIAL = [];
