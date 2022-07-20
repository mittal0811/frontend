import { useEffect, useState } from "react";
import InputWithLabel from "./utils/InputWithLabel";
import ImportImages from "./utils/ImportImages";
import ProfileImage from "./utils/ProfileImage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SaveButton from "./utils/SaveButton";
import { COLORS } from "./theme/colors";

const Form = () => {
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
          toast.success("Success - Your data got saved!");
        } else {
          toast.error("Oops - Something went wrong!");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => console.log(""))
      .catch((error) => console.log(error));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "scroll",
        paddingLeft: "7%",
        paddingRight: "7%",
        backgroundColor: COLORS.bgcolor,
      }}
    >
      <Row minHeight={90}>
        <FirstRow updateDb={updateDb}></FirstRow>
      </Row>
      <Row minHeight={170}>
        <SecondRow></SecondRow>
      </Row>
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
  );
};

const Row = ({ minHeight, children }) => {
  return (
    <div
      style={{
        minHeight: minHeight,
        marginTop: 10,
        display: "flex",
        alignItems: "center",
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
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignitems: "center",
          fontSize: 24,
          fontWeight: "normal",
          marginRight: 123,
        }}
      >
        Edit your Contact Information
      </div>
      <SaveButton updateDb={updateDb}></SaveButton>
    </div>
  );
};

const SecondRow = ({}) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ProfileImage></ProfileImage>
    </div>
  );
};

const ThirdRow = ({ firstName, lastName, setFirstName, setLastName }) => {
  const [error, setError] = useState("");
  const [errorlastname, setErrorLastName] = useState("");
  const changeFirstName = (event) => {
    if (event.target?.value?.length > 24) {
      console.log(event.target.value.length);
      setError("Oops! Too big first name");
    } else {
      setError("");
      setFirstName(event.target.value);
    }
  };
  const changeLastName = (event) => {
    if (event.target?.value?.length > 24) {
      console.log(event.target.value.length);
      setErrorLastName("Oops! Too big last name");
    } else {
      setErrorLastName("");
      setLastName(event.target.value);
    }
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div style={{ flexGrow: 1, marginRight: 10 }}>
        <InputWithLabel
          label={"First Name"}
          value={firstName}
          onChange={changeFirstName}
          error={error}
        ></InputWithLabel>
      </div>

      <div style={{ flexGrow: 1 }}>
        <InputWithLabel
          label={"Last Name"}
          value={lastName}
          onChange={changeLastName}
          error={errorlastname}
        ></InputWithLabel>
      </div>
    </div>
  );
};

const FourthRow = ({ phoneNumber, setPhoneNumber }) => {
  const [error, setError] = useState("");

  const changePhoneNumber = (event) => {
    if (event.target?.value?.length > 10) {
      setError("Oops, too long phone number");
    } else {
      setError("");
      if (!isNaN(event.target.value)) setPhoneNumber(event.target.value);
    }
  };

  const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  };

  return (
    <InputWithLabel
      label={"Phone Number"}
      value={phoneNumber}
      onChange={changePhoneNumber}
      error={error}
    ></InputWithLabel>
  );
};

const FifthRow = ({ jobTitle, setJobTitle }) => {
  const [error, setError] = useState("");
  const changeJobTitle = (event) => {
    if (event.target?.value?.length > 41) {
      setError("Oops! Too big for a job title");
    } else {
      setError("");
      setJobTitle(event.target.value);
    }
  };
  return (
    <InputWithLabel
      label={"Job Title"}
      value={jobTitle}
      onChange={changeJobTitle}
      error={error}
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
      <div style={{ display: "flex", flexWrap: "wrap" }}>
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

export default Form;
