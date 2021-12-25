import React, {useEffect} from 'react';

// Array rendering

function User ({user, onRemove, onToggle}) { // 함수를 하나 더 생성해서 좀더 쉽게 작업해준다.
    const {username, email, id, active} = user;
    /*useEffect( () => {
        console.log('컴포넌트가 화면에 나타남');
        // props -> state
        // REST API
        // D3 Video.js
        // setInterval, setTimeout
        return () => {
            // clearInterval, clearTimeout
            // 라이브러리, 인스턴스 제거
            console.log('컴포넌트가 화면에서 사라짐');
        };
    }, []);
    */
    useEffect( () => { // 첫번째 parameter에서는 function을 등록하고
        console.log(user); // props state
        return () => { // 두번째 parameter에서는 
            console.log(user); 
        };
    }, [user] ); 
    return(
        <div>
            <b style={{
                color : active ? 'orange' : '#000',
                cursor : 'pointer'
            }} onClick={ () => onToggle(id)} >{username}</b> &nbsp; <span>({email})</span>
            <button onClick={ () => onRemove(id)}>삭제</button>
        </div>
    );
};

function UserList ({users, onRemove, onToggle}) {
    return ( // map함수를 사용해서 배열을 불러와준다!!
        <div>
            {
                users.map(
                    // (user, index) => (<User key={index} user={user} />) 기본 index값을 주므로써
                    // 랜더링을 할 수 있다. 그러나 key안에 index값 넣는 걸 추천하지 않는다!
                    // key값이 있어야지만 효율적으로 랜더링 할 수 있다.
                    user => (<User key={user.id} user={user} onRemove={onRemove} onToggle={onToggle} />)
                )
            }
        </div>
        /*
            mount : 화면에 보여진다.
            unmount : 화면에 보이지 않는다.
        */
    );
};

export default UserList;