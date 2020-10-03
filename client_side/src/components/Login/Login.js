import React from "react";
import "./Login.css";
import { auth, provider } from "../firebase/firebase";
import { connect } from "react-redux";
import { userLogin } from "../../redux/actions";

const Login = ({ userLogin }) => {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        userLogin(result.user);
      })
      .catch((err) => alert(err));
  };
  return (
    <div className="login">
      <img src="/whatsapp-logo.png" className="login__image" />
      <button className="login__button" onClick={signIn}>
        Sign in with Google
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { state: state.name };
};
export default connect(mapStateToProps, { userLogin })(Login);
