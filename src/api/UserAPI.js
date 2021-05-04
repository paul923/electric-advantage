import { database } from "../constants/Environment";

export async function getUsersList() {
  try {
    console.log(`Retrieving all the users`);
    let url = `http://${database}:3000/users`;
    let response = await fetch(url);
    console.log(response);
    let json = await response.json();
    console.log(json.body[0]);
    return json.body;
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
    return json.body[0];
  } catch (error) {
    console.log(error);
  }
}
