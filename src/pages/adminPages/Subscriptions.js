import React, { useState } from "react";
import SubscriptionForm from "./SubscriptionForm";
import PageHeader from "../../components/AdminPageHeader";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
} from "@material-ui/core";
import useTable from "../../components/AdminUseTable";
import * as subscriptionService from "./subscriptionService";
import Controls from "../../components/controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/AdminPopup";
import Notification from "../../components/AdminNotification";
import ConfirmDialog from "../../components/AdminConfirmDialog";
import { getAllSubscriptionPlans } from "../../api/SubscriptionAPI";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    position: "absolute",
    right: "3vw",
    marginBottom: 30,
  },
  makeButton: {
    position: "absolute",
    left: "31.5vw",
    marginBottom: 30,
  },
  dealerButton: {
    position: "absolute",
    //lower the number, the more left
    left: "4vw",
    marginBottom: 30,
  },
  vehicleButton: {
    position: "absolute",
    //lower the number, the more left
    left: "13vw",
    marginBottom: 30,
  },
  modelButton: {
    position: "absolute",
    //lower the number, the more left
    left: "22.5vw",
    marginBottom: 30,
  },
  customizeToolbar: {
    minHeight: 20,
  },
}));

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    position: "absolute",
    right: "3vw",
  },
}));

const headCells = [
  { id: "planID", label: "Plan ID" },
  { id: "subPlan", label: "Subscription Plan" },
  { id: "pricing", label: "Pricing" },
  { id: "billing", label: "Billing Cycle" },
];

export default function Subscriptions() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(
    subscriptionService.getAllSubscriptions()
  );
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [subscriptionPlans, setSubscriptionPlans] = React.useState([]);
  const [subList, setSubList] = React.useState([]);

  let resultSubscriptionPlan = [];

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
              billing: sub["BillingCycle"],
            };
          })
        );
      } else setSubList([]);
      setSubscriptionPlans(body);
    } else {
      alert(`Status : ${statusCode}, ${resultSubscriptionPlan.error}`);
    }
  }

  const { TblContainer, TblHead } = useTable(records, headCells, filterFn);

  const addOrEdit = (subscription, resetForm) => {
    if (subscription.id == 0) {
      subscriptionService.insertSubscription(subscription);
      onLoadGetAllSubscriptionPlans();
    } else subscriptionService.updateSubscription(subscription);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(subscriptionService.getAllSubscriptions());
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
    onLoadGetAllSubscriptionPlans();
  };

  return (
    <>
      <PageHeader
        title="Subscriptions"
        icon={<LaptopMacIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar className={classes.customizeToolbar}>
          <Controls.Button
            text="Dealers"
            color="#841584"
            variant="outlined"
            className={classes.dealerButton}
            onClick={(event) => (window.location.href = "/adminDealer")}
          />
          <Controls.Button
            text="Vehicles"
            color="#841584"
            variant="outlined"
            className={classes.vehicleButton}
            onClick={(event) => (window.location.href = "/adminVehicle")}
          />
          <Controls.Button
            text="Models"
            color="#841584"
            variant="outlined"
            className={classes.modelButton}
            onClick={(event) => (window.location.href = "/adminModel")}
          />
          <Controls.Button
            text="Makes"
            color="#841584"
            variant="outlined"
            className={classes.makeButton}
            onClick={(event) => (window.location.href = "/adminMake")}
          />

          <Controls.Button
            text="Add New"
            color="#841584"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {subList.map((list) => (
              <TableRow key={list.id}>
                <TableCell>{list.planID}</TableCell>
                <TableCell>{list.planName}</TableCell>
                <TableCell>{list.pricing}</TableCell>
                <TableCell>{list.billing}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
      </Paper>
      <Popup
        title="Add a new Subscription"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <SubscriptionForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
