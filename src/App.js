import React from "react";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";
import auth from "@feathersjs/authentication-client";
import useRecoilState from 'recoil'

import "./App.css";

import Dashboard from "./pages/Dashboard/Dashboard.component";
import Login from "./pages/Login/Login.component";
import { feathersApp } from "./store/index";

const socket = io("http://api.feathersjs.com");
const app = feathers();

app.configure(socketio(socket));
app.configure(
  auth({
    storageKey: "auth",
  })
);

const [feathersAppState, setfeathersAppState] = useRecoilState(feathersApp);

setfeathersAppState(app);

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
