import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/AdminUseForm';
import * as vehicleService from "./vehicleService";

import {
    getMakeList,
    registerModelWithMakeID
  } from "../../api/VehicleAPI";
import { Select, MenuItem } from "@material-ui/core";

const initialFValues = {
    id: 0,
    ModelID: '',  
    MakeName: '',
    MakeID: ''
}


export default function RegisterModelForm(props) {
    const { addOrEdit, recordForEdit } = props
    const [id, setID] = React.useState("");
    const [makeName, setMakeName] = React.useState("");
    const [modelID, setModelID] = React.useState("");
    const [makeID, setMakeID] = React.useState("");

    const [makeOpen, setMakeOpen] = React.useState(false);
    const [makeList, setMakeList] = React.useState("");
    const [selectedMakeID, setSelectedMakeID] = React.useState("");
  
    React.useEffect(() => {
      onLoadGetMakeList();

    }, []);
  

    async function onClickRegisterModelWithMakeID() {
        let modelObj = {
            ModelID: id,
            MakeName: makeName,
        };
        let result = await registerModelWithMakeID(modelObj);
        alert(`Status : ${result.status}, ${result.body}`);
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


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('MakeID' in fieldValues)
            temp.carID = fieldValues.carID ? "" : "This field is required."
    
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
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

<Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Model ID"
                        value={id}
                        onChange={(event) => setID(event.target.value)}
                    />
                    <Controls.Input
                        label="Make Name"
                        value={makeName}
                        onChange={(event) => setMakeName(event.target.value)}
                    />
                   
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit"
                            onClick= {() => 
                                onClickRegisterModelWithMakeID()} />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
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
  