import React, { useState } from "react";
import { useStompClient } from "react-stomp-hooks";
import { useSubscription } from "react-stomp-hooks";

const WebsocketHub = () => {
  const [clientMessage, setClientMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("No message received yet");
  const [subscribed, setSubscribed] = useState(false);

  const stompClient = useStompClient();

  useSubscription(subscribed ? ["/board/move"] : [], (message) => {
    const boardStatus = JSON.parse(message.body);
    setServerMessage(`${boardStatus.position.x}.${boardStatus.position.y}`);
  });

  const sendMessage = (event) => {
    if (stompClient) {
      stompClient.publish({
        destination: "/app/movement",
        body: JSON.stringify({ movement: event.target.value }),
      });
      setClientMessage(event.target.value);
    }
  };

  return (
    <>
      <div>
        <button onClick={sendMessage} value="UP">
          UP
        </button>
        <button onClick={sendMessage} value="RIGHT">
          RIGHT
        </button>
        <button onClick={sendMessage} value="DOWN">
          DOWN
        </button>
        <button onClick={sendMessage} value="LEFT">
          LEFT
        </button>
      </div>
      <div>
        <p>Client message: {clientMessage}</p>
        <p>Server message: {serverMessage}</p>
        {subscribed ? <p>Connected</p> : <p>Disconnected</p>}
        <button onClick={() => setSubscribed(!subscribed)}>
          {subscribed ? "Unsubscribe" : "Subscribe"}
        </button>
      </div>
    </>
  );
};

export default WebsocketHub;
