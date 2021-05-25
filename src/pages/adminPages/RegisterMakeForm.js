import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/AdminUseForm';
import * as vehicleService from "./vehicleService";

import { 
    registerMake,
    updateVehicleMake,
} from "../../api/VehicleAPI";


const initialFValues = {
    id: 0,
    MakeID: '',  
    MakeName: '',  
}

export default function RegisterMakeForm(props) {
    const { addOrEdit, recordForEdit } = props
    const [id, setID] = React.useState("");
    const [name, setName] = React.useState("");

    async function onClickRegisterMake() {
        let makeObj = {
            MakeID: id,
            MakeName: name,
        };
        let result = await registerMake(makeObj);
        alert(`Status : ${result.status}, ${result.body}`);
    }

    async function onClickUpdateVehicleMake() {
        let makeObj = {
            MakeID: id,
            MakeName: name,
        };
        let result = await updateVehicleMake(id, makeObj);
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
                        value={id}
                        onChange={(event) => setID(event.target.value)}
                    />
                    <Controls.Input
                        label="Make Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                   
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit"
                            onClick= {() => onClickRegisterMake()} />
                        <Controls.Button
                                type="update"
                                text="Update"
                                onClick= {() => onClickUpdateVehicleMake()} />
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
