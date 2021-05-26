import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/AdminUseForm';
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
    const { addOrEdit, recordForEdit } = props;
    const [updateID, setUpdateID] = React.useState("");
    const [updateName, setUpdateName] = React.useState("");
    const [id, setID] = React.useState("");
    const [name, setName] = React.useState("");

    async function onClickRegisterMake() {
        let makeObj = {
            MakeID: id,
            MakeName: name,
        };
        let result = await registerMake(makeObj);
        console.log(`Status : ${result.status}, ${result.body}`);
    }

    async function onClickUpdateVehicleMake() {
        let makeObj = {
            MakeID: updateID,
            MakeName: updateName,
        };
        let result = await updateVehicleMake(updateID, makeObj);
        console.log(`Status : ${result.status}, ${result.body}`);
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
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = async e => {
        e.preventDefault()
        await recordForEdit === null ? onClickRegisterMake() : onClickUpdateVehicleMake()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit !== null)
            recordForEdit && setUpdateID(recordForEdit.MakeID)
            recordForEdit && setUpdateName(recordForEdit.MakeName)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    {
                        recordForEdit === null ? (<div>
                            <Controls.Input
                            label="Make ID"
                            value={id}
                            onChange={(event) => setID(event.target.value)}
                            />
                            <Controls.Input
                                label="Make Name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            /></div>) : 
                            <div>
                            {/* <Controls.Input
                                label="Make ID"
                                value={recordForEdit && updateID}
                                onChange={(event) => setUpdateID(event.target.value)}
                            /> */}
                            <Controls.Input
                                label="Make Name"
                                value={recordForEdit&&updateName}
                                onChange={(event) => setUpdateName(event.target.value)}
                            /></div>
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
    )
}
