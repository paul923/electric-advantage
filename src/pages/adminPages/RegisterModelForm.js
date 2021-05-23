import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/AdminUseForm';
import * as vehicleService from "./vehicleService";

import {
    getMakeList
  } from "../../api/VehicleAPI";
import { Select, MenuItem } from "@material-ui/core";


export default function RegisterModelForm(props) {
    const [makeOpen, setMakeOpen] = React.useState(false);
    const [makeList, setMakeList] = React.useState("");
    const [selectedMakeID, setSelectedMakeID] = React.useState("");
  
    React.useEffect(() => {
      onLoadGetMakeList();

    }, []);
  
  
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
        </div>
      );
    };
  
    const searchingForm = () => {
      return <div>Make</div>;

      
    };
    return (
      <div>  
        {vehiclesList()}
        {searchingForm()}
      </div>
    );
  }
  