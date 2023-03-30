import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { UserProps } from "../../interfaces/AppContext.interface";
import InputForm from "./InputForm";
import LoginProviders from "./LoginProviders";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const LoginForm = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setemail(e.currentTarget.value);
  };
  const [authenticationFailed, setauthenticationFailed] =
    useState<boolean>(false);
  const [errorDetail, seterrorDetail] = useState("");
  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setpassword(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(backendUrl);
    e.preventDefault();

    axios
      .post<UserProps>(
        `${backendUrl}/login`,
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
      <h3>Sign In</h3>
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
      <div className="login__error">
        {authenticationFailed === true ? `${errorDetail}` : ""}
      </div>
      <button type="submit" className="login__submit">
        Sign In{" "}
      </button>
      <LoginProviders />
      <div className="login__NoAccount">
        <NavLink to="/register">
          {" "}
          You dont have an account yet? Register One{" "}
        </NavLink>
      </div>
    </form>
  );
};

export default LoginForm;
