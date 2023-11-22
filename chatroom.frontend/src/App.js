import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import "./App.css";
import { Lobby } from "./components/Lobby";
import { useState } from "react";

const App = () => {
  const [connection, setConnection] = useState();
  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:3000/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        console.log("message received: ", message);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <h2>RoomChat</h2>
      <hr className="line" />
      <Lobby joinRoom={joinRoom} />
    </div>
  );
};

export default App;
