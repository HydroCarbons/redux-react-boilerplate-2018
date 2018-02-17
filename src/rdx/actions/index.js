// src/js/actions/index.js
import {
  ADD_TODO_ITEM,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM
} from "../constants/action-types";

export const addToDoItem = ToDoItem => ({
  type: ADD_TODO_ITEM,
  payload: ToDoItem,
});

export const updateToDoItem = ToDoItem => ({
  type: UPDATE_TODO_ITEM,
  payload: ToDoItem,
});

export const deleteToDoItem = ToDoItem => ({
  type: DELETE_TODO_ITEM,
  payload: ToDoItem,
});
