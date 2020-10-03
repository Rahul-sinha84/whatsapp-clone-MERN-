import { combineReducers } from "redux";
const initialState = {
  name: null,
};

const forUser = (state = initialState, action) => {
  if (action.type === "SET_USER") {
    return action.payload;
  }

  return state;
};

export default combineReducers({
  currentUser: forUser,
});
