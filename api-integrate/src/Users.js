import React, { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  // Result value
  const [users, setUsers] = useState(null);
  // loading
  const [loading, setLoading] = useState(false);
  // Error
  const [error, setError] = useState(null);

  // Rendering
  useEffect(() => {
    // axios
    const fetchUsers = async () => {
      try {
        setUsers(null);
        setError(null);
        setLoading(true); // user start(1)
      } catch (e) {}
    };
  }, []);
  return <div></div>;
}

export default Users;
