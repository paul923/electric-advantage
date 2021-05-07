import { database } from "../constants/Environment";

export async function getUsersList() {
  try {
    console.log(`Retrieving all the users`);
    let url = `http://${database}:3000/users`;
    let response = await fetch(url);
    let json = await response.json();
    json["status"] = response.status;
    console.log(`Retrieved ${json.body}`);
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserByUserId(userId) {
  try {
    console.log(`Retrieving user ${userId}`);
    let url = `http://${database}:3000/users/${userId}`;
    let response = await fetch(url);
    let json = await response.json();
    json["status"] = response.status;
    console.log(`Retrieved ${json.body}`);
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(User) {
  try {
    let response = await fetch(`http://${database}:3000/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(User),
    });
    let json = await response.json();
    json["status"] = response.status;
    return json;
  } catch (error) {
    return false;
  }
}
