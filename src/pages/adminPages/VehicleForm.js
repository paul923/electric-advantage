import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/AdminUseForm';
import * as vehicleService from "./vehicleService";
import { Select, MenuItem } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import {
    getMakeList,
    getModelListByMakeID,
    registerVehicleToDatabase,
 } from "../../api/VehicleAPI";

const initialFValues = {
    
    id: 0,
    VehicleID: '',
    ModelID: '',
    EVRange: '',
    BatterySize: '',
    Trim: '',
    Year: '', 
}

export default function VehicleForm(props) {
    const { addOrEdit, recordForEdit } = props
    const [carModel, setCarModel] = React.useState("");
    const [makeList, setMakeList] = React.useState([]);
    const [selectedMake, setSelectedMake] = React.useState("1");
    const [modelList, setModelList] = React.useState([]);
    const [selectedModel, setSelectedModel] = React.useState("1");
    const [makeID, setMakeID] = React.useState("");
    
    const [model, setModel] = React.useState("");

    const [makeOpen, setMakeOpen] = React.useState(false);
    const [modelOpen, setModelOpen] = React.useState(false);

    const [selectedMakeID, setSelectedMakeID] = React.useState("");
    const [selectedModelID, setSelectedModelID] = React.useState("");

    const [vehicleID, setVehicleID] = React.useState("");
    const [evRange, setEVRange] = React.useState("");
    const [batterySize, setBatterySize] = React.useState("");
    const [trim, setTrim] = React.useState("");
    const [year, setYear] = React.useState("");

    React.useEffect(() => {
        onLoadGetMakeList();
        getModelList();
    }, []);

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

    async function onClickRegisterVehicleToDatabase() {
        let vehicleObj = {
            VehicleID: vehicleID,
            ModelID: selectedModelID,
            EVRange: evRange,
            BatterySize: batterySize,
            Trim: trim,
            Year: year,
        };
        let result = await registerVehicleToDatabase(vehicleObj);
        alert(`Status : ${result.status}, ${result.body}`);
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
            <Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                        <InputLabel>Choose Make:</InputLabel>
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
                        <br />
                        <br />
                        <InputLabel>Choose Model:</InputLabel>
                        <Select
                            open={modelOpen}
                            onClose={() => setModelOpen(false)}
                            onOpen={() => setModelOpen(true)}
                            value={selectedModelID}
                            onChange={(event) => {
                                setSelectedModelID(event.target.value);
                            }}
                        >
                                {modelList && 
                                    modelList.map((model, index) => {
                                        return (
                                            <MenuItem key={model.ModelID} value={model.ModelID}>
                                                {model.ModelName}
                                            </MenuItem>
                                        );
                                    })
                                }
                        </Select>
                        <br />
                        <br />
                        <Controls.Input
                            label="Vehicle ID"
                            value={vehicleID}
                            onChange={(event) => setVehicleID(event.target.value)}
                            error={errors.vehicleID}
                        />
                        <Controls.Input
                            label="EV Range"
                            value={evRange}
                            onChange={(event) => setEVRange(event.target.value)}
                        />
                        <Controls.Input
                            label="Battery Size"
                            value={batterySize}
                            onChange={(event) => setBatterySize(event.target.value)}
                        />
                        <Controls.Input
                            label="Trim"
                            value={trim}
                            onChange={(event) => setTrim(event.target.value)}
                        />
                        <Controls.Input
                            label="Year"
                            value={year}
                            onChange={(event) => setYear(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        
                        <div>
                            <Controls.Button
                                type="submit"
                                text="Submit"
                                onClick= {() => onClickRegisterVehicleToDatabase()} />
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
    