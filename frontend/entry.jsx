import React from 'react';
import ReactDOM from "react-dom";
import Root from './components/root';
import configureStore from './store/store';
import { login, signup } from './util/session_api_util';

document.addEventListener("DOMContentLoaded", () => {
  const store = configureStore();
  const root = document.getElementById("root");
  
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.signup = signup;
  window.login = login;

  ReactDOM.render(<Root store={store} />, root);
});