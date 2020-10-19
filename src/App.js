import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";
import auth from "@feathersjs/authentication-client";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute.component";
import { Provider } from "figbird";
import "./App.css";

import Dashboard from "./pages/Dashboard/Dashboard.component";
import Login from "./pages/Login/Login.component";

const socket = io("http://localhost:3030/");
const app = feathers();

app.configure(socketio(socket));
app.configure(
  auth({
    storageKey: "auth",
  })
);
//app.configure(feathers.hooks("authentication"));

function App() {
  return (
    <Provider feathers={app}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" roles="user" component={Dashboard} />
          <PrivateRoute path="/dashboard" roles="user" component={Dashboard} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
