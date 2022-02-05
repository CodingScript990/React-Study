import React, { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  // Result value
  const [users, setUsers] = useState(null);
  // loading
  const [loading, setLoading] = useState(false);
  // Error
  const [error, setError] = useState(null);

  // axios
  const fetchUsers = async () => {
    try {
      setUsers(null); // initial user value === null
      setError(null); // initial error value === null
      setLoading(true); // user start(1)
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/"
      );
      // data value
      setUsers(response.data);
    } catch (e) {
      // error
      console.log("Error : ", e.response.status);
      setError(e);
    }
    // loading === false
    setLoading(false);
  };

  // Rendering
  useEffect(() => {
    fetchUsers(); // callback function
  }, []);

  // [false]
  // loading code
  if (loading) return <div>loading..</div>;
  // error code
  if (error) return <div>Sorry, An error has occurred.</div>;
  // not users value === null
  if (!users) return null;

  // true
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>Bring</button>
    </>
  );
}

export default Users;
