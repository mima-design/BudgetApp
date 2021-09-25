import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from "axios";
import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk";
import { Provider } from 'react-redux'
import combineReducers from "./redux/reducers";


axios.defaults.baseURL = 'http://localhost:8000'; // to be rewriten

const store = createStore(combineReducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
