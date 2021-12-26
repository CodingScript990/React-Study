import React, {useRef, useState, useMemo} from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter( user => user.active).length;
};

function App() {
  const [inputs, setInputs] = useState({
    username : '',
    email : '',
  });
  
  const {username, email} = inputs;

  const onChange = (e) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name] : value,
    });
  };

  const [users, setUsers] = useState([
    {
        id : 1,
        username : 'velopert',
        email : 'public.velopert@gmail.com',
        active : true,
    },
    {
        id : 2,
        username : 'test',
        email : 'test@gmail.com',
        active : false,
    },
    {
        id : 3,
        username : 'hero',
        email : 'herot@naver.com',
        active : false,
    },
  ]);

  const nextId = useRef(4); // useRef로 컴포넌트 안의 변수 만들기

  const onCreate = () => { // onCreate 함수가 실행되면(1)
    const user = {
      id : nextId.current,
      username,
      email,
    };
    // setUsers([...users, user]);
    setUsers(users.concat(user));
    setInputs({
      username : '',
      email : '',
    });
    
    nextId.current += 1; // 1씩 증가시켜라~!(2)
  };

  const onRemove = id => {
    setUsers(users.filter(user => user.id !== id)); // id가 일치하지 않으면?
  };

  const onToggle = id => {
    setUsers(users.map(
      user => user.id === id ? {...user, active : !user.active} : user
    ))
  };

  const count = useMemo( () => countActiveUsers(users), [users]);  
  // useMemo : 특정값이 바뀌었을때만 특정한 함수가 실행되어 연산되고 그외에 값이 바뀌지 않았다면 리랜더링 하여 재사용한다
  // 무조건 첫번째는 함수를 넣어줘야한다!

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수 : {count}</div>
    </>
  );
}

export default App;
