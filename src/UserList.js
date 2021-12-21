import React from 'react';

// Array rendering

function User ({user}) { // 함수를 하나 더 생성해서 좀더 쉽게 작업해준다.
    return(
        <div>
            <b>{user.username}</b> <span>({user.email})</span>
        </div>
    );
};

function UserList ({users}) {
    return ( // map함수를 사용해서 배열을 불러와준다!!
        <div>
            {
                users.map(
                    // (user, index) => (<User key={index} user={user} />) 기본 index값을 주므로써
                    // 랜더링을 할 수 있다. 그러나 key안에 index값 넣는 걸 추천하지 않는다!
                    // key값이 있어야지만 효율적으로 랜더링 할 수 있다.
                    user => (<User key={user.id} user={user} />)
                )
            }
        </div>
    );
};

export default UserList;