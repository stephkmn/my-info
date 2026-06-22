import { useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import { InputField } from "../../components/InputField";

export type PersonalInfo = {
  name: string;
  dob: string;
  addr: string;
  weight: string;
  weightUnit: "lb" | "kg";
  heightUnit: "in" | "cm";
  heightFt: string;
  heightIn: string;
  heightCm: string;
};

export const EMPTY_PERSONAL: PersonalInfo = {
  name: "",
  dob: "",
  addr: "",
  weight: "",
  weightUnit: "lb",
  heightUnit: "in",
  heightFt: "",
  heightIn: "",
  heightCm: "",
};

type PersonalSectionProps = {
  personal: PersonalInfo;
  setPersonal: Dispatch<SetStateAction<PersonalInfo>>;
};

export function PersonalSection({personal, setPersonal}: PersonalSectionProps) {
    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;

        setPersonal((current) => ({
            ...current, 
            [name]: value
        }));
    }

    return (
        <div className="section-wrapper">
            <InputField
                field="Name"
                fieldID="name"
                fieldType="text"
                placeHolder="Enter your full name"
                value={personal.name}
                onChange={handleChange}
            />
            <InputField
                field="Date of Birth"
                fieldID="dob"
                fieldType="date"
                placeHolder="Enter your date of birth"
                value={personal.dob}
                onChange={handleChange}
            />
            <InputField
                field="Address"
                fieldID="addr"
                fieldType="text"
                placeHolder="Enter your address"
                value={personal.addr}
                onChange={handleChange}
            />

            <InputField
                field="Weight"
                fieldID="weight"
                fieldType="number"
                placeHolder="Enter your weight"
                value={personal.weight}
                onChange={handleChange}
            />
            <select name="weightUnit"
                id="weightUnit"
                value={personal.weightUnit}
                onChange={handleChange}>
                <option value="lb">lb</option>
                <option value="kg">kg</option>
            </select>

            <label>Height</label>
            {personal.heightUnit === "in" ? (
                <>
                    <input
                        type="number"
                        id="heightFt"
                        name="heightFt"
                        placeholder="0"
                        value={personal.heightFt}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        id="heightIn"
                        name="heightIn"
                        placeholder="0"
                        value={personal.heightIn}
                        onChange={handleChange}
                    />
                </>
            ) : (
                <input
                    type="number"
                    id="heightCm"
                    name="heightCm"
                    placeholder="0"
                    value={personal.heightCm}
                    onChange={handleChange}
                />
            )}

            <select name="heightUnit"
                id="heightUnit"
                value={personal.heightUnit}
                onChange={handleChange}>
                <option value="in">ft/in</option>
                <option value="cm">cm</option>
            </select>
        </div>
    )
}