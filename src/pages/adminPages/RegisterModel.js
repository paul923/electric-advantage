import React, { useState } from 'react'
import VehicleForm from "./VehicleForm";
import RegisterModelForm from "./RegisterModelForm";
import PageHeader from "../../components/AdminPageHeader";
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from  "../../components/AdminUseTable";
import * as vehicleService from "./vehicleService";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/AdminPopup";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/AdminNotification";
import ConfirmDialog from "../../components/AdminConfirmDialog";
import Popup3 from "../../components/AdminPopup3";
import {
    getMakeList,
    registerMake,
    getModelListByMakeID,
    registerModelWithMakeID,
    getVehicleListByMakeIDAndModelID,
    getAllAvailableVehicles,
    registerVehicleToDatabase,
    deleteVehicleByID,
    updateVehicleByID,
 } from "../../api/VehicleAPI";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(1)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'Make', label: 'Make' },
    { id: 'ModelID', label: 'Model ID' },
    { id: 'MakeName', label: 'Make Name' },
    
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Vehicles() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(vehicleService.getAllVehicles())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [recordForEdit3, setRecordForEdit3] = useState(null)

    const [openPopup3, setOpenPopup3] = useState(false)

    const [vehicles, setVehicles] = React.useState([]);
    const [vehicleList, setVehicleList] = React.useState([]);
    const [vehicleID, setVehicleID] = React.useState("");

    async function onClickDeleteVehicleByID() {
        let vID = vehicleID;
        let result = await deleteVehicleByID(vID);
        alert(`Status : ${result.status}, ${result.body}`);
    }

    let resultVehicles = [];

    React.useEffect(() => {
        onLoadGetAllAvailableVehicles();
    }, []);

    async function onLoadGetAllAvailableVehicles() {
        resultVehicles = await getAllAvailableVehicles();
        let statusCode = resultVehicles.status;
        if (statusCode === 200) {
            let body = resultVehicles.body;
            
            if (resultVehicles["body"] != undefined) {
                setVehicleList(
                    resultVehicles["body"].map((v) => {
                        return {
                            Make: v["Make"],
                            ModelID: v["ModelID"],
                            MakeName: v["MakeName"],
                           
                        };
                    })
                );
            } else setVehicleList([]);

            setVehicles(body);
        } else {
            alert(`Status : ${statusCode}, ${resultVehicles.error}`);
        }
    }



    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.ModelID.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (vehicle, resetForm) => {
        if (vehicle.id == 0)
        vehicleService.insertVehicle(vehicle)
        else
        vehicleService.updateVehicle(vehicle)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setOpenPopup3(false)
        setRecords(vehicleService.getAllVehicles())
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
        setOpenPopup3(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    return (
        <>
            <PageHeader
                title="Register Model"
              
                icon={<LaptopMacIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Model Database"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Register Model"
                        color="#841584"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        // onClick={event =>  window.location.href='/4'}
                        onClick={() => { setOpenPopup3(true); setRecordForEdit3(null); }}
                    />
                    
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            vehicleList.map(v =>
                                (<TableRow key={v.id}>
                                    <TableCell>{v.Make}</TableCell>
                                    <TableCell>{v.MakeID}</TableCell>
                                    <TableCell>{v.MakeName}</TableCell>
                                    
                                    <TableCell>
                                        <Controls.ActionButton
                                            //edit button color
                                            color="success"
                                            onClick={() => { openInPopup(v) }}>
                                            <EditIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Confirm you wish to delete',
                                                    subTitle: "You cannot undo this",
                                                    onConfirm: () => { 
                                                        setVehicleID(vehicleID); 
                                                        onClickDeleteVehicleByID();
                                                        onDelete(); }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Register Model"
                openPopup={openPopup3}
                setOpenPopup={setOpenPopup3}
            >
                <RegisterModelForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
           
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
