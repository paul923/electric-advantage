import React, { useState } from "react";
import RegisterMakeForm from "./RegisterMakeForm";
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
import * as vehicleService from "./vehicleService";
import Controls from "../../components/controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/AdminPopup";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../components/AdminNotification";
import ConfirmDialog from "../../components/AdminConfirmDialog";
import { getMakeList, deleteVehicleMake } from "../../api/VehicleAPI";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  makeButton: {
    position: "absolute",
    right: "3vw",
    marginBottom: 30,
  },
  subButton: {
    position: "absolute",
    //lower the number, the more left
    left: "2vw",
    marginBottom: 30,
  },
  dealerButton: {
    position: "absolute",
    //lower the number, the more left
    left: "15vw",
    marginBottom: 30,
  },
  vehicleButton: {
    position: "absolute",
    //lower the number, the more left
    left: "25vw",
    marginBottom: 30,
  },
  registerDealershipButton: {
    position: "absolute",
    //lower the number, the more left
    left: "35vw",
    marginBottom: 30,
  },
  customizeToolbar: {
    minHeight: 20,
  },
}));

const headCells = [
  { id: "MakeID", label: "Make ID" },
  { id: "MakeName", label: "Make Name" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function RegisterMake() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(vehicleService.getAllVehicles());
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
  const [recordForEdit2, setRecordForEdit2] = useState(null);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [makeList, setMakeList] = React.useState([]);

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

  const { TblContainer, TblHead } = useTable(records, headCells, filterFn);

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
        message: "Submitted Successfully",
        type: "success",
      });
    }
    onLoadGetMakeList();
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
    setOpenPopup2(true);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  return (
    <>
      <PageHeader
        title="Register Make"
        icon={<LaptopMacIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar className={classes.customizeToolbar}>
          <Controls.Button
            text="Subscriptions"
            color="#841584"
            variant="outlined"
            className={classes.subButton}
            onClick={(event) => (window.location.href = "/adminSub")}
          />
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
            text="Register Dealership"
            color="#841584"
            variant="outlined"
            className={classes.registerDealershipButton}
            onClick={(event) => (window.location.href = "/registerdealership")}
          />
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
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {makeList.map((v) => (
              <TableRow key={v.id}>
                <TableCell>{v.MakeID}</TableCell>
                <TableCell>{v.MakeName}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    //edit button color
                    color="success"
                    onClick={() => {
                      openInPopup(v);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: `Deleting ${v.MakeID} will remove anything that relates to ${v.MakeID} such as model, vehicle, inventory`,
                        subTitle: `Do you want to delete?`,
                        onConfirm: () => {
                          onClickDeleteVehicleMake(v.MakeID);
                          onDelete();
                        },
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
      </Paper>
      <Popup title="Make" openPopup={openPopup2} setOpenPopup={setOpenPopup2}>
        <RegisterMakeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
