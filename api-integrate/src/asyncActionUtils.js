// export createAsyncDispatcher function
export default function createAsyncDispatcher(type, promiseFn) {
  // type action(dispatch)
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  // async actionHandler function
  async function actionHandler(dispatch, ...rest) {
    // type
    dispatch({ type });
    // API request action.type
    try {
      // data(promiseFn => value(...rest))
      const data = await promiseFn(...rest);
      // dispatch(success type)
      dispatch({ type: SUCCESS, data });
    } catch (e) {
      // dispatch(error type)
      dispatch({ type: ERROR, error: e });
    }
  }
  // async function return
  return actionHandler;
}

// export initialAsyncState Obj
export const initialAsyncState = {
  loading: false,
  data: null,
  error: null,
};

// State property
// loading State(Obj)
const loadingState = {
  loading: true,
  data: null,
  error: null,
};

// success State(Get in data)
const success = (data) => ({
  loading: false,
  data,
  error: null,
});

// error State(Get in error)
const error = (e) => ({
  loading: false,
  data: null,
  error: e,
});

// export createAsyncHandler
export function createAsyncHandler(type, key) {
  // type(action.state) / key(users, user)
  // type action(dispatch)
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  // function handler(state, action)
  function handler(state, action) {
    // action.type
    switch (action.type) {
      // type(loading)
      case type:
        return {
          ...state,
          [key]: loadingState,
        };
      // type(success)
      case SUCCESS:
        return {
          ...state,
          [key]: success(action.data),
        };
      // type(error)
      case ERROR:
        return {
          ...state,
          [key]: error(action.error),
        };
      default:
        return state;
    }
  }
  // return handler(callback data type)
  return handler;
}
