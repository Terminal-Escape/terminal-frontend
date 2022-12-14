const fetch = require("cross-fetch");
// const cookie = require("cookie");
const chalk = require("chalk");

async function signUpUser(userName, password) {
    const resp = await fetch(`${process.env.API_URL}/api/v1/users`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
        credentials: "include",
    });
    const data = await resp.json();
    if(!resp.ok) {
        throw new Error(data.message);
    }
}

async function signInUser(userName, password) {
    const resp = await fetch(`${process.env.API_URL}/api/v1/users/sessions`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
        credentials: "include",
    });
    const data = await resp.json();
    if (!resp.ok) {
        throw new Error(data.message);
    }
}

module.exports = { signInUser, signUpUser };