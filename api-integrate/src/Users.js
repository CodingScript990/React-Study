import React, { useState } from "react";
import User from "./User";
import { useUsersState, useUsersDispatch, getUsers } from "./UsersContext";

// Components
function Users() {
  // start initial user id value
  const [userId, setUserId] = useState(null);
  // state vale
  const state = useUsersState();
  // dispatch value
  const dispatch = useUsersDispatch();

  // fetchData(onClick event)
  const fetchData = () => {
    // Request getUsers
    getUsers(dispatch);
  };

  // users state management
  const { loading, data: users, error } = state.users;

  // [false]
  // loading code
  if (loading) return <div>loading..</div>;
  // error code
  if (error) return <div>Sorry, An error has occurred.</div>;
  // not users value === null
  if (!users) return <button onClick={fetchData}>Calling</button>;

  // End of Components

  // true
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setUserId(user.id)}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchData}>Bring</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
