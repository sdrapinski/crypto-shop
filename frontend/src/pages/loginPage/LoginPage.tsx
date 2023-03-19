import axios from "axios";
import React, { useState } from "react";
import { UserProps } from "../../interfaces/AppContext.interface";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const LoginPage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setemail(e.currentTarget.value);
  };
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
    <div className="login">
      <form
        action="#"
        onSubmit={handleSubmit}
        method="POST"
        className="login__form"
      >
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="login__input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="login__input"
        />
        <button type="submit" className="login__submit">
          Sign In{" "}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
