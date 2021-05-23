import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/AdminUseForm';
import * as vehicleService from "./vehicleService";




const initialFValues = {
    
    id: 0,
    MakeID: '',
    ModelID: '',
    ModelName: '',
}

export default function RegisterModelForm(props) {
    const { addOrEdit, recordForEdit } = props

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
                        value={values.MakeID}
                        onChange={handleInputChange}
                        
                    />
                    <Controls.Input
                        label="Model ID"
                        value={values.ModelID}
                        onChange={handleInputChange}
                       
                    />
                    <Controls.Input
                        label="Model Name"
                        value={values.ModelName}
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
    )
}
