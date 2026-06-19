type InputFieldProps = {
  field: string;
  fieldID: string;
  fieldType: React.HTMLInputTypeAttribute;
  placeHolder: string;
};

export function InputField({
  field,
  fieldID,
  fieldType,
  placeHolder="",
}: InputFieldProps) {
  return (
    <>
      <label htmlFor={fieldID}>{field}</label>
      <input type={fieldType} id={fieldID} name={field} placeholder={placeHolder} />
    </>
  );
}