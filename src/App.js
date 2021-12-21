import React, {useRef} from 'react';
import UserList from './UserList';

function App() {
  const users = [
    {
        id : 1,
        username : 'velopert',
        email : 'public.velopert@gmail.com',
    },
    {
        id : 2,
        username : 'test',
        email : 'test@gmail.com',
    },
    {
        id : 3,
        username : 'hero',
        email : 'herot@naver.com',
    },
  ];

  const nextId = useRef(4); // useRef로 컴포넌트 안의 변수 만들기

  const onCreate = () => { // onCreate 함수가 실행되면(1)
    console.log(nextId.current); // 4
    nextId.current += 1; // 1씩 증가시켜라~!(2)
  };

  return (
    <UserList users={users} />
  );
}

export default App;
