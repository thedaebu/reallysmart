import React from 'react';
import ReactDOM from "react-dom";
import { login, signup } from './actions/session_actions';
import Root from './components/root';
import configureStore from './store/store';


document.addEventListener("DOMContentLoaded", () => {
  const store = configureStore();
  const root = document.getElementById("root");
  
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.signup = signup;
  window.login = login;

  ReactDOM.render(<Root store={store} />, root);
});