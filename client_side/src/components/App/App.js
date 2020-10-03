import React, { useState } from "react";
import ChatBox from "../ChatBox";
import Sidebar from "../Sidebar";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../Login";
import { connect } from "react-redux";

const App = ({ user }) => {
  const [noOfMessage, setNoOfMessage] = useState(null);
  const newMessageAlert = (messageLength) => {
    setNoOfMessage(messageLength);
  };
  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <Router>
          <Sidebar checkLastMessage={noOfMessage} />
          <Switch>
            <Route path="/rooms/:roomId">
              <ChatBox noOfMessage={newMessageAlert} />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return { user: state.currentUser.displayName };
};

export default connect(mapStateToProps)(App);
