const authReducers = (state = { authdata: null }, action) => {
  switch (action.type) {
    case "AUTH":
      console.log(action?.data);
      localStorage.setItem("user", JSON.stringify({ ...action?.data }));
      return { ...state, authdata: action?.data };

    case "LOGOUT":
      localStorage.clear();
      return { ...state, authdata: null };

    default:
      return state;
  }
};

export default authReducers;
