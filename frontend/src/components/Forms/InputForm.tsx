import React from "react";

interface inputFormProps {
  label: string;
  type: string;
  id?: string;
  placeholder?: string;
  value: string;
  callback: (e: React.FocusEvent<HTMLInputElement>) => void;
  additionalClass?: string;
}

const InputForm: React.FC<inputFormProps> = (props) => {
  return (
    <>
      <label htmlFor={props.id}>{props.label} </label>
      <input
        className={`inputForm ${props.additionalClass}`}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.callback}
        placeholder={props.placeholder}
      />
    </>
  );
};

export default InputForm;
