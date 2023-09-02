import axios from "axios";
import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserProps } from "../../interfaces/AppContext.interface";
import InputForm from "./InputForm";
import LoginProviders from "./LoginProviders";
import { AppContext } from "../../state/AppContext";
import { RegisterFormProps } from "../../interfaces/Login.interface";

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const { isRegisterOk, callbackData } = props;
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [login, setlogin] = useState("");
  const appContext = useContext(AppContext);
  const [authenticationFailed, setauthenticationFailed] =
    useState<boolean>(false);
  const [errorDetail, seterrorDetail] = useState("");

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setemail(e.currentTarget.value);
  };
  const handleLoginChange = (e: React.FormEvent<HTMLInputElement>) => {
    setlogin(e.currentTarget.value);
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setpassword(e.currentTarget.value);
  };
  const handleRepeatPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setRepeatPassword(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !repeatPassword || !login) {
      setauthenticationFailed(true);
      seterrorDetail("Please fill all inputs");
      return;
    }
    if (repeatPassword !== password) {
      setauthenticationFailed(true);
      seterrorDetail("password and repeat password do not match");
      return;
    }

    axios
      .post<UserProps>(
        `${appContext?.backendUrl}/user/ChceckIfUserDoesNotExist`,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data) {
          isRegisterOk(true);
          callbackData(email, login, password);
        } else {
          isRegisterOk(false);
          setauthenticationFailed(true);
          seterrorDetail("User with this email already exist");
        }
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
      />{" "}
      <br />
      <InputForm
        type="text"
        label="Login"
        value={login}
        callback={handleLoginChange}
        placeholder="Login"
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
