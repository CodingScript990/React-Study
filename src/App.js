import React, {useRef, useState} from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';

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

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
    </>
  );
}

export default App;
