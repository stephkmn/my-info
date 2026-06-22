import { ChangeEvent } from "react";

type InputFieldProps = {
  field: string;
  fieldID: string;
  fieldType: React.HTMLInputTypeAttribute;
  placeHolder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement, Element>) => void;
};

export function InputField({
  field,
  fieldID,
  fieldType,
  placeHolder="",
  value,
  onChange
}: InputFieldProps) {
  return (
    <>
      <label htmlFor={fieldID}>{field}</label>
      <input type={fieldType} id={fieldID} name={fieldID} placeholder={placeHolder} value={value} onChange={onChange} />
    </>
  );
}