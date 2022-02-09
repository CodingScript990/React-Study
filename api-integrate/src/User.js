import React, { useEffect } from "react";
import { getUser, useUsersDispatch, useUsersState } from "./UsersContext";

function User({ id }) {
  // promise[id]
  // state value
  const state = useUsersState();
  // dispatch value
  const dispatch = useUsersDispatch();

  // useEffect eventHandler
  useEffect(() => {
    getUser(dispatch, id);
  }, [dispatch, id]);

  // user state management
  const { loading, data: user, error } = state.user;

  // state loading?
  if (loading) return <div>loading...</div>;
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
      <p>
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
      </p>
    </div>
  );
}

export default User;
