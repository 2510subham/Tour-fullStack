import { createContext, useEffect, useReducer } from "react";

// Fixed: Properly retrieve user from localStorage on page load
const initial_state = {
  user:
    localStorage.getItem("user") !== null &&
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  loading: false,
  error: null,
};
export const authContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  // console.log(action," and ",state);
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        user: null,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch, //we can call dispatch function from any component to use reducer
      }}
    >
      {children}
    </authContext.Provider>
  );
};
