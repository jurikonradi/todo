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

export function deleteTodoFromDB(todo) {
  db.collection(collectionName)
    .doc(todo.id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}

export function editTodoInDB(id, name) {
  db.collection(collectionName)
    .doc(id)
    .update({
      name: name,
    })
    .then(() => {
      console.log("Document successfully updated!");
    });
}

export function toggleCompletedInDB(id, isCompleted) {
  db.collection(collectionName)
    .doc(id)
    .update({
      isCompleted: isCompleted,
    })
    .then(() => {
      console.log("Document successfully updated!");
    });
}

export async function loadTodosFromDB() {
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
    .catch((error) => {
      console.error("Error loading todos: ", error);
    });
  return todosFromDB;
}
