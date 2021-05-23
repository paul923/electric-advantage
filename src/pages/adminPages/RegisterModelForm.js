import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/AdminUseForm';
import * as vehicleService from "./vehicleService";

import {
    getMakeList,
    getModelListByMakeID,
    getVehicleListByMakeIDAndModelID,
    getVehicleSearchResult,
  } from "../../api/VehicleAPI";
import { Select, MenuItem } from "@material-ui/core";




// const initialFValues = {
    
//     id: 0,
//     MakeID: '',
//     ModelID: '',
//     ModelName: '',
// }

export default function RegisterModelForm(props) {
    const [makeOpen, setMakeOpen] = React.useState(false);
    const [makeList, setMakeList] = React.useState("");
    const [modelList, setModelList] = React.useState("");
    const [selectedMakeID, setSelectedMakeID] = React.useState("");
  
    React.useEffect(() => {
      onLoadGetMakeList();
      onLoadGetVehicleSearchResult();
    }, []);
  
    async function onLoadGetVehicleSearchResult() {
      let resultSearch = await getVehicleSearchResult(
        1,
        400,
        30000,
        2,
        49.26324,
        -122.87704
      );
      console.log(resultSearch);
    }
  
    async function onLoadGetMakeList() {
      let resultMakeList = await getMakeList();
      let statusCode = resultMakeList.status;
      if (statusCode === 200) {
        let body = resultMakeList.body;
        console.log(body);
        setMakeList(body);
      } else {
        alert(`Status : ${statusCode}, ${resultMakeList.error}`);
      }
    }
  
    async function onSelectGetModelList(makeID) {
      let resultModelList = await getModelListByMakeID(makeID);
      let statusCode = resultModelList.status;
      if (statusCode === 200) {
        let body = resultModelList.body;
        console.log(body);
        setModelList(body);
      } else {
        alert(`Status : ${statusCode}, ${resultModelList.error}`);
      }
    }
  
          
  
    const vehiclesList = () => {
      return (
        <div>
          <Select
            open={makeOpen}
            onClose={() => setMakeOpen(false)}
            onOpen={() => setMakeOpen(true)}
            value={selectedMakeID}
            onChange={(event) => {
              setSelectedMakeID(event.target.value);
              onSelectGetModelList(event.target.value);
            }}
          >
            {makeList &&
              makeList.map((make, index) => {
                return (
                  <MenuItem key={make.MakeID} value={make.MakeID}>
                    {make.MakeName}
                  </MenuItem>
                );
              })}
          </Select>
          <div>
            {modelList &&
              modelList.map((model, index) => {
                return <div key={index}>{model.ModelName}</div>;
              })}
          </div>
        </div>
      );
    };
  
    const searchingForm = () => {
      return <div></div>;
    };
    return (
      <div>
       
  
        {vehiclesList()}
        {searchingForm()}
      </div>
    );
  }
  