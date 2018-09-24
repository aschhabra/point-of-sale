import React from "react";
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import { BrowserRouter,Switch, Route, Link, NavLink} from 'react-router-dom';
import AppRouter,{history} from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import getVisibleExpense from "./selectors/expenses";
import 'react-dates/initialize';
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css"
import LoadingPage from "./components/LoadingPage";
import NavDrawer from "./components/NavDrawer";

console.log('App.js is running!');
const element=<div><p>This is boilerplat</p></div>;

const store = configureStore();


const jsx= (
  <Provider store={store}>
    <AppRouter />
  </Provider>

);
let hasRendered=false;
const renderApp= () =>{
  if(!hasRendered){
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered=true;
  }

};

ReactDOM.render(<NavDrawer/>, document.getElementById('app'));

