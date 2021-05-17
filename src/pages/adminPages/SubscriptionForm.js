import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/AdminUseForm';
import * as subscriptionService from "./subscriptionService";




const initialFValues = {
   
    id: 0,
    dealerID: '',
    planID: '',
    subPlan: '',
    pricing: '',
    recurring: '',
    missed: '',
  
}

export default function SubscriptionForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('dealerID' in fieldValues)
            temp.dealerID = fieldValues.dealerID ? "" : "This field is required."
    
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
                        name="dealerID"
                        label="Dealer ID"
                        value={values.dealerID}
                        onChange={handleInputChange}
                        error={errors.dealerID}
                    />
                    <Controls.Input
                        label="Plan ID"
                        name="planID"
                        value={values.planID}
                        onChange={handleInputChange}
                        
                    />
                    <Controls.Input
                        label="Subscription Plan"
                        name="subPlan"
                        value={values.subPlan}
                        onChange={handleInputChange}
                       
                    />
                    <Controls.Input
                        label="Pricing"
                        name="pricing"
                        value={values.pricing}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Recurring"
                        name="recurring"
                        value={values.recurring}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Missed"
                        name="missed"
                        value={values.missed}
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
                            color="success"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
