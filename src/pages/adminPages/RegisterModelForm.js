import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/AdminUseForm';
import * as vehicleService from "./vehicleService";

import { 
    registerModelWithMakeID,
    getMakeList, 
} from "../../api/VehicleAPI";


const initialFValues = {
    
    id: 0,
    MakeID: '',
    ModelID: '',
    ModelName: '',
}

export default function RegisterModelForm(props) {
    const { addOrEdit, recordForEdit } = props
    const [makeList, setMakeList] = React.useState([]);
    const [makeID, setMakeID] = React.useState("");
    const [modelID, setModelID] = React.useState("");
    const [modelName, setModelName] = React.useState("");

    let makeIDList = [];

    React.useEffect(() => {
        onLoadGetMakeList();
    }, []);

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('ModelID' in fieldValues)
            temp.carID = fieldValues.carID ? "" : "This field is required."
    
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

    makeIDList = makeList.map((m) => {
        return {
            makeID: m["MakeID"],
        };
    });

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

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Make ID"
                        value={makeID}
                        onChange={(event) => setMakeID(event.target.value)}
                        
                    />
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
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" 
                            onClick= {() => onClickRegisterModelWithMakeID()} />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
