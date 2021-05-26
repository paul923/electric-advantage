import React, { useRef, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useAuth } from "../../components/AuthContext";
import Signup from "../Signup";
import "../css/dealerRegistration.css";
import { registerDealership } from "../../api/DealershipAPI";
import { Link, useHistory } from "react-router-dom";
import { getDealershipByUserID } from "../../api/DealershipAPI";
import { Nav, NavLink, Bars, NavMenu } from "../pageComponents/NavbarElements";
import PageHeader from "../../components/AdminPageHeader";
import CreateIcon from "@material-ui/icons/Create";
import { Box, ButtonGroup } from "@material-ui/core";

export default function DealershipProfilePage() {
  const history = useHistory();
  const [regionCode, setRegionCode] = React.useState(null);
  const [groupName, setGroupName] = React.useState(null);
  const [streetAddress, setStreetAddress] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [province, setProvince] = React.useState(null);
  const [zip, setZip] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [salesContact, setSalesContact] = React.useState(null);
  const [salesEmail, setSalesEmail] = React.useState(null);
  const [salesPhone, setSalesPhone] = React.useState(null);
  const [billingContactName, setBillingContactName] = React.useState(null);
  const [billingPhone, setBillingPhone] = React.useState(null);
  const [billingEmail, setBillingEmail] = React.useState(null);
  const [longtitude, setLongtitude] = React.useState(null);
  const [latitude, setLatitude] = React.useState(null);
  const [dealerObjectId, setDealerObjectId] = useState("");
  const { currentUser, userType, logout, userObject } = useAuth();
  const [searchedUser, setSearchedUser] = useState(null);

  React.useEffect(() => {}, []);
  console.log("SHOO" + userObject.UserID);

  async function GetDealerObjectId(id) {
    let resultUser = await getDealershipByUserID(id);
    let statusCode = resultUser.status;
    if (statusCode === 404) {
      setDealerObjectId(null);
    } else {
      if (statusCode === 200) {
        let body = resultUser.body[0];
        setSearchedUser(body);
        console.log("dealerobject");
        console.log(body);
        setDealerObjectId(null);
        setDealerObjectId(body.DealershipID);
      } else {
        alert(`Status : ${statusCode}, ${resultUser.error}`);
      }
    }
  }

  async function onPressCreateDealership() {
    let dealershipObj = {
      UserID: userObject.UserID,
      RegionCode: regionCode,
      GroupName: groupName,
      StreetAddress: streetAddress,
      City: city,
      Province: province,
      Zip: zip,
      Country: country,
      Latitude: latitude,
      Longitude: longtitude,
      SalesContact: salesContact,
      SalesEmail: salesEmail,
      SalesPhone: salesPhone,
      BillingContactName: billingContactName,
      BillingPhone: billingPhone,
      BillingEmail: billingEmail,
    };
    let result = await registerDealership(dealershipObj);
    if (result.status === 201) {
      history.push("/");
      console.log(userObject.UserID);
      GetDealerObjectId(userObject.UserID);
    }
  }

  const createDealershipForm = () => {
    return (
      <>
        <PageHeader
          title="Dealer Registration"
          icon={<CreateIcon fontSize="large" />}
        />
        <body className="contentWrapper">
          <form className="dealerRegistrationForm">
            <Box mt={2} pt={2}>
              <TextField
                id="outlined-basic"
                label="regionCode"
                variant="outlined"
                value={regionCode}
                onChange={(event) => setRegionCode(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="groupName"
                variant="outlined"
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="streetAddress"
                variant="outlined"
                value={streetAddress}
                onChange={(event) => setStreetAddress(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="city"
                variant="outlined"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="province"
                variant="outlined"
                value={province}
                onChange={(event) => setProvince(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="zip"
                variant="outlined"
                value={zip}
                onChange={(event) => setZip(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="country"
                variant="outlined"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="salesContact"
                variant="outlined"
                value={salesContact}
                onChange={(event) => setSalesContact(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="salesEmail"
                variant="outlined"
                value={salesEmail}
                onChange={(event) => setSalesEmail(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="salesPhone"
                variant="outlined"
                value={salesPhone}
                onChange={(event) => setSalesPhone(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="billingContactName"
                variant="outlined"
                value={billingContactName}
                onChange={(event) => setBillingContactName(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="billingEmail"
                variant="outlined"
                value={billingEmail}
                onChange={(event) => setBillingEmail(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="billingPhone"
                variant="outlined"
                value={billingPhone}
                onChange={(event) => setBillingPhone(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="longtitude"
                variant="outlined"
                value={longtitude}
                onChange={(event) => setLongtitude(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="latitude"
                variant="outlined"
                value={latitude}
                onChange={(event) => setLatitude(event.target.value)}
              />
            </Box>
            {/* <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={userOpen}
          onClose={() => setUserOpen(false)}
          onOpen={() => setUserOpen(true)}
          value={userType}
          onChange={(event) => {
            setUserType(event.target.value);
          }}
        >
          <MenuItem value={TYPE.CUSTOMER}>Customer</MenuItem>
          <MenuItem value={TYPE.DEALERSHIP}>Dealership</MenuItem>
          <MenuItem value={TYPE.ADMIN}>Admin</MenuItem>
        </Select> */}
            <div className="bottomTwo">
              <Button
                color="primary"
                variant="contained"
                onClick={() => onPressCreateDealership()}
              >
                Create Dealership
              </Button>
              <NavLink to="/dealer" activeStyle>
                <Button variant="contained" color="primary">
                  Back
                </Button>
              </NavLink>
            </div>
          </form>
        </body>
      </>
    );
  };

  return <div>{createDealershipForm()}</div>;
}
