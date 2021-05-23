import React, { useRef, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useAuth } from "../../components/AuthContext";
import Signup from "../Signup";
import { registerDealership } from "../../api/DealershipAPI";
import { Link, useHistory } from "react-router-dom";


export default function DealershipProfilePage() {
  const history = useHistory();
  const { currentUser, userObject } = useAuth();
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

  
  React.useEffect(() => {}, []);

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
      console.log(userObject.UserID)
    }
  }

  const createDealershipForm = () => {
    return (
      <form>
        <h1>Register dealership</h1>
        <TextField
          id="outlined-basic"
          label="regionCode"
          variant="outlined"
          value={regionCode}
          onChange={(event) => setRegionCode(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="groupName"
          variant="outlined"
          value={groupName}
          onChange={(event) => setGroupName(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="streetAddress"
          variant="outlined"
          value={streetAddress}
          onChange={(event) => setStreetAddress(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="city"
          variant="outlined"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="province"
          variant="outlined"
          value={province}
          onChange={(event) => setProvince(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="zip"
          variant="outlined"
          value={zip}
          onChange={(event) => setZip(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="country"
          variant="outlined"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="salesContact"
          variant="outlined"
          value={salesContact}
          onChange={(event) => setSalesContact(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="salesEmail"
          variant="outlined"
          value={salesEmail}
          onChange={(event) => setSalesEmail(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="salesPhone"
          variant="outlined"
          value={salesPhone}
          onChange={(event) => setSalesPhone(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="billingContactName"
          variant="outlined"
          value={billingContactName}
          onChange={(event) => setBillingContactName(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="billingEmail"
          variant="outlined"
          value={billingEmail}
          onChange={(event) => setBillingEmail(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="billingPhone"
          variant="outlined"
          value={billingPhone}
          onChange={(event) => setBillingPhone(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="longtitude"
          variant="outlined"
          value={longtitude}
          onChange={(event) => setLongtitude(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="latitude"
          variant="outlined"
          value={latitude}
          onChange={(event) => setLatitude(event.target.value)}
        />
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => onPressCreateDealership()}
        >
          Create Dealership
        </Button>
      </form>
    );
  };

  return <div>{createDealershipForm()}</div>;
}