import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import InputWithLabel from "./InputWithLabel";

import ImportImages from "./ImportImages";
import GetData from "./GetData";
const App = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [country, setCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const setAllValues = ({
    firstName,
    lastName,
    jobTitle,
    country,
    phoneNumber,
  }) => {
    setFirstName(firstName);
    setLastName(lastName);
    setJobTitle(jobTitle);
    setCountry(country);
    setPhoneNumber(phoneNumber);
  };

  useEffect(() => {
    fetch("https://flask-production-6f0c.up.railway.app/get/1")
      .then((res) => res.json())
      .then((json) => {
        setAllValues({
          firstName: json.firstname,
          lastName: json.lastname,
          country: json.country,
          jobTitle: json.jobtitle,
          phoneNumber: json.phonenumber,
        });
      });
  }, []);

  const updateDb = () => {
    fetch("https://flask-production-6f0c.up.railway.app/update/1", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        jobtitle: jobTitle,
        country: country,
        phonenumber: phoneNumber,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("HTTP request successful");
        } else {
          console.log("HTTP request unsuccessful");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "40%",

          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
          paddingLeft: "7%",
          paddingRight: "7%",
        }}
      >
        <Row minHeight={100}>
          <FirstRow updateDb={updateDb}></FirstRow>
        </Row>
        <Row minHeight={100}></Row>
        <Row minHeight={100}>
          <ThirdRow
            firstName={firstName}
            lastName={lastName}
            setFirstName={setFirstName}
            setLastName={setLastName}
          ></ThirdRow>
        </Row>
        <Row minHeight={100}>
          <FourthRow
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          ></FourthRow>
        </Row>
        <Row minHeight={100}>
          <FifthRow jobTitle={jobTitle} setJobTitle={setJobTitle}></FifthRow>
        </Row>
        <Row minHeight={200}>
          <SixthRow country={country} setCountry={setCountry}></SixthRow>
        </Row>
      </div>
    </div>
  );
};

const SaveButton = ({ updateDb }) => {
  return (
    <button
      style={{
        backgroundColor: "orange",
        width: "100px",
        height: "40px",
        cursor: "pointer",
        borderRadius: 7,
        fontSize: 20,
      }}
      onClick={updateDb}
    >
      Save
    </button>
  );
};

const Row = ({ minHeight, children }) => {
  return (
    <div
      style={{
        minHeight: minHeight,
      }}
    >
      {children}
    </div>
  );
};

const FirstRow = ({ updateDb }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignitems: "center",
        }}
      >
        Edit your Contact Information
      </div>
      <SaveButton updateDb={updateDb}></SaveButton>
    </div>
  );
};
const ThirdRow = ({ firstName, lastName, setFirstName, setLastName }) => {
  const changeFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const changeLastName = (event) => {
    setLastName(event.target.value);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",

        display: "flex",
      }}
    >
      <InputWithLabel
        label={"First Name"}
        value={firstName}
        onChange={changeFirstName}
      ></InputWithLabel>
      <div style={{ width: "25px" }}></div>
      <InputWithLabel
        label={"Last Name"}
        value={lastName}
        onChange={changeLastName}
      ></InputWithLabel>
    </div>
  );
};
const FourthRow = ({ phoneNumber, setPhoneNumber }) => {
  const changePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };
  return (
    <InputWithLabel
      label={"Phone Number"}
      value={phoneNumber}
      onChange={changePhoneNumber}
    ></InputWithLabel>
  );
};
const FifthRow = ({ jobTitle, setJobTitle }) => {
  const changeJobTitle = (event) => {
    setJobTitle(event.target.value);
  };
  return (
    <InputWithLabel
      label={"Job Title"}
      value={jobTitle}
      onChange={changeJobTitle}
    ></InputWithLabel>
  );
};

const SixthRow = ({ setCountry, country }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",

        alignItems: "start",
        flexDirection: "column",
        fontSize: 12,
      }}
    >
      Country
      <div style={{ height: "10px" }}></div>
      <div style={{ display: "flex" }}>
        <ImportImages
          countryid={1}
          country={country}
          setCountry={setCountry}
        ></ImportImages>
        <ImportImages
          countryid={0}
          country={country}
          setCountry={setCountry}
        ></ImportImages>
      </div>
    </div>
  );
};

export default App;
