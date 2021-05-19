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

/**
 *
 * @param {"MakeID": string,
 *         "MakeName": string} make
 * @returns json object
 */
export async function registerMake(make) {
  try {
    console.log(`Registering make with ID: ${make.makeID}`);
    let url = `http://${database}:3000/make`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(make),
    });
    let json = await response.json();
    json["status"] = response.status;
    console.log(json.body);
    return json;
  } catch (error) {
    return false;
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

/**
 *
 * @param {"ModelID": string,
 *         "ModelName": string} model
 * @returns
 */
export async function registerModelWithMakeID(model, makeID) {
  try {
    console.log(`Registering a new model to MakeID: ${makeID}`);
    let url = `http://${database}:3000/makes/${makeID}/models`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(model),
    });
    let json = await response.json();
    json["status"] = response.status;
    console.log(json.body);
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
    console.log(`Retrieved ${JSON.stringify(json.body, null, 4)}`);
    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 * @param {string} makeID
 * @param {float} evRange
 * @param {float} startPrice
 * @param {int} conditionID
 * @param {float} lat
 * @param {float} lng
 * @returns array of vehicle inventory objects
 */
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

/**
 * Retrieves all inventory items those belong to specific dealership
 * @param {string} dealershipID
 * @returns inventory item objects array
 */
export async function getInventoryByDealershipID(dealershipID) {
  try {
    console.log(`Retrieving all inventory items belong to ${dealershipID}`);
    let url = `http://${database}:3000/inventories/${dealershipID}`;
    let response = await fetch(url);
    let json = await response.json();
    json["status"] = response.status;
    console.log(`Retrieved ${JSON.stringify(json.body, null, 4)}`);
    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Retrieves all dealership information
 * @returns dealership object array
 */
export async function getAllDealerships() {
  try {
    console.log(`Retrieving all dealership information`);
    let url = `http://${database}:3000/dealerships`;
    let response = await fetch(url);
    let json = await response.json();
    json["status"] = response.status;
    console.log(`Retrieved ${JSON.stringify(json.body, null, 4)}`);
    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Retrieves all available colors in the database
 * @returns color objects array
 */
export async function getColors() {
  try {
    console.log(`Retrieving all available colors`);
    let url = `http://${database}:3000/colors`;
    let response = await fetch(url);
    let json = await response.json();
    json["status"] = response.status;
    console.log(`Retrieved ${JSON.stringify(json.body, null, 4)}`);
    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Add bulk of vehicles to inventory database.
 * @param {
 *        [{"VehicleID": string,
 *         "DealershipID": string,
 *         "ColorID": string,
 *         "ConditionID": int,
 *         "StartPrice": float,
 *         "Odometer": float,
 *         "Quantity" : int}]
 *        } vehicleArray
 * @returns message string
 */
export async function addInventoryItemToDealership(vehicleArray) {
  try {
    console.log(`Registering items to the dealership`);
    let url = `http://${database}:3000/inventories`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleArray),
    });
    let json = await response.json();
    json["status"] = response.status;
    console.log(json.body);
    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Retrieves all available vehicles in the database
 * @returns
 */
export async function getAllAvailableVehicles() {
  try {
    console.log(`Retrieving all available vehicles`);
    let url = `http://${database}:3000/vehicles`;
    let response = await fetch(url);
    let json = await response.json();
    json["status"] = response.status;
    console.log(`Retrieved ${JSON.stringify(json.body, null, 4)}`);
    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Add vehicle to the database.
 * @param {"VehicleID": string,
 *        "EVRange" : float,
 *        "BatterySize" : float,
 *        "Trim" : string,
 *        "Year" : int,
 *        "ModelID" : int} vehicle
 * @returns string message
 */
export async function registerVehicleToDatabase(vehicle) {
  try {
    console.log(`Registering vehicle to the database`);
    let url = `http://${database}:3000/vehicles`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicle),
    });
    let json = await response.json();
    json["status"] = response.status;
    console.log(json.body);
    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Delete available vehicle found with VehicleID.
 * @param {string} vehicleID
 * @returns message string
 */
export async function deleteVehicleByID(vehicleID) {
  try {
    console.log(`Deleting vehicle from the database`);
    let url = `http://${database}:3000/vehicles/${vehicleID}`;
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let json = await response.json();
    json["status"] = response.status;
    console.log(json.body);
    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Updates the vehicle's attribute found with VehicleID.
 * @param {"VehicleID" : string,
 *         "EVRange" : float,
 *         "BatterySize" : float,
 *         "Trim" : string,
 *         "Year" : int,
 *         "ModelID" : int
 *        } vehicle
 * @returns
 */
export async function updateVehicleByID(vehicle) {
  try {
    console.log(
      `Updating vehicle with ID: ${vehicle.VehicleID} from the database`
    );
    let url = `http://${database}:3000/vehicles/${vehicle.VehicleID}`;
    let response = await fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicle),
    });
    let json = await response.json();
    json["status"] = response.status;
    console.log(json.body);
    return json;
  } catch (error) {
    console.log(error);
  }
}
