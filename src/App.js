import React, {useRef, useReducer, useMemo, useCallback} from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';

// users count 

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter( user => user.active).length;
};

// Initial setting

const initialState = { // initialState variable
  inputs: { // inputs object
    username : '', // username : value('')
    email : '', // email : value('')
  },
  users: [ // users Array
    { // users object
        id : 1, // key : value
        username : 'velopert',
        email : 'public.velopert@gmail.com',
        active : true,
    },
    { // users object
        id : 2, // key : value
        username : 'test',
        email : 'test@gmail.com',
        active : false,
    },
    { // users object
        id : 3, // key : value
        username : 'hero',
        email : 'herot@naver.com',
        active : false,
    },
  ]
};

// useRecuer 형태
function reducer(state, action) {
  switch(action.type) { // action type
    // type => CHANGE_INPUT
    case 'CHANGE_INPUT' : 
    return { // 반환
      ...state, // state 
      inputs: { // 불변성을 지키기 위함
        ...state.inputs, // input
        [action.name] : action.value, // action name, action value 값
      }
    };

    // type => CREATE_USER
    case 'CREATE_USER' : 
      return {
        inputs : initialState.inputs, // initial state input
        users : state.users.concat(action.user), // user state
      };

      // type => TOGGLE_USER
      case 'TOGGLE_USER' : 
        return { // 반환
          ...state, // state 형태
          users : state.users.map(user => 
            user.id === action.id ? {...user, active : !user.action} : user 
            // user id와 action id가 같다면? => [조건문]
            // 기존 user 객체를 새로운 user 객체에 넣어주고, active 값을 기존 user.action과 같지 않게 해준다. [true]
            // 그러나 아니라면 기존 user 값을 들고온다! [false]
            ),
        };

      // type => REMOVE_USER
      case 'REMOVE_USER' :
        return { // 반환
          ...state, // user state 
          users : state.users.filter(user => user.id !== action.id), 
          // users filter function을 사용해서 user값이 user.id 와 action.id값이 같지않으면 걸러내고! 같으면 삭제!
        };

    // 예외
    default : throw new Error('Unhandled action'); 
  }
};

function App() {

  // useState 형태
  /*
  const [inputs, setInputs] = useState();
  
  const {username, email} = inputs;

  const onChange = useCallback(e => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name] : value,
    });
  }, [inputs]);

  const [users, setUsers] = useState();

  const nextId = useRef(4); // useRef로 컴포넌트 안의 변수 만들기

  const onCreate = useCallback(() => { // onCreate 함수가 실행되면(1) / useCallback
    const user = {
      id : nextId.current,
      username,
      email,
    };
    // setUsers([...users, user]);
    setUsers(users => users.concat(user)); // 최신 users를 받아주기 때문에 이제 Array에 users를 사용하지 않아도 된다.
    setInputs({
      username : '',
      email : '',
    });
    
    nextId.current += 1; // 1씩 증가시켜라~!(2)
  }, [username, email]); // Array안에서 작동하는 건 이제 username, email의 값만 받아온다.

  const onRemove = useCallback(id => {
    setUsers(users => users.filter(user => user.id !== id)); // id가 일치하지 않으면? / function update
  }, []); 

  const onToggle = useCallback(id => { // toggle / useCallback
    setUsers(users => users.map( // users를 받아 온다.
      user => user.id === id ? {...user, active : !user.active} : user 
      // user가 user.id랑 id값이 같다면? {...user, active : !user.active} (true) : user(false) 
    ))
  }, []);

  const count = useMemo( () => countActiveUsers(users), [users]);  
  // useMemo : 특정값이 바뀌었을때만 특정한 함수가 실행되어 연산되고 그외에 값이 바뀌지 않았다면 리랜더링 하여 재사용한다
  // 무조건 첫번째는 함수를 넣어줘야한다!
  */
  
  const [state, dispatch] = useReducer(reducer, initialState); // useReducer(state, intial value)

  // 비구조할당
  const {users} = state; // users로 state로 할당받고
  const nextId = useRef(4); // user id
  const {username, email} = state.inputs; // username, email을 state.inputs로 추출해주고

  // onChagne 형태
  const onChange = useCallback( e => { // event 발생
    const {name, value} = e.target; // name, value를 event target으로 받아준다.
    dispatch({ // action
      type : 'CHANGE_INPUT', // type
      name, // name
      value // value
    });
  }, [] );

  // onCreate 형태

  const onCreate = useCallback( e => { // event 발생 
    dispatch({ // action
      type : 'CREATE_USER', // type
      user : { // user로 받는다
        id : nextId.current, // id value를 nextId.current로
        username, // username
        email, // email
      }
    });
    nextId.current += 1; // user id value increate
  }, [username, email]); // state [username, email]

  // onToggle 형태

  const onToggle = useCallback( id => { // id로 받는다.
    dispatch({ // action
      type : 'TOGGLE_USER', // type
      id, // id value
    });
  }, []); 

  // onRemove 형태

  const onRemove = useCallback( id => { // id로 받는다.
    dispatch({ // action
      type : 'REMOVE_USER', // type
      id, // id value
    });
  }, []);

  // count 형태 

  const count =  useMemo( () => countActiveUsers(users), [users]); 
  // useMemo function으로 선언하고, 이전에 만들어 놓은 countActiveUsers function안에 (users의 값으로 선언 후), [users]라는 배열로 설정해준다.
  // users안에 값이 추가될때마다 [users]안에 추가가 된다.

  // useReducer 형태

  return (
    <>
      {/* useState : <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} /> */}
      {/* useState : <UserList users={users} onRemove={onRemove} onToggle={onToggle} /> */}

      {/* state */}
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />

      {/* user */}
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />

      <div>활성 사용자 수 : {count}</div>
    </>
  );
}

export default App;
/*
  useState : 상태를 직접 지정해주고 업데이트 해주는 것
  useReducer : action이라는 object기반으로 state를 update해준다.
  => ex) const [number, dispatch] = useReduncer(reducer, 0); // reducer를 만들고, 뒤에는 값을 넣어준다.
  action : 참조하는 object => ex) dispatch({type : 'INCREMENT'}); / 상태 업데이트 로직을 component 밖으로 분리가능 
  reducer : 상태를 update 하는 function / 상태 값(state)과 액션값(action)을 반환(return)해주는 역할
  => ex) function reducer(state, action) {
    switch(action.type) {
      case 'INCREMENT' : return state + 1;
      case 'DECREMENT' : return state - 1;
      default : reutrn state;
    }
  }
*/
/*
  useState를 사용할때 component값이 하나 밖에 없을때, 단순한 숫자, 문자열일때 useState로 관리해주면 좋다.
  => ex) const [value, setValue] = useState(true);

  useReducer를 사용할때는 여러개의 compoenet이거나, 조금 복잡한 state값을 받아올때 useReducer로 관리해주면 좋다. 또는 여러개의
  state를 사용해야 할 경우에도 해당된다.
  => ex) 
        setUsers(users => users.concat(user));
        setInputs({
          username : '',
          email : '',
        }, []);
*/
