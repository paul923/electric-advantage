import { database } from "../constants/Environment";

export async function getMakeList() {
  try {
    console.log(`Retrieving all the makes`);
    let url = `http://${database}:3000/makes`;
    let response = await fetch(url);
    let json = await response.json();
    json["status"] = response.status;
    console.log(`Retrieved ${JSON.stringify(json.body, null, 4)}`);
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function getModelListByMakeID(makeID) {
  try {
    console.log(`Retrieving all the models belongs to ${makeID}`);
    let url = `http://${database}:3000/makes/${makeID}/models`;
    let response = await fetch(url);
    let json = await response.json();
    json["status"] = response.status;
    console.log(`Retrieved ${JSON.stringify(json.body, null, 4)}`);
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function getVehicleListByMakeIDAndModelID(makeID, modelID) {
  try {
    console.log(`Retrieving all the vehicles belongs to ${modelID}`);
    let url = `http://${database}:3000/makes/${makeID}/models/${modelID}`;
    let response = await fetch(url);
    let json = await response.json();
    json["status"] = response.status;
    console.log(`Retrieved ${json.body}`);
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function getVehicleSearchResult(
  makeID,
  evRange,
  startPrice,
  conditionID,
  lat,
  lng
) {
  try {
    console.log(`Retrieving the vehicles in inventory.`);
    let url = `http://${database}:3000/inventories`;
    url += `?makeID=${makeID}`;
    url += `&evRange=${evRange}`;
    url += `&startPrice=${startPrice}`;
    url += `&conditionID=${conditionID}`;
    url += `&lat=${lat}`;
    url += `&lng=${lng}`;
    let response = await fetch(url);
    let json = await response.json();
    json["status"] = response.status;
    console.log(`Retrieved ${JSON.stringify(json.body, null, 4)}`);
    return json;
  } catch (error) {
    console.log(error);
  }
}

// export async function createUser(User) {
//   try {
//     let response = await fetch(`http://${database}:3000/users`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(User),
//     });
//     let json = await response.json();
//     json["status"] = response.status;
//     return json;
//   } catch (error) {
//     return false;
//   }
// }
