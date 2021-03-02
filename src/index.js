import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import firebase from "firebase/app";
import "firebase/firestore";

// // Initialize Cloud Firestore through Firebase
// firebase.initializeApp({
//   apiKey: "AIzaSyBuv9zQsAeNzvTFgINl1Nc_AItsrcnsHJM",
//   authDomain: "todo-test-c51d0.firebaseapp.com",
//   projectId: "todo-test-c51d0",
// });

var db = firebase.firestore();

// let todosFromDB = [];

db.collection("todos-test")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().name}, ${doc.data().isCompleted}`);
    });
    console.log(querySnapshot);
  });

const TODOS_INITIAL = [
  { id: "todo-0", name: "Do The Dishes", isCompleted: false },
  { id: "todo-1", name: "Take Out The Trash" },
  { id: "todo-2", name: "Finish Doing Loundry" },
];

ReactDOM.render(
  <React.StrictMode>
    <App todos={TODOS_INITIAL} />
  </React.StrictMode>,
  document.getElementById("root")
);
