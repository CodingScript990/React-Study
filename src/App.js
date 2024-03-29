import React, {useRef, useReducer, useMemo, useState, useCallback, createContext} from 'react';
import produce from 'immer'; // immer
import CreateUser from './CreateUser';
import UserList from './UserList';
import useInputs from './useInputs';
import LifeCycleSample from './LifeCycleSample';

// window.produce = produce;
/*
  [immer(불변성)]

  ex) 
  const state = {number : 1, dontChangeMe : 2};
  const nextState = produce(state, draft => {draft.number+=1});
  nextState => {number: 2, dontChangeMe: 2}
*/

// users count 

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter( user => user.active).length;
};

// Initial setting

const initialState = { // initialState variable
  /*
  custom hook을 활용한 useInputs.js에 선언한 것을 가져오기 위함
  inputs: { // inputs object
    username : '', // username : value('')
    email : '', // email : value('')
  },
  */
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
    /*
    [useInputs.js에 선언한 것을 가져오기 위함]
    case 'CHANGE_INPUT' : 
    return { // 반환
      ...state, // state 
      inputs: { // 불변성을 지키기 위함
        ...state.inputs, // input
        [action.name] : action.value, // action name, action value 값
      }
    };
    */

    // type => CREATE_USER
    case 'CREATE_USER' : 
      // [Immer use]  
      return produce(state, draft => {
        draft.users.push(action.user); // draft fucntion(대상 : users / 어떤방법으로? : push function / 진행대상은? : action.user)
      });
    /*
      [Immer not use]

      return {
        //inputs : initialState.inputs, // initial state input
        //users : state.users.concat(action.user), // user state
        
      };
      */

      // type => TOGGLE_USER
      case 'TOGGLE_USER' : 

        // [Immer use]

        return produce(state, draft => {
          const user = draft.users.find(user => user.id === action.id); // 누굴 받아올거야? draft안에 users안에서 find할껀데? / find할 대상은?
          // user 인데 user중에서 user.id와 action.id가 같은 아이들만 찾아올거야!
          user.active = !user.active; // 조건이 맞으면 user.active를 실행! 아니면? !user.active해줘라!
        });

      /*
        [Immer not use]

        return { // 반환
          //...state, // state 형태
          users : state.users.map(user => 
            user.id === action.id ? {...user, active : !user.active} : user 
            // user id와 action id가 같다면? => [조건문]
            // 기존 user 객체를 새로운 user 객체에 넣어주고, active 값을 기존 user.action과 같지 않게 해준다. [true]
            // 그러나 아니라면 기존 user 값을 들고온다! [false]
            ),
        };
        */

      // type => REMOVE_USER
      case 'REMOVE_USER' :

      // [Immer use]
      return produce(state, draft => {
        const idx = draft.users.findIndex(user => user.id === action.id); // 삭제할껀데, index값을 어디서 받을거야?
        // draft.users.findIndex라는 함수안에서 user라는 곳에서 user.id와 action.id가 같은 아이만 받아올거야!
        draft.users.splice(idx, 1);
      });

      /*
        [Immer not use]

        return { // 반환
          //...state, // user state 
          users : state.users.filter(user => user.id !== action.id), 
          // users filter function을 사용해서 user값이 user.id 와 action.id값이 같지않으면 걸러내고! 같으면 삭제!
        };
       */ 

    // 예외
    default : throw new Error('Unhandled action'); 
  }
};

// UserDispatch
export const UserDispatch = createContext(null); // basic value === null;

// LifCyle
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
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
  
  const [form, onChange, reset] = useInputs({ // form, onChange, reset을 useInputs안에 username, email의 값을 받아 올것이다.
    username : '', 
    email : '', 
  });
  const {username, email} = form; // 그리고 username, email의 값을 form으로 추출해준다.

  // 비구조할당
  const nextId = useRef(4); // user id

  const {users} = state; // users로 state로 할당받고
  // const {username, email} = state.inputs; // username, email을 state.inputs로 추출해주고 

  // onChagne 형태

  /*
  [useInputs.js에 선언한 것을 가져오기 위함]

  const onChange = useCallback( e => { // event 발생
    const {name, value} = e.target; // name, value를 event target으로 받아준다.
    dispatch({ // action
      type : 'CHANGE_INPUT', // type
      name, // name
      value // value
    });
  }, [] );
  */

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
    reset(); // reset function(이전에 초기에 설정한 값에서 값을 추가하기 위한 작업)
  }, [username, email, reset]); // state [username, email, reset]

  // onToggle 형태

  /*
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

  */
  // count 형태 

  const count =  useMemo( () => countActiveUsers(users), [users]); 
  // useMemo function으로 선언하고, 이전에 만들어 놓은 countActiveUsers function안에 (users의 값으로 선언 후), [users]라는 배열로 설정해준다.
  // users안에 값이 추가될때마다 [users]안에 추가가 된다.

  const [color, setColor] = useState('#000000');
  const [visible, setVisible] = useState(true);

  // onClick(LifeCycle)
  const onClick = () => {
    setColor(getRandomColor());
  };
  
  const onToggle = () => {
    setVisible(!visible);
  };

  // useReducer 형태

  return (
    <UserDispatch.Provider value={dispatch}>
      {/* useState : <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} /> */}
      {/* useState : <UserList users={users} onRemove={onRemove} onToggle={onToggle} /> */}

      {/* state */}
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />

      {/* user */}
      <UserList users={users} />

      <div>활성 사용자 수 : {count}</div>

      {/* LifeCycle */}
      <button onClick={onClick}>Random color</button>
      <button onClick={onToggle}>Toggle</button>
      {visible &&<LifeCycleSample color={color} />}
    </UserDispatch.Provider>
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
