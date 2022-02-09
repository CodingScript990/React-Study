import axios from "axios";

// async export getUsers function(users)
export async function getUsers() {
  // response api url
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  // return response data
  return response.data;
}

// async export getUser function(user)
export async function getUser(id) {
  // parameter(id)
  // response url
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  // return response data
  return response.data;
}
