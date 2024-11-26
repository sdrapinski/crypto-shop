import axios from "axios";
import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import InputForm from "./InputForm";
import LoginProviders from "./LoginProviders";
import { JwtInteface } from "../../interfaces/jwt.interface";
import { AppContext } from "../../state/AppContext";
import { Alert } from "react-bootstrap";

const LoginForm = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

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
    e.preventDefault();

    axios
      .post<JwtInteface>(
        `${appContext?.backendUrl}/user/login`,
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
        appContext?.loginUser(response.data);
        navigate("/");
      })
      .catch((error) => {
        setauthenticationFailed(true);
        console.log(error);
      });
  };
  return (
    <>
      {authenticationFailed && (
        <Alert className="loginAlert" variant="danger">
          {" "}
          Wrong Email or Password
        </Alert>
      )}
      <form
        action="#"
        onSubmit={handleSubmit}
        method="POST"
        className="login__form"
      >
        <h3
        >
          Sign In
        </h3>
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
    </>
  );
};

export default LoginForm;
