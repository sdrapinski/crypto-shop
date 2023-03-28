import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaAngleRight } from "react-icons/fa";

enum FormType {
  Registration,
  Login,
}

export const SwitchButton: React.FC = () => {
  const [formType, setFormType] = useState<FormType>(FormType.Registration);

  const handleButtonClick = () => {
    setFormType(
      formType === FormType.Registration
        ? FormType.Login
        : FormType.Registration
    );
  };

  return (
    <>
      <button
        className={`switchable-button ${
          formType === FormType.Login ? "active" : ""
        }`}
        onClick={handleButtonClick}
      ></button>
    </>
  );
};
