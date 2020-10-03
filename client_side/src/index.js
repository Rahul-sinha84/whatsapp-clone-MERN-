import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import { Provider } from "react-redux";
import reducers from "./redux/reducers";
import { createStore, applyMiddleware, compose } from "redux";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancer(applyMiddleware()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
