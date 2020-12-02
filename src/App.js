import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import feathers from "@feathersjs/client";
//import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";
//import auth from "@feathersjs/authentication-client";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute.component";
import { Provider } from "figbird";
import "./App.css";

import Dashboard from "./pages/Dashboard/Dashboard.component";
import Login from "./pages/Login/Login.component";

const socket = io("http://192.168.0.71:3030/", {
  transports: ["websocket"],
  forceNew: true,
});
const app = feathers();

app.configure(feathers.socketio(socket));
app.configure(
  feathers.authentication({
    storage: window.localStorage,
    storageKey: "accessToken",
  })
);

//app.configure(feathers.hooks("authentication"));

function App() {
  try {
    app.reAuthenticate(true);
    console.log("authing");
  } catch {
    app
      .handleError("FeathersError", "authenticate")
      .then(() => console.log("not auth"));
  }
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
