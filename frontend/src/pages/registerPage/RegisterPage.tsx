import React, { useState } from "react";
import RegisterForm from "../../components/Forms/RegisterForm";
import MoreRegisterDataPage from "./MoreRegisterDataPage";

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
        <MoreRegisterDataPage />
      )}
    </>
  );
};

export default RegisterPage;
