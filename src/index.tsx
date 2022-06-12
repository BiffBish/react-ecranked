import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "./style.css";

import { Provider } from "react-redux";
//
import store from "./stores/store";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
