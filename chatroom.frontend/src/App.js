import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import "./App.css";
import { Lobby } from "./components/Lobby";
import { useState } from "react";
import * as signalR from '@microsoft/signalr';

const App = () => {
  const [connection, setConnection] = useState();
  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7000/chathub")
        .configureLogging(LogLevel.Information)
        .build();

      const start = async () => {
        try {
          await connection.start();
          console.log("Connected to signal r hub");
        } catch (error) {
          console.log(error);
        }
      };

      connection.on("ReceiveMessage", (user, message) => {
        console.log("message received: ", message);
      });

      await connection.start();
      await connection.invoke("JoinRoom", {user, room});
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
