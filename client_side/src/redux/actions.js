export const userLogin = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};
