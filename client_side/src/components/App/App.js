import React, { useState } from "react";
import ChatBox from "../ChatBox";
import Sidebar from "../Sidebar";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  const [noOfMessage, setNoOfMessage] = useState(null);
  const newMessageAlert = (messageLength) => {
    setNoOfMessage(messageLength);
  };
  return (
    <div className="App">
      <Router>
        <Sidebar checkLastMessage={noOfMessage} />
        <Switch>
          <Route path="/rooms/:roomId">
            <ChatBox noOfMessage={newMessageAlert} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
