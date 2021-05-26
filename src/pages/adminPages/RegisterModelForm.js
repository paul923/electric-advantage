import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/AdminUseForm';
import InputLabel from '@material-ui/core/InputLabel';
import { Select, MenuItem } from "@material-ui/core";
import {
    getMakeList,
    registerModelWithMakeID,
    updateVehicleModel,
  } from "../../api/VehicleAPI";

const initialFValues = {
    id: 0,
    ModelID: '',  
    ModelName: '',
    MakeID: ''
}

export default function RegisterModelForm(props) {
    const { addOrEdit, recordForEdit } = props
    const [makeID, setMakeID] = React.useState("");
    const [selectedMakeID, setSelectedMakeID] = React.useState("");
    const [modelID, setModelID] = React.useState("");
    const [modelName, setModelName] = React.useState("");
    const [updateMakeID, setUpdateMakeID] = React.useState("");
    const [updateSelectedMakeID, setUpdateSelectedMakeID] = React.useState("");
    const [updateModelID, setUpdateModelID] = React.useState("");
    const [updateModelName, setUpdateModelName] = React.useState("");
    const [makeOpen, setMakeOpen] = React.useState(false);
    const [makeList, setMakeList] = React.useState("");

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

    async function onClickRegisterModelWithMakeID() {
        let modelObj = {
            ModelID: modelID,
            ModelName: modelName,
        };
        let result = await registerModelWithMakeID(modelObj, makeID);
        console.log(`Status : ${result.status}, ${result.body}`);
    }

    async function onClickUpdateVehicleModel() {
      let makeid = updateMakeID;
      let modelid = updateModelID;
      let modelname = updateModelName;
      let modelObj = {
        MakeID: makeid,
        ModelID: modelid,
        ModelName: modelname,
      }
      let result = await updateVehicleModel(makeid, modelid, modelObj);
      console.log(`Status : ${result.status}, ${result.body}`);
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
        await recordForEdit === null ? onClickRegisterModelWithMakeID() : onClickUpdateVehicleModel()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            recordForEdit && setUpdateMakeID(recordForEdit.MakeID)
            recordForEdit && setUpdateModelID(recordForEdit.ModelID)
            recordForEdit && setUpdateModelName(recordForEdit.ModelName)
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
                    <br />
                    <br />
                    <Controls.Input
                        label="Model ID"
                        value={modelID}
                        onChange={(event) => setModelID(event.target.value)}
                    />
                    <Controls.Input
                        label="Model Name"
                        value={modelName}
                        onChange={(event) => setModelName(event.target.value)}
                    />
                  </div>) : 
                  <div>
                  {/* <InputLabel>Make: </InputLabel> */}
                  {/* <Select
                    open={makeOpen}
                    onClose={() => setMakeOpen(false)}
                    onOpen={() => setMakeOpen(true)}
                    value={recordForEdit && updateSelectedMakeID}
                    onChange={(event) => {
                      setUpdateSelectedMakeID(event.target.value);
                      setUpdateMakeID(event.target.value);
                    }}
                  >
                    {makeList &&
                      makeList.map((make, index) => {
                        return (
                          <MenuItem key={make.SelectedMakeID} value={make.SelectedMakeID}>
                            {updateSelectedMakeID}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <br />
                  <br /> */}
                  {/* <Controls.Input
                      label="Model ID"
                      value={recordForEdit && updateModelID}
                      onChange={(event) => setUpdateModelID(event.target.value)}
                  /> */}
                  <Controls.Input
                      label="Model Name"
                      value={recordForEdit && updateModelName}
                      onChange={(event) => setUpdateModelName(event.target.value)}
                  />
                </div>
                  }  
                </Grid>
                <Grid item xs={6}>
                    <div>
                      {recordForEdit === null ?
                      <Controls.Button
                        type="submit"
                        text="Submit"/> : 
                      <Controls.Button
                          type="submit"
                          text="Update"/>}
                        
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