import React from 'react';

function User({user}) {
    
    // if(!user) return null; // 만약 user가 없으면? null값을 줘라! 

    return (
        <div>
            <div>
                <b>ID</b> : {user.id}
            </div>
            <div>
                <b>Username</b> : {user.username}
            </div>
            <div>
                <b>pw</b> : {user.pw}
            </div>
        </div>
    );
}

export default User;