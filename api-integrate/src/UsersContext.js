import React, { createContext, useReducer, useContext } from "react";
import * as api from "./api";
import createAsyncDispatcher, {
  createAsyncHandler,
  initialAsyncState,
} from "./asyncActionUtils";

// initialState(Obj)
const initialState = {
  // Obj(API request)
  // users Obj(initial value)
  users: initialAsyncState,
  // user Obj(initial value)
  user: initialAsyncState,
};

// Reducer(GET)

// GET_USERS
// GET_USERS_SUCCESS
// GET_USERS_ERROR
// GET_USER
// GET_USER_SUCCESS
// GET_USER_ERROR

// users handler
const usersHandler = createAsyncHandler("GET_USERS", "users");
// user handler
const userHandler = createAsyncHandler("GET_USER", "user");

function userReducer(state, action) {
  switch (action.type) {
    // GET_USERS(action.type)
    case "GET_USERS":
    // GET_USERS_SUCCESS(action.type)
    case "GET_USERS_SUCCESS":
    // GET_USERS_ERROR(action.type)
    case "GET_USERS_ERROR":
      return usersHandler(state, action);
    // GET_USER(action.type)
    case "GET_USER":
    // GET_USER_SUCCESS(action.type)
    case "GET_USER_SUCCESS":
    // GET_USER_ERROR(action.type)
    case "GET_USER_ERROR":
      return userHandler(state, action);
    // Error(action.type)
    default:
      throw new Error("Unhandled action type", action.type);
  }
}

// Context[userState, usersDispatch]
// Effective state work
const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

// UserProvider export function(Provider)
export function UsersProvider({ children }) {
  // Get in state and dispatch
  const [state, dispatch] = useReducer(userReducer, initialState);
  // Start code
  return (
    <UsersStateContext.Provider value={state}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  );
}

// State management(users state)
export function useUsersState() {
  // usersState value
  const state = useContext(UsersStateContext);
  // not state(error)
  if (!state) {
    throw new Error("Can't find UserProvider");
  }
  // state value
  return state;
}

// Dispatch State management(users state)
export function useUsersDispatch() {
  // usersDispatch value
  const dispatch = useContext(UsersDispatchContext);
  // not dispatch(error)
  if (!dispatch) {
    throw new Error("Can't find UserProvider");
  }
  // dispatch value
  return dispatch;
}

// export createAsyncDispatcher(geetUsers)
export const getUsers = createAsyncDispatcher("GET_USERS", api.getUsers);
// export createAsyncDispatcher(getUser)
export const getUser = createAsyncDispatcher("GET_USER", api.getUser);
