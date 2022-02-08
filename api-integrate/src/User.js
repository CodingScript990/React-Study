import React from "react";
import axios from "axios";
import { useAsync } from "react-async";

// get user response function
async function getUser({ id }) {
  // response axios(get)
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  // return data
  return response.data;
}

function User({ id }) {
  // promise[id]
  // response id state(Obj)
  const {
    data: user,
    error,
    isLoading,
  } = useAsync({ promiseFn: getUser, id, watch: id }); // callback

  // state loading?
  if (isLoading) return <div>loading...</div>;
  // state error?
  if (error) return <div>error...</div>;
  // state not data
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email : </b>
        {user.email}
      </p>
      {/* <p>
        <b>City : </b>
        {user.address.city}
      </p>
      <p>
        <b>Phone : </b>
        {user.phone}
      </p>
      <p>
        <b>Website : </b>
        {user.website}
      </p> */}
    </div>
  );
}

export default User;
