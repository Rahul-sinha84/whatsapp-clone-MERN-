import React from "react";
import ChatBox from "../ChatBox";
import Sidebar from "../Sidebar";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Sidebar />
      <ChatBox />
    </div>
  );
};

export default App;
