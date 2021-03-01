import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const TODOS_INITIAL = [
  { id: "todo-0", name: "Do The Dishes" },
  { id: "todo-1", name: "Take Out The Trash" },
  { id: "todo-2", name: "Finish Doing Loundry" },
];

ReactDOM.render(
  <React.StrictMode>
    <App todos={TODOS_INITIAL} />
  </React.StrictMode>,
  document.getElementById("root")
);
