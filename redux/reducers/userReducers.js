const initialState = {
  favShows: [],
  userData: [],
};

const userReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_USER_DATA":
      return { ...state, userData: payload };
    default:
      return state;
  }
};
export default userReducers;
