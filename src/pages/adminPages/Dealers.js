import React, { useState } from 'react'
import DealerForm from "./DealerForm";
import PageHeader from "../../components/AdminPageHeader";
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from  "../../components/AdminUseTable";
import * as dealerService from "./dealerService";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/AdminPopup";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/AdminNotification";
import ConfirmDialog from "../../components/AdminConfirmDialog";
import {
    getAllDealerships,
} from "../../api/VehicleAPI";

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
    { id: 'dealerID', label: 'Dealer ID' }, 
    { id: 'name', label: 'Name' }, 
    { id: 'address', label: 'Address' }, 
    { id: 'email', label: 'Email' }, 
    { id: 'phone', label: 'Phone' }, 
    { id: 'planID', label:'Plan ID' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Vehicles() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(dealerService.getAllDealers())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const [dealerships, setDealerships] = React.useState([]);
    const [dealershipID, setDealershipID] = React.useState("");
    const [groupName, setGroupName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [salesEmail, setSalesEmail] = React.useState("");
    const [salesPhone, setSalesPhone] = React.useState("");
    const [dealershipList, setDealershipList] = React.useState([]);

    let resultDealership = [];

    React.useEffect(() => {
        onLoadGetAllDealerships();
    }, []);

    async function onLoadGetAllDealerships() {
        resultDealership = await getAllDealerships();
        let statusCode = resultDealership.status;
        if (statusCode === 200) {
            let body = resultDealership.body;

            if (resultDealership["body"] != undefined) {
                setDealershipList(
                    resultDealership["body"].map((d) => {
                        return {
                            dealerID: d["DealershipID"],
                            dealerName: d["GroupName"],
                            dealerAddress: d["StreetAddress"],
                            dealerEmail: d["SalesEmail"],
                            dealerPhone: d["SalesPhone"],
                            dealerPlanID: d[""],
                        };
                    })
                );
            } else setDealershipList([]);

            setDealerships(body);
        } else {
            alert(`Status : ${statusCode}, ${resultDealership.error}`);
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

    const addOrEdit = (dealer, resetForm) => {
        if (dealer.id == 0)
        dealerService.insertDealer(dealer)
        else
        dealerService.updateDealer(dealer)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(dealerService.getAllDealers())
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
        dealerService.deleteDealer(id);
        setRecords(dealerService.getAllDealers())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    return (
        <>
            <PageHeader
                title="Dealer Database"
              
                icon={<LaptopMacIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search for dealers"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    {/* removed add button */}
                    {/* <Controls.Button
                        text="Add New"
                        color="#841584"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    /> */}
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            dealershipList.map(list =>
                                (<TableRow key={list.id}>
                                    <TableCell>{list.dealerID}</TableCell>
                                    <TableCell>{list.dealerName}</TableCell>
                                    <TableCell>{list.dealerAddress}</TableCell>
                                    <TableCell>{list.dealerEmail}</TableCell>
                                    <TableCell>{list.dealerPhone}</TableCell>
                                    <TableCell>{list.dealerPlanID}</TableCell>
                                    
                        
                                    <TableCell>
                                        <Controls.ActionButton
                                            //edit button color
                                            color="success"
                                            onClick={() => { openInPopup(list) }}>
                                            <EditIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Confirm you wish to delete',
                                                    subTitle: "You cannot undo this",
                                                    onConfirm: () => { onDelete(list.id) }
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
                title="Add a new dealer"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <DealerForm
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
