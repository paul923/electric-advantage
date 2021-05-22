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

/**
 * Retrieves inventory item by inventoryID
 * @returns inventory object
 */
export async function getInventoryByInventoryID(inventoryID) {
  try {
    console.log(`Retrieving inventory item with ${inventoryID}`);
    let url = `http://${database}:3000/inventories/${inventoryID}`;
    let response = await fetch(url);
    let json = await response.json();
    json["status"] = response.status;
    console.log(`Retrieved ${JSON.stringify(json.body, null, 4)}`);
    return json;
  } catch (error) {
    console.log(error);
  }
}
