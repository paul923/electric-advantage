import React, { useState } from 'react'
import DealerForm from "./DealerForm";
import PageHeader from "../../components/AdminPageHeader";
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar } from '@material-ui/core';
import useTable from  "../../components/AdminUseTable";
import * as dealerService from "./dealerService";
import Popup from "../../components/AdminPopup";
import Controls from "../../components/controls/Controls";
import Notification from "../../components/AdminNotification";
import ConfirmDialog from "../../components/AdminConfirmDialog";
import {
    getAllDealerships,
} from "../../api/DealershipAPI";

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
        right: '10px',
        marginBottom: 30
    },
    modelButton: {
        position: 'absolute',
        right: '48vw',
        marginBottom: 30
    },
    makeButton: {
        position: 'absolute',
        left: '22vw',
        marginBottom: 30
    },
    subButton: {
        position: 'absolute',
        //lower the number, the more left
        left: '1vw',
        marginBottom: 30
    },

    vehicleButton: {
        position: 'absolute',
        //lower the number, the more left
        left: '13vw',
        marginBottom: 30
    },
    customizeToolbar: {
        minHeight: 20
    }
}))


const headCells = [
    { id: 'dealerID', label: 'Dealer ID' }, 
    { id: 'name', label: 'Name' }, 
    { id: 'address', label: 'Address' }, 
    { id: 'email', label: 'Email' }, 
    { id: 'phone', label: 'Phone' }, 
    { id: 'planID', label:'Plan ID' },
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
    } = useTable(records, headCells, filterFn);

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

    return (
        <>
            <PageHeader
                title="Dealer Database"
              
                icon={<LaptopMacIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
            <Toolbar className={classes.customizeToolbar}>
            <Controls.Button
                        text="Subscriptions"
                        color="#841584"
                        variant="outlined"
                        className={classes.subButton}
                        onClick={event =>  window.location.href='/adminSub'}
                    />
                <Controls.Button
                        text="Vehicles"
                        color="#841584"
                        variant="outlined"
                        className={classes.vehicleButton}
                        onClick={event =>  window.location.href='/adminVehicle'}
                    />
                    
                    <Controls.Button
                        text="Make"
                        color="#841584"
                        variant="outlined"
                        className={classes.makeButton}
                        onClick={event =>  window.location.href='/adminMake'}
                    />
                    <Controls.Button
                        text="Model"
                        color="#841584"
                        variant="outlined"
                        className={classes.modelButton}
                        onClick={event =>  window.location.href='/adminModel'}
                    />
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
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
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
