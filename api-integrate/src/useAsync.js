import { useReducer, useEffect, useCallback } from "react";

// Reducer
// LOADING, SUCCESS, ERROR
function reducer(state, action) {
  // switch
  switch (action.type) {
    // type[loading]
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    // type[success]
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    // type[error]
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    // throw Error
    default:
      throw new Error(`Unhandled actiontype: ${action.type}`);
  }
}

// Components
function useAsync(callback, deps = [], skip = false) {
  // parameters[callback(call), deps(change obj)]
  // reducer(state value)
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });
  // request, response data(callback)
  const fetchData = useCallback(async () => {
    // action type ["LOADING"]
    dispatch({ type: "LOADING" });
    // try ~ catch
    try {
      // try await data
      const data = await callback();
      // action type[SUCCESS]
      dispatch({ type: "SUCCESS", data });
    } catch (e) {
      // error[action type]
      dispatch({ type: "ERROR", error: e });
    }
  }, [callback]);

  // useEffect state[data]
  useEffect(() => {
    // return skip
    if (skip) {
      return;
    }
    // state(request, respnse)
    fetchData();
    // eslint-disable-next-line
  }, deps);
  // reutrn state value, fetchData state
  return [state, fetchData];
}

export default useAsync;
