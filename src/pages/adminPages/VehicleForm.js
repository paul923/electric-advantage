import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/AdminUseForm';
import * as vehicleService from "./vehicleService";




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
}

export default function VehicleForm(props) {
    const { addOrEdit, recordForEdit } = props

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

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
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
    )
}
