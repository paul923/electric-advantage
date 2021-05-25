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
import Popup2 from "../../components/AdminPopup2";
import { 
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
        width: '50%'
    },
    newButton: {
        position: 'absolute',
        right: '0vw',
        // width: '8%'
    },
    button1: {
        position: 'absolute',
        right: '30vw',
        // width: '5%'
    },
    button2: {
        position: 'absolute',
        right: '15vw',
        // width: '5%'
    }
   

    
}))


const headCells = [
    { id: 'vehicleID', label: 'Vehicle ID' },
    { id: 'modelID', label: 'Model ID' },
    { id: 'priceLow', label: 'Price Lower' },
    { id: 'priceUp', label: 'Price Upper' },
    { id: 'evRange', label: 'EV Range' },
    { id: 'batterySize', label: "Battery Size"},
    { id: 'trim', label: 'Trim' },
    { id: 'year', label: 'Year' },
    { id: 'actions', label: 'Delete', disableSorting: true }
]

export default function Vehicles() {
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(vehicleService.getAllVehicles())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [openPopup2, setOpenPopup2] = useState(false)

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
                            vehicleID: v["VehicleID"],
                            priceLower: "$" + v["PriceLower"],
                            priceUpper: "$" + v["PriceUpper"],
                            evRange: v["EVRange"] + "km",
                            batterySize: v["BatterySize"],
                            trim: v["Trim"],
                            year: v["Year"],
                            modelID: v["ModelID"],
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
                    return items.filter(x => x.dealerID.toLowerCase().includes(target.value))
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
        setOpenPopup2(false)
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
        setOpenPopup2(true)
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
                    <Controls.Input
                        label="Search Vehicle Database"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Make"
                        color="#841584"
                        variant="outlined"
                        
                        className={classes.button1}
                        onClick={event =>  window.location.href='/4'}
                        // onClick={() => { setOpenPopup2(true); setRecordForEdit2(null); }}
                    />
                    <Controls.Button
                        text="Model"
                        color="#841584"
                        variant="outlined"
                        
                        className={classes.button2}
                        onClick={event =>  window.location.href='/5'}
                        // onClick={() => { setOpenPopup2(true); setRecordForEdit2(null); }}
                    />
                    <Controls.Button
                        text="Vehicle"
                        color="#841584"
                        variant="outlined"
                        startIcon={<AddIcon />, <EditIcon fontSize="small" />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            vehicleList.map(v =>
                                (<TableRow key={v.id}>
                                    <TableCell>{v.vehicleID}</TableCell>
                                    <TableCell>{v.modelID}</TableCell>
                                    <TableCell>{v.priceLower}</TableCell>
                                    <TableCell>{v.priceUpper}</TableCell>
                                    <TableCell>{v.evRange}</TableCell>
                                    <TableCell>{v.batterySize}</TableCell>
                                    <TableCell>{v.trim}</TableCell>
                                    <TableCell>{v.year}</TableCell>
                                    <TableCell>
                                        {/* <Controls.ActionButton
                                            //edit button color
                                            color="success"
                                            onClick={() => { 
                                                setVehicleID(v.vehicleID);
                                                openInPopup(v); 
                                                }}>
                                            <EditIcon fontSize="small" />
                                        </Controls.ActionButton> */}
                                        <Controls.ActionButton
                                            onClick={() => {
                                                setVehicleID(v.vehicleID);
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Confirm you wish to delete',
                                                    subTitle: "You cannot undo this",
                                                    onConfirm: () => { 
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
