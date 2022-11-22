import React from "react";

import "./App.css";
import WebsocketHub from "./components/WebsocketHub";
import Stomp from "./components/Stomp";

const SOCKET_URL = "http://localhost:8080/ws";

function App() {
  return (
    <Stomp socketUrl={SOCKET_URL}>
      <WebsocketHub />
    </Stomp>
  );
}

export default App;
