// src/js/reducers/index.js
import {
  ADD_TODO_ITEM,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM,
} from "../constants/action-types";

const initialState = {
  ToDoData: [],
  uniqueid: 0,
  done: 0,
  archived: 0,
};

const rootReducer = (state = initialState, action) => {

  switch (action.type) {

    case ADD_TODO_ITEM:
      console.log("rootReducer: ADD_TODO_ITEM: " + JSON.stringify(action.payload) + " ,state: " + JSON.stringify(state));

      return {
        ...state,
        ToDoData: [
          ...state.ToDoData,
          action.payload
        ],
        uniqueid: state.uniqueid+1
      };

    case UPDATE_TODO_ITEM:
      console.log("rootReducer: UPDATE_TODO_ITEM: " + JSON.stringify(action.payload) + " ,state: " + JSON.stringify(state));

      var index = state.ToDoData.findIndex( (item) => { return(item.id === action.payload.id) });
      console.log("Index: " + index);

      return {
        ...state,
        ToDoData: [
          ...state.ToDoData.slice(0, index),
          action.payload,
          ...state.ToDoData.slice(index+1),
        ],
        done: action.payload.isChecked?state.done+1:state.done-1,
      };

    case DELETE_TODO_ITEM:
      console.log("rootReducer: DELETE_TODO_ITEM: " + JSON.stringify(action.payload) + " ,state: " + JSON.stringify(state));

      var index = state.ToDoData.findIndex( (item) => { return(item.id === action.payload.id) });
      console.log("Index to remove : " + index);

      return {
        ...state,
        ToDoData: [
          ...state.ToDoData.slice(0, index),
          ...state.ToDoData.slice(index+1),
        ],
        archived: state.archived+1,
      };

    default:
      return state;
  }

};

export default rootReducer;
