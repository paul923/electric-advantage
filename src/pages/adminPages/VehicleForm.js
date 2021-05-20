import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/AdminUseForm';
import * as vehicleService from "./vehicleService";




const initialFValues = {
    
    id: 0,
    carID: '',
    model: '',
    make: '',
    trim: '',
    evRange: '',
    priceLow: '',
    priceUp: '',
    perf1: '',
    perf2: '',
  
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
                        name="carID"
                        label="Car ID"
                        value={values.carID}
                        onChange={handleInputChange}
                        error={errors.carID}
                    />
                    <Controls.Input
                        label="Model"
                        name="model"
                        value={values.model}
                        onChange={handleInputChange}
                        
                    />
                    <Controls.Input
                        label="Make"
                        name="make"
                        value={values.make}
                        onChange={handleInputChange}
                       
                    />
                    <Controls.Input
                        label="Trim"
                        name="trim"
                        value={values.trim}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="EV Range"
                        name="evRange"
                        value={values.evRange}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Price Lower"
                        name="priceLow"
                        value={values.priceLow}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Price Upper"
                        name="priceUp"
                        value={values.priceUp}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Performance Figure 1"
                        name="perf1"
                        value={values.perf1}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Performance Figure 2"
                        name="perf2"
                        value={values.perf2}
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
