import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { UserProps } from "../../interfaces/AppContext.interface";
import InputForm from "./InputForm";
import LoginProviders from "./LoginProviders";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const RegisterForm = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setemail(e.currentTarget.value);
  };
  const [authenticationFailed, setauthenticationFailed] =
    useState<boolean>(false);
  const [errorDetail, seterrorDetail] = useState("");

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setpassword(e.currentTarget.value);
  };
  const handleRepeatPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setRepeatPassword(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(backendUrl);
    e.preventDefault();

    axios
      .post<UserProps>(
        `${backendUrl}/register`,
        {
          email: email,
          password: password,
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
      onSubmit={handleSubmit}
      method="POST"
      className="login__form"
    >
      <h3>Sign Up</h3>
      <InputForm
        type="email"
        label="Email"
        value={email}
        callback={handleEmailChange}
        placeholder="Email"
      />
      <br />
      <InputForm
        type="password"
        label="Password"
        value={password}
        callback={handlePasswordChange}
        placeholder="Password"
      />
      <br />
      <InputForm
        type="password"
        label="Repeat password"
        value={repeatPassword}
        callback={handleRepeatPasswordChange}
        placeholder="Repeat password"
      />
      <div className="login__error">
        {authenticationFailed === true ? `${errorDetail}` : ""}
      </div>
      <button type="submit" className="login__submit">
        Sign Up{" "}
      </button>
      <LoginProviders />
      <div className="login__NoAccount">
        <NavLink to="/login">
          {" "}
          You already have an account? Sign In here{" "}
        </NavLink>
      </div>
    </form>
  );
};

export default RegisterForm;
