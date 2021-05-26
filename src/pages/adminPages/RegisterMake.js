import React, { useState } from 'react'
import RegisterMakeForm from "./RegisterMakeForm";
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
    getMakeList,
    deleteVehicleMake, 
} from "../../api/VehicleAPI";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    makeButton: {
        position: 'absolute',
        right: '3vw',
    }
}))

const headCells = [
    { id: 'MakeID', label: 'Make ID' },
    { id: 'MakeName', label: 'Make Name' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function RegisterMake() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(vehicleService.getAllVehicles())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [recordForEdit2, setRecordForEdit2] = useState(null)
    const [openPopup2, setOpenPopup2] = useState(false)
    const [makeList, setMakeList] = React.useState([]);
    const [makeID, setMakeID] = React.useState("");

    let resultMake = [];

    React.useEffect(() => {
        onLoadGetMakeList();
    }, []);

    async function onClickDeleteVehicleMake(vID) {
        let result = await deleteVehicleMake(vID);
        alert(`Status : ${result.status}, ${result.body}`);
        onLoadGetMakeList();
    }
    
    async function onLoadGetMakeList() {
        resultMake = await getMakeList();
        let statusCode = resultMake.status;
        if (statusCode === 200) {
            let body = resultMake.body;
            if (resultMake["body"] != undefined) {
                setMakeList(body);
            }
        } else {
            console.error(`Status : ${statusCode}, ${resultMake.error}`);
        }
    }


    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
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
        console.log("reached here")
        onLoadGetMakeList();
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
                title="Register Make"
                icon={<LaptopMacIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Button
                        text="Make"
                        color="#841584"
                        variant="outlined"
                        className={classes.makeButton}
                        startIcon={<AddIcon />}
                        onClick={() => { 
                            setOpenPopup2(true); 
                            setRecordForEdit2(null);
                            setRecordForEdit(null);
                            onLoadGetMakeList();
                         }}
                    />
                    
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            makeList.map(v =>
                                (<TableRow key={v.id}>
                                    <TableCell>{v.MakeID}</TableCell>
                                    <TableCell>{v.MakeName}</TableCell>                                    
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
                                                        onClickDeleteVehicleMake(v.MakeID);
                                                        onDelete(); }
                                                });
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                {/* <TblPagination /> */}
            </Paper>
            <Popup
                title="Register Make"
                openPopup={openPopup2}
                setOpenPopup={setOpenPopup2}
            >
                <RegisterMakeForm
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
