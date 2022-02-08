import React, { useState } from "react";
import axios from "axios";
import { useAsync } from "react-async";
import User from "./User";

// getUser(async)
async function getUsers() {
  // respone(url)
  const respone = await axios.get(
    "https://jsonplaceholder.typicode.com/users/"
  );
  // return data
  return respone.data;
}

// Components
function Users() {
  // Result value
  // const [users, setUsers] = useState(null);
  // loading
  // const [loading, setLoading] = useState(false);
  // Error
  // const [error, setError] = useState(null);
  // start initial user id value
  const [userId, setUserId] = useState(null);

  // reponse async
  const {
    data: users,
    error,
    isLoading,
    reload,
  } = useAsync({ promiseFn: getUsers });

  // [false]
  // loading code
  if (isLoading) return <div>loading..</div>;
  // error code
  if (error) return <div>Sorry, An error has occurred.</div>;
  // not users value === null
  if (!users) return <button onClick={reload}>Calling</button>;

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
      <button onClick={reload}>Bring</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
