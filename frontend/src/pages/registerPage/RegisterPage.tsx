import React, { useState } from "react";
import RegisterForm from "../../components/Forms/RegisterForm";
import ExtendedRegisterForm from "../../components/Forms/ExtendedRegisterForm";

const RegisterPage = () => {
  const [isRegisterOk, setisRegisterOk] = useState<boolean>(false);
  const [email, setemail] = useState("");
  const [login, setlogin] = useState("");
  const [password, setpassword] = useState("");

  const handleRegisterOk = (ok: boolean) => {
    setisRegisterOk(ok);
  };

  const setDataFromRegisterFrom = (
    email: string,
    login: string,
    password: string
  ) => {
    setemail(email);
    setlogin(login);
    setpassword(password);
  };

  return (
    <>
      {!isRegisterOk ? (
        <div className="login">
          {" "}
          <RegisterForm
            isRegisterOk={handleRegisterOk}
            callbackData={setDataFromRegisterFrom}
          />{" "}
        </div>
      ) : (
        <div className="login login--autoHeight">
          <ExtendedRegisterForm
            login={login}
            password={password}
            email={email}
          />
        </div>
      )}
    </>
  );
};

export default RegisterPage;
