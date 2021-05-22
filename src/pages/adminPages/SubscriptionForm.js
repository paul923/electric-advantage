import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/AdminUseForm';
import * as subscriptionService from "./subscriptionService";
import { SettingsBackupRestoreOutlined } from '@material-ui/icons';
import { createSubscriptionPlan } from "../../api/SubscriptionAPI";

const initialFValues = {
   
    id: 0,
    planID: '',
    planName: '',
    pricing: '',
}

export default function SubscriptionForm(props) {
    const { addOrEdit, recordForEdit } = props
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");

    async function onClickCreateSubscriptionPlan() {
        let subscriptionObj = {
            PlanName: name,
            Pricing: price,
        };
        let result = await createSubscriptionPlan(subscriptionObj);
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
                        label="Subscription Plan"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                       
                    />
                    <Controls.Input
                        label="Pricing"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit"
                            onClick={() => onClickCreateSubscriptionPlan()} />
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
