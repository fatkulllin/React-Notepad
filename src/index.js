import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const defaultState = {
  notes: [],
}

const notepadReducer = (state = defaultState, action) => {

  switch (action.type) {
    case "ADD_NOTE":
      return { ...state, notes: [...state.notes, action.payload] }
    case "EDIT_NOTE":
      return {
        ...state, notes: state.notes.map((elem, index) => {
          if (index === action.editNoteIndex) {
            elem = action.payload
          }
          return elem
        })
      }
    case "REMOVE_NOTE":
      return { ...state, notes: state.notes.filter(notes => notes !== action.payload) }

    default:
      return state
  }
}

export const store = createStore(notepadReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
