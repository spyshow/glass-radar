import React from "react";
import { Navigate } from "react-router-dom";
import feathers from "@feathersjs/client";
//import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";
//import auth from "@feathersjs/authentication-client";
import RouterWrap from "./RouterWrap";
import { Provider } from "figbird";
import "./App.css";

const socket = io(process.env.REACT_APP_HOSTNAME + ":3030", {
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
  app.authenticate().catch(() => <Navigate to="/login" />);

  return (
    <Provider feathers={app}>
      <RouterWrap />
    </Provider>
  );
}

export default App;
