import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/AdminUseForm';
import { Select, MenuItem } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import {
    getMakeList,
    getModelListByMakeID,
    registerVehicleToDatabase,
    updateVehicleByID,
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
    const [makeList, setMakeList] = React.useState([]);
    const [modelList, setModelList] = React.useState([]);
    const [makeOpen, setMakeOpen] = React.useState(false);
    const [modelOpen, setModelOpen] = React.useState(false);
    const [selectedMakeID, setSelectedMakeID] = React.useState("");
    const [selectedModelID, setSelectedModelID] = React.useState("");
    const [vehicleID, setVehicleID] = React.useState("");
    const [evRange, setEVRange] = React.useState("");
    const [batterySize, setBatterySize] = React.useState("");
    const [trim, setTrim] = React.useState("");
    const [year, setYear] = React.useState("");
    const [updateModelID, setUpdateModelID] = React.useState("");
    const [updateVehicleID, setUpdateVehicleID] = React.useState("");
    const [updateEvRange, setUpdateEvRange] = React.useState("");
    const [updateBatterySize, setUpdateBatterySize] = React.useState("");
    const [updateTrim, setUpdateTrim] = React.useState("");
    const [updateYear, setUpdateYear] = React.useState("");
    const [disabled, setDisabled] = React.useState(false);

    React.useEffect(() => {
        onLoadGetMakeList();
        onSelectGetModelList();
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

    async function onSelectGetModelList(makeID) {
        let resultModelList = await getModelListByMakeID(makeID);
        let statusCode = resultModelList.status;
        if (statusCode === 200) {
          let body = resultModelList.body;
          setModelList(body);
        } else {
          setModelList();
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
        console.log(`Status : ${result.status}, ${result.body}`);
    }

    async function onClickUpdateVehicleByID() {
        let vehicleObj = {
          VehicleID: updateVehicleID,
          ModelID: updateModelID,
          EVRange: updateEvRange,
          BatterySize: updateBatterySize,
          Trim: updateTrim,
          Year: updateYear,
        };
        let result = await updateVehicleByID(vehicleObj);
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
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = async e => {
        e.preventDefault()
        await recordForEdit === null ? onClickRegisterVehicleToDatabase() : onClickUpdateVehicleByID()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            recordForEdit && setSelectedMakeID(recordForEdit.MakeID)
            recordForEdit && setSelectedModelID(recordForEdit.ModelID)
            recordForEdit && setUpdateModelID(recordForEdit.ModelID)
            recordForEdit && setUpdateVehicleID(recordForEdit.VehicleID)
            recordForEdit && setUpdateEvRange(recordForEdit.EVRange)
            recordForEdit && setUpdateBatterySize(recordForEdit.BatterySize)
            recordForEdit && setUpdateTrim(recordForEdit.Trim)
            recordForEdit && setUpdateYear(recordForEdit.Year)
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
                        {
                          recordForEdit === null ? (<div>
                        <InputLabel>Choose Make:</InputLabel>
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
                              <MenuItem key={index} value={model.ModelID}>
                                {model.ModelName}
                              </MenuItem>
                              );
                            })}
                        </Select>
                        <br/>
                        <br/>
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
                        </div>) : 
                        <div>
                        <Controls.Input
                            label="Model ID"
                            value={recordForEdit && updateModelID}
                            disabled={true}
                        />
                        <Controls.Input
                            label="Vehicle ID"
                            value={recordForEdit && updateVehicleID}
                            disabled={true}
                        />
                        <Controls.Input
                            label="EV Range"
                            value={recordForEdit && updateEvRange}
                            onChange={(event) => setUpdateEvRange(event.target.value)}
                        />
                        <Controls.Input
                            label="Battery Size"
                            value={recordForEdit && updateBatterySize}
                            onChange={(event) => setUpdateBatterySize(event.target.value)}
                        />
                        <Controls.Input
                            label="Trim"
                            value={recordForEdit && updateTrim}
                            onChange={(event) => setUpdateTrim(event.target.value)}
                        />
                        <Controls.Input
                            label="Year"
                            value={recordForEdit && updateYear}
                            onChange={(event) => setUpdateYear(event.target.value)}
                        />
                        </div>
                        }
                    </Grid>
                    <Grid item xs={6}>       
                      <div>
                              {recordForEdit === null ?
                              <Controls.Button
                                  type="submit"
                                  text="Submit" /> :
                              <Controls.Button
                              type="submit"
                              text="Update" />}
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