import React, { useEffect, useState } from "react";
import InputForm from "./InputForm";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import { ExtendedRegisterProps } from "../../interfaces/Login.interface";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ExtendedRegisterForm: React.FC<ExtendedRegisterProps> = (props) => {
  const { login, email, password } = props;

  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userBirthday, setUserBirthday] = useState("");
  const [userPhoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [street, setStreet] = useState("");

  const handleUserNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };
  const handleUserSurnameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUserSurname(e.currentTarget.value);
  };
  const handleUserBirthdayChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUserBirthday(e.currentTarget.value);
    // calculateAge(e.currentTarget.value);
  };
  const handleUserPhoneChange = (phoneNumber: string) => {
    phoneNumber = phoneNumber !== userPhoneNumber ? phoneNumber : "";
    setPhoneNumber(phoneNumber);
  };
  const handleCountryChange = (val: string) => {
    // console.log(val)
    setCountry(val);
  };
  const handleCityChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  };
  const handlePostCodeChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPostCode(transformCode(e.currentTarget.value));
  };
  const handleStreetChange = (e: React.FormEvent<HTMLInputElement>) => {
    setStreet(e.currentTarget.value);
  };
  const transformCode = (code: string) => {
    if (code.length > 2 && code.length <= 6) {
      let symbol = ["-"];
      let array = code.split("");
      code = array.filter((item) => !symbol.includes(item)).join("");
      let firstString = code.substring(0, 2);
      let secondString = code.substring(2);
      return firstString + "-" + secondString;
    } else {
      return code.length <= 6 ? code : postCode;
    }

    // const firstPart = code.substring(0, 2);
    // const secondPart = code.substring(2);

    // return `${firstPart}-${secondPart}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let userDate = new Date(userBirthday);
    let userBirthdayISO = userDate.toISOString();

    axios
      .post(
        `${backendUrl}/registerUser`,
        {
          user_name: userName,
          user_surname: userSurname,
          user_email: email,
          user_date_of_birth: userBirthdayISO,
          user_phone_number: userPhoneNumber,
          user_login: login,
          user_password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <form
      action="#"
      className="extendedRegister__form"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="row">
        <div className="col-6 my-3">
          <InputForm
            type="text"
            label="Name"
            value={userName}
            callback={handleUserNameChange}
            placeholder="Name:"
          />
        </div>
        <div className="col-6 my-3">
          <InputForm
            type="text"
            label="Surname"
            value={userSurname}
            callback={handleUserSurnameChange}
            placeholder="Surname:"
          />
        </div>
        <div className="col-6 my-3">
          <InputForm
            type="date"
            label="Birthday"
            value={userBirthday}
            callback={handleUserBirthdayChange}
          />
        </div>
        <div className="col-6 my-3">
          <label htmlFor="phone-input">Phone Number</label>
          <PhoneInput
            className="custom-phone-input custom-phone-input-form"
            id="phone-input"
            international
            placeholder="Phone number:"
            value={userPhoneNumber}
            onChange={handleUserPhoneChange}
          />
        </div>
        <div className="col-6 my-3">
          <label htmlFor="country-select">Country</label>
          <CountryDropdown
            id="country-select"
            classes="inputForm"
            value={country}
            onChange={handleCountryChange}
            valueType="short"
          />
        </div>
        <div className="col-6 my-3">
          <InputForm
            type="text"
            label="City"
            value={city}
            callback={handleCityChange}
            placeholder="City:"
          />
        </div>
        <div className="col-6 my-3">
          <InputForm
            type="text"
            label="Post code"
            value={postCode}
            callback={handlePostCodeChange}
            placeholder="Post code:"
          />
        </div>
        <div className="col-6 my-3">
          <InputForm
            type="text"
            label="Street"
            value={street}
            callback={handleStreetChange}
            placeholder="Street:"
          />
        </div>
        <div className="col-12 my-3">
          <button type="submit" className="extendedRegister__submit">
            Send{" "}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExtendedRegisterForm;
