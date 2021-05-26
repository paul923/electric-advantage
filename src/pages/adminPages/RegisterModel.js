import React, { useState } from 'react'
import RegisterModelForm from "./RegisterModelForm";
import PageHeader from "../../components/AdminPageHeader";
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar } from '@material-ui/core';
import useTable from  "../../components/AdminUseTable";
import * as vehicleService from "./vehicleService";
import Controls from "../../components/controls/Controls";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Popup from "../../components/AdminPopup";
import Notification from "../../components/AdminNotification";
import ConfirmDialog from "../../components/AdminConfirmDialog";
import { 
    getMakeList,
    getModelsList,
    deleteVehicleModel,
} from "../../api/VehicleAPI";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    modelButton: {
        position: 'absolute',
        right: '3vw',
    }
}))

const headCells = [
    { id: 'MakeID', label: 'Make ID' },
    { id: 'MakeName', label: 'Make Name' },
    { id: 'ModelID', label: 'Model ID' },
    { id: 'ModelName', label: 'Model Name' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function RegisterModel() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(vehicleService.getAllVehicles())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [recordForEdit3, setRecordForEdit3] = useState(null)
    const [openPopup3, setOpenPopup3] = useState(false)
    const [makeList, setMakeList] = React.useState([]);
    const [carModel, setCarModel] = React.useState("");
    const [selectedModel, setSelectedModel] = React.useState("1");
    const [modelList, setModelList] = React.useState([]);
    const [make, setMake] = React.useState([]);

    React.useEffect(() => {
        onLoadGetMakeList();
        onLoadGetModelsList();
    }, []);

    async function onLoadGetMakeList() {
        let resultMakeList = await getMakeList();
        let statusCode = resultMakeList.status;
        if (statusCode === 200) {
            let body = resultMakeList.body;
            if (resultMakeList["body"] != undefined) {
                setMakeList(body);
            } 
        } else {
            console.error(`Status : ${statusCode}, ${resultMakeList.error}`);
        }
    }
    
    async function onLoadGetModelsList() {
        let resultModelList = await getModelsList();
        let statusCode = resultModelList.status;
        if (statusCode === 200) {
            let body = resultModelList.body;
            setModelList(body);
            setCarModel(resultModelList.body.ModelName);
            setSelectedModel(resultModelList.body[0].ModelID);
        } else {
            console.error(`Status : ${statusCode}, ${resultModelList.error}`);
        }
    }

    async function onClickDeleteVehicleModel(makeid, modelid) {
        let result = await deleteVehicleModel(makeid, modelid);
        alert(`Status : ${result.status}, ${result.body}`); 
        onLoadGetMakeList();
        onLoadGetModelsList();
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
            setOpenPopup3(false);
            setRecords(vehicleService.getAllVehicles())
            setNotify({
                isOpen: true,
                message: 'Submitted Successfully',
                type: 'success'
            });
        }
            onLoadGetMakeList();
            onLoadGetModelsList();
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
                    <Controls.Button
                        text="Model"
                        color="#841584"
                        variant="outlined"
                        className={classes.modelButton}
                        startIcon={<AddIcon />}
                        onClick={() => { 
                            setOpenPopup3(true); 
                            setRecordForEdit3(null); 
                            setRecordForEdit(null);
                        }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            modelList.map(m =>
                                (<TableRow key={m.id}>
                                    <TableCell>{m.MakeID}</TableCell>
                                    <TableCell>{m.MakeName}</TableCell>
                                    <TableCell>{m.ModelID}</TableCell>
                                    <TableCell>{m.ModelName}</TableCell>                                    
                                    <TableCell>
                                        <Controls.ActionButton
                                            //edit button color
                                            color="success"
                                            onClick={() => { 
                                                openInPopup(m); 
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
                                                            onClickDeleteVehicleModel(m.MakeID, m.ModelID);
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
