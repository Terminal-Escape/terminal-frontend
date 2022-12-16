const fetch = require("cross-fetch");
const API_URL = "https://terminalescaperoom.herokuapp.com";

async function fetchRoom() {
  const response = await fetch(`${API_URL}/api/v1/rooms`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

async function fetchUserItem() {
  const response = await fetch(`${API_URL}/api/v1/userItem`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

async function fetchItemsTable() {
  const response = await fetch(`${API_URL}/api/v1/items`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

// async function fetchUser() {
//   const response = await fetch(`${API_URL}/api/v1/Users`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',

//     },
//   });
//   const data = await response.json();
//   return data;
// }

// async function createUser() {
//   const response = await fetch(`${API_URL}/api/v1/Users`, {
//     method: 'PUT',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   });
//   const data = await response.json();
//   return data;
// }

module.exports = { fetchRoom, fetchUserItem, fetchItemsTable };
