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

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
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
    { id: 'carID', label: 'Car ID' },
    { id: 'model', label: 'Model' },
    { id: 'make', label: 'Make' },
    { id: 'trim', label: 'Trim' },
    { id: 'evRange', label: 'EV Range' },
    { id: 'priceLow', label: 'Price Lower' },
    { id: 'priceUp', label: 'Price Upper' },
    { id: 'perf1', label: 'Performance Figure 1' },
    { id: 'perf2', label: 'Performance Figure 2' },
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
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        vehicleService.deleteVehicle(id);
        setRecords(vehicleService.getAllVehicles())
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
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.carID}</TableCell>
                                    <TableCell>{item.model}</TableCell>
                                    <TableCell>{item.make}</TableCell>
                                    <TableCell>{item.trim}</TableCell>
                                    <TableCell>{item.evRange}</TableCell>
                                    <TableCell>{item.priceLow}</TableCell>
                                    <TableCell>{item.priceUp}</TableCell>
                                    <TableCell>{item.perf1}</TableCell>
                                    <TableCell>{item.perf2}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            //edit button color
                                            color="success"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Confirm you wish to delete',
                                                    subTitle: "You cannot undo this",
                                                    onConfirm: () => { onDelete(item.id) }
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
                title="Vh"
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
