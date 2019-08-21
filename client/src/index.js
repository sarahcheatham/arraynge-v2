import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';
import store from "./store/store";
import { Provider } from 'react-redux';
import '../node_modules/react-vis/dist/style.css';


const oldFetch = window.fetch;
window.fetch = (url, settings = {}) => {
  return oldFetch(url, 
    {...settings,
      headers: {...settings.headers, authorization: localStorage.getItem("token")}
    }
    );
};



ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById("root")
);
