import React, { useState } from "react";
import RegisterForm from "../../components/Forms/RegisterForm";
import ExtendedRegisterForm from "../../components/Forms/ExtendedRegisterForm";

const RegisterPage = () => {
  const [isRegisterOk, setisRegisterOk] = useState<boolean>(false);
  return (
    <>
      {!isRegisterOk ? (
        <div className="login">
          {" "}
          <RegisterForm />{" "}
        </div>
      ) : (
        <div className="login">
        {" "}
      <ExtendedRegisterForm />{" "}
      </div>
      )}
    </>
  );
};

export default RegisterPage;
