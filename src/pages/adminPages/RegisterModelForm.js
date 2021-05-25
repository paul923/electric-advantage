import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/AdminUseForm';
import * as vehicleService from "./vehicleService";
import InputLabel from '@material-ui/core/InputLabel';
import {
    getMakeList,
    registerModelWithMakeID,
    updateVehicleModel,
  } from "../../api/VehicleAPI";
import { Select, MenuItem } from "@material-ui/core";

const initialFValues = {
    id: 0,
    ModelID: '',  
    ModelName: '',
    MakeID: ''
}


export default function RegisterModelForm(props) {
    const { addOrEdit, recordForEdit } = props
    const [makeID, setMakeID] = React.useState("");
    const [makeName, setMakeName] = React.useState("");
    const [modelID, setModelID] = React.useState("");
    const [modelName, setModelName] = React.useState("");
  
    // let makeIDList = [];

    const [id, setID] = React.useState("");

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

    async function onClickUpdateVehicleModel() {
      let makeid = makeID;
      let modelid = modelID;
      let modelname = modelName;
      let modelObj = {
        MakeID: makeid,
        ModelID: modelid,
        ModelName: modelname,
      }
      let result = await updateVehicleModel(makeid, modelid, modelObj);
      alert(`Status : ${result.status}, ${result.body}`);
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
    
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    async function onLoadGetMakeList() {
        let resultMakeList = await getMakeList();
        let statusCode = resultMakeList.status;
        if (statusCode === 200) {
          let body = resultMakeList.body;
          setMakeList(body);
        } else {
          alert(`Status : ${statusCode}, ${resultMakeList.error}`);
        }
    }

    // makeIDList = makeList.map((m) => {
    //     return {
    //         makeID: m["MakeID"],
    //     };
    // });

    async function onClickRegisterModelWithMakeID() {
        let modelObj = {
            ModelID: modelID,
            ModelName: modelName,
        };
        let result = await registerModelWithMakeID(modelObj, makeID);
        alert(`Status : ${result.status}, ${result.body}`);
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])
  
  
    const vehiclesList = () => {
      return (
        <div>
          <InputLabel>Choose Make: </InputLabel>
          <Select
            open={makeOpen}
            onClose={() => setMakeOpen(false)}
            onOpen={() => setMakeOpen(true)}
            value={selectedMakeID}
            onChange={(event) => {
              setSelectedMakeID(event.target.value);
              setMakeID(event.target.value);
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

          <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                   
                    
                        label="Model ID"
                        // value={id}
                        // onChange={(event) => setID(event.target.value)}
                        value={modelID}
                        onChange={(event) => setModelID(event.target.value)}
                    />
                    <Controls.Input
                        label="Model Name"
                        value={modelName}
                        onChange={(event) => setModelName(event.target.value)}
                    />
                   
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" 
                            onClick= {() => onClickRegisterModelWithMakeID()} />
                         <Controls.Button
                                type="update"
                                text="Update"
                                onClick= {() => onClickUpdateVehicleModel()} />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
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