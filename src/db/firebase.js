import firebase from "firebase/app";
import "firebase/firestore";
import { collectionName, firebaseConfig } from "./firebase.config.js";

firebase.initializeApp(firebaseConfig);
export var db = firebase.firestore();

export function addTodoToDB(todo) {
  db.collection(collectionName)
    .add({ id: todo.id, name: todo.name, isCompleted: todo.isCompleted })
    .then((docRef) => {
      console.log("Todo written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

export function loadTodosFromDB() {
  let newTodos = [];
  function returnTodos(todos) {
    newTodos = [...todos];
    console.log("return: ", newTodos);
  }
  db.collection(collectionName)
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
      returnTodos(todos);
      return todos;
    })
    .then((todos) => todos);
  return newTodos;
}
