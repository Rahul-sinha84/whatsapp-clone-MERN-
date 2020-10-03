import { combineReducers } from "redux";
const currentUser = {
  name: "",
};

export default combineReducers({
  currentUser: () => "dummyReducer",
});
