import React, { useState } from 'react'
import VehicleForm from "./VehicleForm";
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
import { 
    getAllAvailableVehicles,
    deleteVehicleByID,
 } from "../../api/VehicleAPI";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    newButton: {
        position: 'absolute',
        right: '3vw',
    }       
}))

const headCells = [
    { id: 'VehicleID', label: 'Vehicle ID' },
    { id: 'ModelID', label: 'Model ID' },
    { id: 'PriceLow', label: 'Price Lower' },
    { id: 'PriceUp', label: 'Price Upper' },
    { id: 'EvRange', label: 'EV Range' },
    { id: 'BatterySize', label: "Battery Size"},
    { id: 'Trim', label: 'Trim' },
    { id: 'Year', label: 'Year' },
    { id: 'actions', label: 'Delete', disableSorting: true }
]

export default function Vehicles() {
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [recordForEdit2, setRecordForEdit2] = useState(null)
    const [records, setRecords] = useState(vehicleService.getAllVehicles())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [openPopup2, setOpenPopup2] = useState(false)

    const [vehicleList, setVehicleList] = React.useState([]);
    const [vehicleID, setVehicleID] = React.useState("");

    async function onClickDeleteVehicleByID(vID) {
        let result = await deleteVehicleByID(vID);
        alert(`Status : ${result.status}, ${result.body}`);
        onLoadGetAllAvailableVehicles();
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
                setVehicleList(body);
            }
        } else {
            console.error(`Status : ${statusCode}, ${resultVehicles.error}`);
        }
    }

    const {
        TblContainer,
        TblHead,
    } = useTable(records, headCells, filterFn);

    const addOrEdit = (vehicle, resetForm) => {
        if (vehicle.id == 0) {
            vehicleService.insertVehicle(vehicle);
        } else {
            vehicleService.updateVehicle(vehicle);
            resetForm();
            setRecordForEdit(null);
            setOpenPopup(false);
            setOpenPopup2(false);
            setRecords(vehicleService.getAllVehicles());
            setNotify({
                isOpen: true,
                message: 'Submitted Successfully',
                type: 'success'
            });
        }
        onLoadGetAllAvailableVehicles();
    }

    const openInPopup = item => {
        setRecordForEdit(item);
        setOpenPopup(true);
        setOpenPopup2(true);
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
                title="Vehicle Database"
                icon={<LaptopMacIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Button
                        text="Vehicle"
                        color="#841584"
                        variant="outlined"
                        startIcon={<AddIcon />, <EditIcon fontSize="small" />}
                        className={classes.newButton}
                        onClick={() => { 
                            setOpenPopup(true);
                            setRecordForEdit2(null);
                            setRecordForEdit(null); 
                        }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            vehicleList.map(v =>
                                (<TableRow key={v.id}>
                                    <TableCell>{v.VehicleID}</TableCell>
                                    <TableCell>{v.ModelID}</TableCell>
                                    <TableCell>{v.PriceLower}</TableCell>
                                    <TableCell>{v.PriceUpper}</TableCell>
                                    <TableCell>{v.EVRange}</TableCell>
                                    <TableCell>{v.BatterySize}</TableCell>
                                    <TableCell>{v.Trim}</TableCell>
                                    <TableCell>{v.Year}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            //edit button color
                                            color="success"
                                            onClick={() => { 
                                                openInPopup(v); 
                                                }}>
                                            <EditIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Confirm you wish to delete',
                                                    subTitle: "You cannot undo this",
                                                    onConfirm: () => { 
                                                        onClickDeleteVehicleByID(v.VehicleID);
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
            </Paper>
            <Popup
                title="Add a new vehicle"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <VehicleForm
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
