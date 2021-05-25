import React, { useState } from 'react'
import SubscriptionForm from "./SubscriptionForm";
import PageHeader from "../../components/AdminPageHeader";
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from  "../../components/AdminUseTable";
import * as subscriptionService from "./subscriptionService";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/AdminPopup";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/AdminNotification";
import ConfirmDialog from "../../components/AdminConfirmDialog";
import {
    getAllSubscriptionPlans,
} from "../../api/SubscriptionAPI";

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
    { id: 'planID', label: 'Plan ID' }, 
    { id: 'subPlan', label: 'Subscription Plan' }, 
    { id: 'pricing', label: 'Pricing' }, 
    // { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Subscriptions() {
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(subscriptionService.getAllSubscriptions())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const [subscriptionPlans, setSubscriptionPlans] = React.useState([]);
    const [planID, setPlanID] = React.useState(1);
    const [planName, setPlanName] = React.useState("test");
    const [pricing, setPricing] = React.useState(0.99);
    const [subList, setSubList] = React.useState([]);

    let resultSubscriptionPlan  = [];

    React.useEffect(() => {
        onLoadGetAllSubscriptionPlans();
    }, []);

    async function onLoadGetAllSubscriptionPlans() {
        resultSubscriptionPlan = await getAllSubscriptionPlans();
        let statusCode = resultSubscriptionPlan.status;
        if (statusCode === 200) {
            let body = resultSubscriptionPlan.body;
            
            if (resultSubscriptionPlan["body"] != undefined) {
                setSubList(
                    resultSubscriptionPlan["body"].map((sub) => {
                        return {
                            planID: sub["PlanID"],
                            planName: sub["PlanName"],
                            pricing: "$" + sub["Pricing"],
                        };
                    })
                );
            } else setSubList([]);

            setSubscriptionPlans(body);
        } else {
            alert(`Status : ${statusCode}, ${resultSubscriptionPlan.error}`);
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

    const addOrEdit = (subscription, resetForm) => {
        if (subscription.id == 0)
        subscriptionService.insertSubscription(subscription)
        else
        subscriptionService.updateSubscription(subscription)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(subscriptionService.getAllSubscriptions())
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
        subscriptionService.deleteSubscription(id);
        setRecords(subscriptionService.getAllSubscriptions())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    return (
        <>
            <PageHeader
                title="Subscriptions"
              
                icon={<LaptopMacIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    {/* <Controls.Input
                        label="Search Subscriptions"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    /> */}
                    <Controls.Button
                        text="Add New"
                        color="#15845b"
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
                            subList.map(list =>
                                (<TableRow key={list.id}>
                                    <TableCell>{list.planID}</TableCell>
                                    <TableCell>{list.planName}</TableCell>
                                    <TableCell>{list.pricing}</TableCell>
                                    {/* <TableCell>
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
                                    </TableCell> */}
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Add a new Subscription"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <SubscriptionForm
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