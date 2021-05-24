import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/AdminUseForm';
import * as vehicleService from "./vehicleService";
import { Select, MenuItem } from "@material-ui/core";
import {
    getMakeList,
    getModelListByMakeID,
    registerVehicleToDatabase,
 } from "../../api/VehicleAPI";

const initialFValues = {
    
    id: 0,
    vehicleID: '',
    modelID: '',
    priceLower: '',
    priceUpper: '',
    evRange: '',
    batterySize: '',
    trim: '',
    year: '', 
    MakeID: '' 
}

export default function VehicleForm(props) {
    const { addOrEdit, recordForEdit } = props
    const [carModel, setCarModel] = React.useState("");
    const [makeList, setMakeList] = React.useState([]);
    const [selectedMake, setSelectedMake] = React.useState("1");
    const [modelList, setModelList] = React.useState([]);
    const [selectedModel, setSelectedModel] = React.useState("1");
    const [makeID, setMakeID] = React.useState("");

    const [makeOpen, setMakeOpen] = React.useState(false);

    const [selectedMakeID, setSelectedMakeID] = React.useState("");

    React.useEffect(() => {
        onLoadGetMakeList();
        getModelList();
    }, []);

    React.useEffect(() => {
        getModelList();
    }, selectedMake);

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

    async function getModelList() {
        let resultModelList = await getModelListByMakeID(selectedMake);
        let statusCode = resultModelList.status;
        if (statusCode === 200) {
          let body = resultModelList.body;
          setModelList(body);
          setCarModel(resultModelList.body[0].ModelName);
          setSelectedModel(resultModelList.body[0].ModelID);
        } else {
          alert(`Status : ${statusCode}, ${resultModelList.error}`);
        }
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('carID' in fieldValues)
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
                    {/* <label>
                        Make:
                        <select>
                            <option value="grapefruit">Grapefruit</option>
                            <option value="lime">Lime</option>
                            <option value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                        </select>
                    </label> */}
                    
                    <Controls.Input
                        label="Vehicle ID"
                        value={values.vehicleID}
                        onChange={handleInputChange}
                        error={errors.vehicleID}
                    />
                    <Controls.Input
                        label="Model ID"
                        value={values.modelID}
                        onChange={handleInputChange}
                        
                    />
                    <Controls.Input
                        label="Price Lower"
                        value={values.priceLower}
                        onChange={handleInputChange}
                       
                    />
                    <Controls.Input
                        label="Price Upper"
                        value={values.priceUpper}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="EV Range"
                        value={values.evRange}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Battery Size"
                        value={values.batterySize}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Trim"
                        value={values.trim}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Year"
                        value={values.year}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    
                    
                    

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
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

    return (
        <div>  
          {vehiclesList()}
       
        </div>
      );
    }
    